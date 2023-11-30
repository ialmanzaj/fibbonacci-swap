import { getServerAuthSession } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~~/services/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const session = await getServerAuthSession(req, res);
  console.log(session)
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const escrows = await db.escrow.findMany({
    where: {
      takerId: session?.user?.name || "",
    },
  });
  console.log(escrows);
  res.json(escrows);
}
