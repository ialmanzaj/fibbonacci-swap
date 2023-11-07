// pages/api/access-token.ts
import belvo from "belvo";
import { NextApiRequest, NextApiResponse } from "next";

// Server setup
const client = new belvo(
  "316065a1-5666-4b1e-820e-0c0561dfbacd",
  "xrZ#KcqY96EicRBw3h6@6VQC9qT08*rJDn2Qxc1yIyRSmvY1CP*#N_FIk#ar7Vlh",
  "https://sandbox.belvo.com",
);

// Widget branding
const widget = {
  branding: {
    // company_logo: "https://mysite/logo.svg",
    company_name: "Fibonacci",
    // company_color: "#50d3b2",
    // company_benefit_header: "Faster approvals",
    // company_benefit_content: "Using Belvo cuts down on your loan approval time by up to 15 days.",
    // opportunity_loss: "It can take up to 20 days to evaluate your request using traditional methods."
  },
};

const options = { widget };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      await client.connect();
      console.log(options);
      const response = await client.widgetToken.create(options);
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
