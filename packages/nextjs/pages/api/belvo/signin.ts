import { getServerAuthSession } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { belvoClient } from "~~/services/belvo";
import { db } from "~~/services/db";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { linkId, institution } = req.body;
  const session = await getServerAuthSession(req, res);
  if (!session) {
    res.status(401);
  }
  const userId = session?.user?.name || "";
  try {
    await belvoClient.connect();
    const accounts = await belvoClient.accounts.retrieve(linkId);
    const checkingAccount = accounts.find(account => account.category === "CHECKING_ACCOUNT");
    const accountId = checkingAccount?.id || "";
    const key = await db.aPIKey.create({
      data: {
        userId: userId,
        link: linkId,
        account: accountId, //save saving/checking account
        bank: institution,
      },
    });
    res.json(key);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Belvo Server Error" });
  }
}
