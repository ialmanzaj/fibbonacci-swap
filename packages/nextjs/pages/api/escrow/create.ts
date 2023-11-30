import { getServerAuthSession } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~~/services/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const session = await getServerAuthSession(req, res);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { orderId, makerId, taker, dealAmount, totalPriceExchange, deadline } = req.body;
  const takerUser = await db.user.findUnique({
    where: {
      address: taker,
    },
  });
  const escrow = await db.escrow.create({
    data: {
      orderId: orderId,
      makerId: makerId,
      takerId: takerUser?.id || "",
      escrowStatus: "",
      dealAmount: dealAmount,
      totalPriceExchange: totalPriceExchange,
      deadline: deadline,
    },
  });
  res.json(escrow);
}
