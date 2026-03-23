import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/userService";



export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const { user } = await userService.getSession();

    const role = user?.role;
    if (!user) {
        return NextResponse.redirect(new URL("/login", request?.url));
    }

    if (pathName === "/dashboard" || pathName === "/dashboard/") {
        if (role === "ADMIN") {
            return NextResponse.redirect(new URL("/dashboard/admin/admin-stats", request?.url));
        }
        if (role === "PROVIDER") {
            return NextResponse.redirect(new URL("/dashboard/profile", request?.url));
        }
    }

    if (pathName.startsWith("/dashboard/admin") && role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request?.url));
    }
    if (pathName.startsWith("/dashboard/") && role !== "USER") {
        return NextResponse.redirect(new URL("/dashboard/admin/admin-stats", request?.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"]
};