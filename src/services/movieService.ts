"use server";
import axiosInstance from "@/lib/axios";

export async function getTrendingMoviesForCarousel() {
    try {
        const response = await axiosInstance.get('/media/all-media?category=TRENDING&limit=8');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
}

export async function getTrendingMovies() {
    try {
        const response = await axiosInstance.get('/media/movies');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
}
export async function getTrendingSeries() {
    try {
        const response = await axiosInstance.get('/media/series');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching trending series:', error);
        return [];
    }
}
export async function getTrendingAnimations() {
    try {
        const response = await axiosInstance.get('/media/animations');
        return response.data.data;
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
        const response = await axiosInstance.get(`/media/all-media?category=${category}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
}

export async function getAllMovies() {
    try {
        const response = await axiosInstance.get('/media/all-media');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching all movies:', error);
        return [];
    }
}