"use server";

import { cookies } from "next/headers";


const API_URL = process.env.API_URL

export const getAllUsers = async () => {
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

export const getAllReviews = async () => {
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

export const getAllPayments = async () => {
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

export const getAllMedia = async () => {
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
export const getAllComments = async () => {
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

export const getAllUWatchlist = async () => {
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