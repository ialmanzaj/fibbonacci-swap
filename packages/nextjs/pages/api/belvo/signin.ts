import { getServerAuthSession } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~~/services/db";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { linkId, institution } = req.body;
  const session = await getServerAuthSession(req, res);
  if (!session) {
    res.status(401);
  }
  const userId = session?.user?.name || "";
  const key = await db.aPIKey.create({
    data: {
      userId: userId,
      link: linkId,
      account: "", //todo: make another call to get saving/checking account
      bank: institution,
    },
  });
  res.json(key);
}
