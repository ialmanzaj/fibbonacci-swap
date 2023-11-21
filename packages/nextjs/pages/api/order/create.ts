import { getServerAuthSession } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~~/services/db";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession(req, res);
  if (!session) {
    res.status(401);
  }
  const { total, amount, price, min, max, expires } = req.body;
  const userId = session?.user?.name || "";
  const order = await db.order.create({
    data: {
      userId: userId,
      amountExchange: amount,
      priceTotalExchange: total,
      pricePerCoinExchange: price,
      minAmountExchange: min,
      maxAmountExchange: max,
      expires: expires,
    },
  });
  res.json(order);
}
