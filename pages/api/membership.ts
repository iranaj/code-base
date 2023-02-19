import clientPromise from "lib/mongodb";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  ok: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const body = {
      ...req.body,
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db("members");

    const result = await db.collection(`${body.membership}s`).insertOne(body);

    console.log("result", result);

    res.status(200).json({ message: "Success!", ok: true });
  } catch (error: any) {
    console.log("error", error);
    res.status(400).json({ message: error.message, ok: false });
  }
}
