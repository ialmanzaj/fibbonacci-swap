import { getAuthOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { belvoClient } from "~~/services/belvo";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { amount, startedAt, taker, link, account } = req.body;
    const current = new Date();
    const finalAt = new Date();
    const startedAtDate = current.toISOString().slice(0, 10);
    const finalAtDate = finalAt.toISOString().slice(0, 10);

    current.setDate(current.getDate() - 1);
    console.log(startedAtDate, belvoClient)

    await belvoClient.connect();
    const transactions = await belvoClient.transactions.retrieve(link, startedAtDate, finalAtDate, {
      saveData: false,
      account: account,
    });
    console.log(transactions)
    transactions.filter((transaction: any) => transaction.type === "OUTFLOW");
    res.json(transactions);
  }
};
