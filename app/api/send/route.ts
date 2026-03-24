import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build");

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_dummy_key_for_build") {
      return NextResponse.json(
        { error: "Contact form is not configured. Set RESEND_API_KEY in .env.local." },
        { status: 500 }
      );
    }
    if (!process.env.CONTACT_FORM_RECIPIENT) {
      return NextResponse.json(
        { error: "Contact form is not configured. Set CONTACT_FORM_RECIPIENT in .env.local." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { email, subject, message } = body;

    // Validate request body
    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Reflections Contact <onboarding@resend.dev>",
      to: [process.env.CONTACT_FORM_RECIPIENT],
      replyTo: email, // So you can hit "Reply" to respond to the user
      subject: `New Contact Form: ${subject}`,
      text: `
        Name/Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Internal error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
