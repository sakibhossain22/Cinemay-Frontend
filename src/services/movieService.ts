"use server";

export async function getTrendingMoviesForCarousel() {
    try {
        const response = await fetch(`${process.env.API_URL}/media/all-media?category=TRENDING&limit=8`,{
        next: { revalidate: 600 }
    });
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
}

export async function getTrendingMovies() {
    try {
        const response = await fetch(`${process.env.API_URL}/media/all-media?type=MOVIE&limit=6`, {
            next: { revalidate: 600 }
        });
        const data = await response.json();
        return data?.data?.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
}
export async function getBanglaMovies() {
    try {
        const response = await fetch(`${process.env.API_URL}/media/all-media?category=BANGLA&limit=6`, {
            next: { revalidate: 600 }
        });
        const data = await response.json();
        return data?.data?.data;
    } catch (error) {
        console.error('Error fetching bangla movies:', error);
        return [];
    }
}
export async function getHindiMovies() {
    try {
        const response = await fetch(`${process.env.API_URL}/media/all-media?category=HINDI&limit=6`, {
            next: { revalidate: 600 }
        });
        const data = await response.json();
        return data?.data?.data;
    } catch (error) {
        console.error('Error fetching hindi movies:', error);
        return [];
    }
}


export async function getTrendingSeries() {
    try {
        const response = await fetch(`${process.env.API_URL}/media/series`, {
            next: { revalidate: 600 }
        });
        const data = await response.json();
        return data?.data;
    } catch (error) {
        console.error('Error fetching trending series:', error);
        return [];
    }
}
export async function getTrendingAnimations() {
    try {
        const response = await fetch(`${process.env.API_URL}/media/animations`, {
            next: { revalidate: 600 }
        });
        const data = await response.json();
        return data?.data;
    } catch (error) {
        console.error('Error fetching trending animations:', error);
        return [];
    }
}

export async function getMovieDetails(customid: string) {
    try {

        const result = await fetch(`${process.env.API_URL}/media/${customid}`);
        const response = await result.json();
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return [];
    }
}

export async function getMoviesByCategory(category: string) {
    try {
        const response = await fetch(`${process.env.API_URL}/media/all-media?category=${category}`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching  movies:', error);
        return [];
    }
}

export async function getAllMovies() {
    try {
        const response = await fetch(`${process.env.API_URL}/media/all-media`);
        const data = await response.json();
        return data?.data;
    } catch (error) {
        console.error('Error fetching all movies:', error);
        return [];
    }
}