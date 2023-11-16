import { NextApiRequest, NextApiResponse } from "next";
import { withApiKey } from "~~/services/api-middleware";
import { belvoClient } from "~~/services/belvo";
import { db } from "~~/services/db";

const POST = withApiKey(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
  }

  const { taker, maker, amount, startedAt, link, account } = req.body;

  const newestDate = new Date(startedAt * 1000);
  const newestDateStr = newestDate.toISOString().slice(0, 10);

  const oldestDate = new Date();
  oldestDate.setDate(newestDate.getDate() - 1);
  const oldestDateStr = oldestDate.toISOString().slice(0, 10);

  //todo: get user to get the link and account for belvo api
  const makerUser = await db.user.findUnique({
    where: {
      address: maker,
    },
  });

  //todo: get bank account details to validate against
  const takerUser = await db.user.findUnique({
    where: {
      address: taker,
    },
  });

  try {
    await belvoClient.connect();

    const transactions = await belvoClient.transactions.retrieve(link, oldestDateStr, newestDateStr, {
      saveData: false,
      account: account,
    });

    transactions.filter((transaction: any) => transaction.type === "OUTFLOW");
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Belvo Server Error" });
  }
});

export default POST;
