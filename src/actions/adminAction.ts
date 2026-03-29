/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";


const API_URL = process.env.API_URL

export async function getAllUsers() {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${API_URL}/admin/all-users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export async function getAllReviews() {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${API_URL}/admin/all-reviews`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        throw error;
    }
};

export async function getAllPayments() {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${API_URL}/admin/all-payments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching payments:", error);
        throw error;
    }
};

export async function getAllMedia() {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${API_URL}/admin/all-media`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching media:", error);
        throw error;
    }
};
export async function getAllComments() {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${API_URL}/admin/all-comments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
};

export async function getAllUWatchlist() {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${API_URL}/admin/all-watchlists`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching watchlists:", error);
        throw error;
    }
};

export async function updateUserStatus(userId: string, newStatus: string) {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${API_URL}/admin/update-user-status/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
            body: JSON.stringify({ status: newStatus }),
        });
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.error("Error updating user status:", error);
        throw error;
    }
}

export async function deleteMovie(movieId: string) {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${API_URL}/admin/delete-media/${movieId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
        });
        const data = await res.json();
        return { success: data.success, message: data.message, ok: res.ok };
    }
    catch (error) {
        console.error("Error deleting movie:", error);
        throw error;
    }
}

export async function updateMovie(movieId: string, body: FormData) {
    try {
        const cookieStore = await cookies();

        
        const updatedData = {
            title: body.get('title'),
            type: body.get('type'),
            tmdb_id: body.get('tmdb_id'),
            synopsis: body.get('synopsis'),
            streamingLink: body.get('streamingLink'),
            downloadLink: body.get('downloadLink'),
            posterUrl: body.get('posterUrl'),
            contentType: body.get('contentType'),
            
            buyPrice: Number(body.get('buyPrice')),
            rentPrice: Number(body.get('rentPrice'))
        }
        const res = await fetch(`${API_URL}/admin/edit-media/${movieId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            body: JSON.stringify(updatedData), 
        });

        const data = await res.json();
        return { success: data.success, message: data.message, ok: res.ok };
    }
    catch (error) {
        console.error("Error updating movie:", error);
        throw error;
    }
}


export async function adminStatistics() {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${API_URL}/admin/admin-dashboard-stats`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
        });
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching statistics:", error);
        throw error;
    }
}
export async function getAllPaymentHistory() {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${API_URL}/admin/all-payments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
            return { success: data.success, message: data.message, ok: res.ok, data: data.data };
        }
        return { success: false, data: null, error: data.error || "Failed to fetch payment history" };
    }
    catch (error) {
        console.error("Error fetching payment history:", error);
        throw error;
    }
}