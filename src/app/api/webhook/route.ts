/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    if (!signature) {
        return new NextResponse("No signature", { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        console.error(`❌ Webhook Error: ${error.message}`);
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }


    
    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
    }

    return NextResponse.json({ received: true }, { status: 200 });
}