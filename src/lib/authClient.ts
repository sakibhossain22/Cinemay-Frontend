import { env } from "@/env";
import { createAuthClient } from "better-auth/react";
const API_URL = process.env.NEXT_PUBLIC_AUTH_URL
export const authClient = createAuthClient({
    baseURL: API_URL,
    withCredentials: true,
});