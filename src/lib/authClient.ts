import { createAuthClient } from "better-auth/react";


export const authClient = createAuthClient({
    baseURL: "http://localhost:5000", // আপনার API সার্ভারের URL
    fetchOptions: {
        credentials: "include", // এটি খুবই গুরুত্বপূর্ণ! নাহলে কুকি আদান-প্রদান হবে না
    },
    withCredentials: true,
});