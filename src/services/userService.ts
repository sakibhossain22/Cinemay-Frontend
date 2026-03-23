import { env } from "@/env";
import { decode, JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
export const userService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies();
            const accessToken = cookieStore.get("accessToken")?.value;
            const { email, role, status, isPremium } = decode(accessToken || "") as JwtPayload;
            return { user: { email, role, status, isPremium }, error: null }

        } catch (err) {
            return { data: null, error: { message: "Something Went Wrong..." } }

        }
    }
}