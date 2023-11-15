import { NextApiRequest, NextApiResponse } from "next";
import { withApiKey } from "~~/services/api-middleware";
import { belvoClient } from "~~/services/belvo";
import { db } from "~~/services/db";

const POST = withApiKey(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userId, amount, startedAt, taker, link, account } = req.body;

  const newestDate = new Date(startedAt * 1000);
  const newestDateStr = newestDate.toISOString().slice(0, 10);

  const oldestDate = new Date();
  oldestDate.setDate(newestDate.getDate() - 1);
  const oldestDateStr = oldestDate.toISOString().slice(0, 10);

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  try {
    await belvoClient.connect();

    const transactions = await belvoClient.transactions.retrieve(link, oldestDateStr, newestDateStr, {
      saveData: false,
      account: account,
    });

    transactions.filter((transaction: any) => transaction.type === "OUTFLOW");
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Belvo Server Error" });
  }
});

export default POST;
