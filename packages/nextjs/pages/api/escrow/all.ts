import { getServerAuthSession } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~~/services/db";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
  }
  const session = await getServerAuthSession(req, res);
  if (!session) {
    res.status(401);
  }

  const escrows = await db.escrow.findMany({
    where: {
      takerId: session?.user?.name || "",
    },
  });
  console.log(escrows)
  res.json(escrows);
}
