import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./services/userService";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const { user } = await getSession();
    const role = user?.role;
    if (!user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname === "/dashboard") {
        const target = role === "ADMIN" ? "/dashboard/admin/admin-profile" : "/dashboard/profile";
        return NextResponse.redirect(new URL(target, request.url));
    }

    if (pathname.startsWith("/dashboard/")) {
        if (pathname.includes("/admin") && role !== "ADMIN") {
            return NextResponse.redirect(new URL("/dashboard/profile", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"]
};