import { verifyKey } from "@unkey/api";
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

    const { result, error } = await verifyKey(apiKey);

    if (error) {
      // handle potential network or bad request error
      // a link to our docs will be in the `error.docs` field
      console.error(error.message);
      return res.status(401).json({ error: error.message });
    }

    if (!result.valid) {
      // do not grant access
      return res.status(403).json({ error: "Invalid key" });
    }

    return handler(req, res);
  };
}
