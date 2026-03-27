"use server"

import { cookies } from "next/headers";

const API_URL = process.env.API_URL


export async function subscribeToPlan(planType: string) {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${API_URL}/user/subscribe`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
            body: JSON.stringify({ "subscriptionType": planType }),
        });
        const res = await response.json();
        return res;

    }
    catch (error) {
        console.error("Error subscribing to plan:", error);
        return { success: false, error: "An error occurred while subscribing to plan" };
    }
}
export async function confirmPayment (paymentIntentId: string) {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${API_URL}/user/confirm-subscription`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
            body: JSON.stringify({ transactionId : paymentIntentId }),
        });
        const res = await response.json();
        return res;
    }
    catch (error) {
        console.error("Error confirming payment:", error);
        return { success: false, error: "An error occurred while confirming payment" };
    }
}