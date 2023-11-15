import { db } from "./db";
import { hasMatchingKey } from "./encrypt";
import { NextApiRequest, NextApiResponse } from "next";

export function withApiKey(
  handler: (request: NextApiRequest, res: NextApiResponse) => NextApiResponse | Promise<NextApiResponse>,
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const requestHeaders = new Headers(req.headers);
    const apiKey = requestHeaders.get("authorization")?.replace("Bearer ", "");

    if (apiKey === null) {
      return res.status(401).json({ error: "unauthorized" });
    } else if (typeof apiKey !== "string") {
      return apiKey;
    }

    const keys = await db.key.findMany();
    const hasMatch = hasMatchingKey(keys, apiKey);
    if (!hasMatch) {
      return res.status(403).json({ error: "Invalid key" });
    }

    req.body["userId"] = hasMatch.userId;
    return handler(req, res);
  };
}
