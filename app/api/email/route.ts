import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const payload = {
      list_ids: ["26ab4637-65de-4321-917c-0f9b7d13f45e"],
      contacts: [{ email: body.email }],
    };
    console.log("payload", payload);
    
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
    return NextResponse.json({ message: "Success!", ok: true });
  } catch (error: any) {
    console.log("error", error);
    return NextResponse.json({ message: error.message, ok: false }, { status: 400 });
  }
}
