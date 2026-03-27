/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";


const API_URL = process.env.API_URL

export async function trackMovieView(mediaId: string) {
    try {
        console.log(mediaId)
        const cookieStore = await cookies();
       const res = await fetch(`${API_URL}/history`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookieStore.toString()
            },
            body: JSON.stringify({ mediaId }),
            cache: 'no-store'
        });
    } catch (error) {
        console.error("Failed to track view:", error);
    }
}

export async function getUserHistory() {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${API_URL}/history`, {
            method: 'GET',
            headers: {
                'Cookie': cookieStore.toString()
            },
            cache: 'no-store'
        });
        const history = await res.json();
        return history;
    } catch (error) {
        console.error("Failed to fetch user history:", error);
        return [];
    }
}
export async function clearAllHistory() {
    try {        
        const cookieStore = await cookies();
        const res = await fetch(`${API_URL}/history/clear`, {
            method: 'DELETE',
            headers: {
                'Cookie': cookieStore.toString()
            },
            cache: 'no-store'
        });
        const result = await res.json();
        revalidatePath('/history'); // Revalidate the history page to reflect changes
        return result;
    } catch (error) {
        console.error("Failed to clear user history:", error);
        return { success: false };
    }
}