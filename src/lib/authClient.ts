import { createAuthClient } from "better-auth/react";


export const authClient = createAuthClient({
    baseURL: "https://cinemay-server.vercel.app",
    sessionOptions: {
        refetchInterval: 5 * 60,
        refetchWhenOffline: false,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
    },
    fetchOptions: {
        credentials: "include",
    },
    plugins: [
        {
            id: "next-cookies-request",
            fetchPlugins: [
                {
                    id: "next-cookies-request-plugin",
                    name: "next-cookies-request-plugin",
                    hooks: {
                        async onRequest(ctx) {
                            if (typeof window === "undefined") {
                                const { cookies } = await import("next/headers");
                                const headers = await cookies();
                                ctx.headers.set("cookie", headers.toString());
                            }
                        },
                    },
                },
            ],
        },
    ],
});