import clientPromise from "lib/mongodb";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  ok: boolean;
};

type IVolunteerDataBody = {
  membership: string;
  "first-name": string;
  "last-name": string;
  "email-address": string;
  phone: string;
  country: string;
  "street-address": string;
  city: string;
  region: string;
  "postal-code": string;
  note?: string;
};

// type LawyerDataBody

// lawyer body extends volunteer body
type ILawyerDataBody = IVolunteerDataBody & {
  "law-school": string;
  "graduation-year": string;
  "years-of-practice": string;
  "bar-admission": boolean;
  "bar-admission-country": string;
  "bar-number": string;
  "linkedIn-username": string;
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
