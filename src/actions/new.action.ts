"use server";

import { cookies } from "next/headers";


const API_URL = process.env.API_URL

export async function getTrending(category: string) {
    const res = await fetch(`${process.env.API_URL}/media/all-media?category=${category}`, {
        cache: 'no-store'
    });
    const trendingData = await res.json();
    return trendingData;
}