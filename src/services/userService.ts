"use server"
import { cookies } from "next/headers";

export async function getSession() {
    try {
        const cookieStore = await cookies();
        const res = fetch(`${process.env.API_URL}/user/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString()
            },
            credentials: "include",
        });
        const data = await res.then(res => res.json())
        if (!data?.success) {
            return { user: null, error: data.message || { message: "Failed to fetch user data" } }
        }
        return { user: data.data, error: null }

    } catch (err) {
        return { user: null, error: { message: "Something Went Wrong..." } }

    }
}
