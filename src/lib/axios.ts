import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.API_URL || 'https://cinemay-server.vercel.app/api',
    withCredentials: true,
});

export default axiosInstance;