import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/userService";

// middleware.ts
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const { user } = await userService.getSession();
    const role = user?.role;

    if (!user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // ১. রুট ড্যাশবোর্ডে থাকলে সঠিক জায়গায় পাঠানো
    if (pathname === "/dashboard") {
        const target = role === "ADMIN" ? "/dashboard/admin/admin-profile" : "/dashboard/profile";
        return NextResponse.redirect(new URL(target, request.url));
    }

    // ২. রোল বেজড প্রটেকশন (লুপ ছাড়া)
    if (pathname.startsWith("/dashboard/")) {
        // অ্যাডমিন পেজে ইউজার ঢুকতে পারবে না
        if (pathname.includes("/admin") && role !== "ADMIN") {
            return NextResponse.redirect(new URL("/dashboard/profile", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"]
};