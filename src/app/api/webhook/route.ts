/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/webhook/route.ts

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    // ১. টেক্সট হিসেবে বডি রিড করুন (এটি দ্রুত হয়)
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    if (!signature) {
        return new NextResponse("No signature", { status: 400 });
    }

    let event: Stripe.Event;

    try {
        // ২. ইভেন্ট কনস্ট্রাক্ট করা
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        console.error(`❌ Webhook Error: ${error.message}`);
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    // ৩. দ্রুত রেসপন্স পাঠানো (Context Deadline এড়াতে)
    // দীর্ঘ লজিক থাকলে সেটা background এ প্রসেস করা ভালো
    
    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
    }

    // ৪. স্ট্রাইপকে দ্রুত ২০০ রেসপন্স দিন
    return NextResponse.json({ received: true }, { status: 200 });
}