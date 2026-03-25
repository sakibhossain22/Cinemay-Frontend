"use server"

import { cookies } from "next/headers";

const API_URL = process.env.API_URL

export async function getAllReviews() {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${API_URL}/admin/all-reviews`, {
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
        return { success: false, data: [], error: res.error || "Failed to fetch reviews" };
    } catch (error) {

        console.error("Error fetching reviews:", error);
        return { success: false, data: [], error: "An error occurred while fetching reviews" };
    }
}

export async function deleteReview(reviewId: string) {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${API_URL}/admin/delete-review/${reviewId}`, {
            method: "DELETE",
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
        return { success: false, data: [], error: res.error || "Failed to delete review" };
    } catch (error) {
        console.error("Error deleting review:", error);
        return { success: false, data: [], error: "An error occurred while deleting the review" };
    }
}

export async function updateReviewStatus(reviewId: string) {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${API_URL}/admin/update-review-status/${reviewId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
            body: JSON.stringify({ status: true }),
        });
        const res = await response.json();
        if (res.ok) {
            return { success: true, ok: res.ok, data: res.data };
        }
        return { success: false, data: [], error: res.error || "Failed to update review status" };
    } catch (error) {
        console.error("Error updating review:", error);
        return { success: false, data: [], error: "An error occurred while updating the review status" };
    }
}