import { createAuthClient } from "better-auth/react";


export const authClient = createAuthClient({
    baseURL: "http://localhost:5000",
    sessionOptions : {
        refetchInterval : 5 * 60, // 5 minutes in seconds
        refetchWhenOffline : false,
        refetchOnReconnect : true,
        refetchOnWindowFocus : false,
    },
    fetchOptions: {
        credentials: "include",
    },
    withCredentials: true,
});