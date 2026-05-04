import { createAuthClient } from "better-auth/react";


export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    sessionOptions: {
        refetchInterval: 5 * 60,
        refetchWhenOffline: false,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
    },
    fetchOptions: {
        credentials: "include",
    }
});