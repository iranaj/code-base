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
    const payload = {
      list_ids: ["26ab4637-65de-4321-917c-0f9b7d13f45e"],
      contacts: [{ email: req.body.email }],
    };
    console.log("payload", payload);
    // send email to backend
    const response = await fetch(
      "https://api.sendgrid.com/v3/marketing/contacts",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    console.log("sendgrid response", data);
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }
    res.status(200).json({ message: "Success!", ok: true });
  } catch (error: any) {
    console.log("error", error);
    res.status(400).json({ message: error.message, ok: false });
  }
}
