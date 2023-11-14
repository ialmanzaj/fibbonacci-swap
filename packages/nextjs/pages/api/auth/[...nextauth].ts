// Code in this file is based on https://docs.login.xyz/integrations/nextauth.js
// with added process.env.VERCEL_URL detection to support preview deployments
// and with auth option logic extracted into a 'getAuthOptions' function so it
// can be used to get the session server-side with 'getServerSession'
import { IncomingMessage } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import { db } from "~~/services/db";
import { compareKeys, generateKey, generateSecretHash } from "~~/services/encrypt";

export function getAuthOptions(req: IncomingMessage): NextAuthOptions {
  const providers = [
    CredentialsProvider({
      name: "Ethereum",
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"));

          const nextAuthUrl =
            process.env.NEXTAUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);
          if (!nextAuthUrl) {
            return null;
          }

          const nextAuthHost = new URL(nextAuthUrl).host;
          if (siwe.domain !== nextAuthHost) {
            return null;
          }

          if (siwe.nonce !== (await getCsrfToken({ req: { headers: req.headers } }))) {
            return null;
          }

          await siwe.verify({ signature: credentials?.signature || "" });
          const address = siwe.address;

          // Check if user exists
          let user = await db.user.findUnique({
            where: {
              address: address,
            },
          });

          const key = generateKey();
          const secret = generateSecretHash(key);

          // Create new user if doesn't exist
          if (!user) {
            user = await db.user.create({
              data: {
                address: address,
                secretKey: secret,
              },
            });
            // create account
            await db.account.create({
              data: {
                userId: user.id,
                type: "credentials",
                provider: "Ethereum",
                providerAccountId: address,
              },
            });
          }

          return {
            // Pass user id instead of address
            // id: fields.address
            id: user.id,
            address: address,
          };
        } catch (e) {
          return null;
        }
      },
      credentials: {
        message: {
          label: "Message",
          placeholder: "0x0",
          type: "text",
        },
        signature: {
          label: "Signature",
          placeholder: "0x0",
          type: "text",
        },
      },
    }),
    CredentialsProvider({
      id: "smart-contract",
      name: "Smart contract Credentials",
      // The name to display on the sign in form (e.g. "Sign in with...")
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        apiKey: { label: "API key", type: "text" },
        secretKey: { label: "Secret", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("api-key");
        if (!credentials?.apiKey || !credentials?.secretKey) {
          throw new Error("Please enter an apiKey and secret");
        }

        // check to see if user exists
        const user = await db.user.findUnique({
          where: {
            secretKey: credentials?.secretKey,
          },
        });

        // if no user was found
        if (!user || !user?.secretKey) {
          throw new Error("No user found");
        }

        // check to see if password matches
        const passwordMatch = compareKeys(user.secretKey, credentials.apiKey);

        // if password does not match
        if (!passwordMatch) {
          throw new Error("Incorrect credentials");
        }
        return user;
      },
    }),
  ];

  return {
    callbacks: {
      async session({ session, token }) {
        session.address = token.sub;
        session.user = {
          name: token.sub,
        };
        return session;
      },
    },
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    },
  };
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const authOptions = getAuthOptions(req);

  if (!Array.isArray(req.query.nextauth)) {
    res.status(400).send("Bad request");
    return;
  }

  const isDefaultSigninPage = req.method === "GET" && req.query.nextauth.find(value => value === "signin");

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    authOptions.providers.pop();
  }

  return await NextAuth(req, res, authOptions);
}
