"use server";


export async function getTrending(category: string) {
    const res = await fetch(`${process.env.API_URL}/media/all-media?category=${category}`, {
        next: { revalidate: 3600 }
    });
    const trendingData = await res.json();
    return trendingData;
}