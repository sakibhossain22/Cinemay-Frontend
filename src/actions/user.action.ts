"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL

export async function getUserProfile() {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${API_URL}/user/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
        });
        const res = await response.json();
        if (res.ok) {
            return { success: res.success, ok: res.ok, data: res.data };
        }
        return { success: false, data: null, error: res.error || "Failed to fetch user profile" };
    }
    catch (error) {
        console.error("Error fetching user profile:", error);
        return { success: false, data: null, error: "An error occurred while fetching user profile" };
    }
}

export async function updateUserProfile(profileData: { name?: string; phone?: string; image?: string }) {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${API_URL}/user/profile/update`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
            body: JSON.stringify(profileData),
        });
        const res = await response.json();
        if (res.ok) {
            return { success: res.success, message: res.message, ok: res.ok, data: res.data };
        }
        return { success: false, data: null, error: res.error || "Failed to update user profile" };
    }
    catch (error) {
        console.error("Error updating user profile:", error);
        return { success: false, data: null, error: "An error occurred while updating user profile" };
    }
}
export async function dashboard() {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${API_URL}/user/dashboard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
        });
        const res = await response.json();
        if (res.ok) {
            return { success: res.success, ok: res.ok, data: res.data };
        }
        return { success: false, data: null, error: res.error || "Failed to fetch dashboard data" };
    }
    catch (error) {
        console.error("Error fetching dashboard data:", error);
        return { success: false, data: null, error: "An error occurred while fetching dashboard data" };
    }
}

export async function getMyReviews() {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${API_URL}/review`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
        });
        const res = await response.json();
        if (res.ok) {
            return { success: res.success, ok: res.ok, data: res.data };
        }
        return { success: false, data: null, error: res.error || "Failed to fetch reviews" };
    }
    catch (error) {
        console.error("Error fetching reviews:", error);
        return { success: false, data: null, error: "An error occurred while fetching reviews" };
    }
}

export const deleteReview = async (id: string) => {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${API_URL}/review/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
        });
        const res = await response.json();
        if (res.ok) {
            return { success: res.success, message: res.message, ok: res.ok };
        } return { success: false, error: res.error || "Failed to delete review" };
    }
    catch (error) {
        console.error("Error deleting review:", error);
        return { success: false, error: "An error occurred while deleting the review" };
    }
}

export const updateReview = async (id: string, data: { content: string }) => {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${API_URL}/review/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
            body: JSON.stringify(data),
        });
        const res = await response.json();
        if (res.ok) {
            return { success: res.success, message: res.message, ok: res.ok };
        }
        return { success: false, error: res.error || "Failed to update review" };
    }
    catch (error) {
        console.error("Error updating review:", error);
        return { success: false, error: "An error occurred while updating the review" };
    }
}

export const myWatchList = async () => {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${API_URL}/watchlist`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
        });
        const res = await response.json();
        if (res.ok) {
            return { success: res.success, ok: res.ok, data: res.data };
        }
        return { success: false, data: null, error: res.error || "Failed to fetch watchlist" };
    }
    catch (error) {
        console.error("Error fetching watchlist:", error);
        return { success: false, data: null, error: "An error occurred while fetching watchlist" };
    }
}

export const removeFromWatchlist = async (id: string) => {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${API_URL}/watchlist/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
        });
        const res = await response.json();
        if (res.ok) {
            revalidatePath("/dashboard/watchlist");
            return { success: res.success, message: res.message, ok: res.ok };

        }
        return { success: false, error: res.error || "Failed to remove from watchlist" };
    }
    catch (error) {
        console.error("Error removing from watchlist:", error);
        return { success: false, error: "An error occurred while removing from watchlist" };
    }
}
export async function getPurchaseHistory() {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${API_URL}/purchase`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
        });
        const res = await response.json();
        if (res.ok) {
            return { success: res.success, ok: res.ok, data: res.data };
        }
        return { success: false, data: null, error: res.error || "Failed to fetch purchase history" };
    }
    catch (error) {
        console.error("Error fetching purchase history:", error);
        return { success: false, data: null, error: "An error occurred while fetching purchase history" };
    }
}