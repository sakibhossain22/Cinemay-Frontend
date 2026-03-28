"use server"
import { decode, JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getSession() {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        const { email, role, status, isPremium, id, token } = decode(accessToken || "") as JwtPayload;
        return { user: { email, role, status, isPremium, id, token }, error: null }

    } catch (err) {
        return { data: null, error: { message: "Something Went Wrong..." } }

    }
}
