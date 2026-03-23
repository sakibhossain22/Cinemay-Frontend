"use server";
import axiosInstance from "@/lib/axios";

export const getTrendingMoviesForCarousel = async () => {
    try {
        const response = await axiosInstance.get('/media/all-media?category=TRENDING&limit=5');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
}

export const getTrendingMovies = async () => {
    try {
        const response = await axiosInstance.get('/media/movies');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
}
export const getTrendingSeries = async () => {
    try {
        const response = await axiosInstance.get('/media/series');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching trending series:', error);
        return [];
    }
}
export const getTrendingAnimations = async () => {
    try {
        const response = await axiosInstance.get('/media/animations');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching trending animations:', error);
        return [];
    }
}
export const getMovieDetails = async (customid: string) => {
    try {
        const response = await axiosInstance.get(`/media/${customid}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return [];
    }
}

export const getMoviesByCategory = async (category: string) => {
    try {
        const response = await axiosInstance.get(`/media/all-media?category=${category}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
}