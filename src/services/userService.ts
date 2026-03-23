import { decode, JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
export const userService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies();
            const accessToken = cookieStore.get("accessToken")?.value;

            const { email, role, status, isPremium, id, token } = decode(accessToken || "") as JwtPayload;
            return { user: { email, role, status, isPremium, id, token }, error: null }

        } catch (err) {
            return { data: null, error: { message: "Something Went Wrong..." } }

        }
    }
}
