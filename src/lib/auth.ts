import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    plugins: [nextCookies()] // make sure this is the last plugin in the array
})