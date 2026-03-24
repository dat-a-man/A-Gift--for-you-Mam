import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-26",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export async function POST(request: Request) {
  try {
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      return NextResponse.json(
        { message: "Subscription service is not configured yet." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const email = String(body?.email || "")
      .trim()
      .toLowerCase();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 },
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const existing = await writeClient.fetch(
      `*[_type == "subscription" && email == $email][0]{_id, status}`,
      { email },
    );

    if (existing?.status === "active") {
      return NextResponse.json(
        { message: "You are already subscribed with this email." },
        { status: 409 },
      );
    }

    if (existing?._id && existing?.status === "unsubscribed") {
      await writeClient
        .patch(existing._id)
        .set({ status: "active", subscribedAt: new Date().toISOString() })
        .commit();

      return NextResponse.json(
        { message: "Welcome back! Your subscription is active again." },
        { status: 200 },
      );
    }

    await writeClient.create({
      _type: "subscription",
      email,
      subscribedAt: new Date().toISOString(),
      status: "active",
    });

    return NextResponse.json(
      { message: "Thanks for subscribing! You are now on the list." },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
