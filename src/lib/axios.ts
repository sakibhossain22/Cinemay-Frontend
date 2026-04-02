import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.API_URL || `${process.env.BACKEND_URL}/api`,
    withCredentials: true,
});

export default axiosInstance;