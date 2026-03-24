"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Home, User, Star, ShoppingBag,
    PlusSquare, Users, Settings, LogOut, Clapperboard, BarChart3
} from "lucide-react";
import { adminRoutes } from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/userRoutes";

// আইকন ম্যাপ করার জন্য একটি হেল্পার (ঐচ্ছিক কিন্তু সুন্দর দেখায়)
const getIcon = (title: string) => {
    switch (title) {
        case "Home": return <Home size={18} />;
        case "Admin Profile": case "Profile": return <User size={18} />;
        case "Admin Stats": return <BarChart3 size={18} />;
        case "Manage Movies": case "Update Movies": return <Clapperboard size={18} />;
        case "Add Movies": return <PlusSquare size={18} />;
        case "Manage User": return <Users size={18} />;
        case "My Reviews": case "Manage Reviews": return <Star size={18} />;
        case "Purchase History": case "User Purchase History": return <ShoppingBag size={18} />;
        default: return <LayoutDashboard size={18} />;
    }
};

export default function Sidebar({ role }: { role: "ADMIN" | "USER" }) {
    const pathname = usePathname();

    // রোল অনুযায়ী রুট সিলেক্ট করা
    const activeRoutes = role === "ADMIN" ? adminRoutes[0].items : userRoutes[0].items;

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-zinc-950 border-r border-white/5 flex flex-col">
            {/* Logo Section */}
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center font-bold text-black">
                        C
                    </div>
                    <span className="text-xl font-bold text-white uppercase tracking-wider">CinemaY</span>
                </div>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {activeRoutes.map((route) => {
                    const isActive = pathname === route.url;
                    return (
                        <Link
                            key={route.url}
                            href={route.url}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                                }`}
                        >
                            <span className={`${isActive ? "text-emerald-500" : "text-zinc-500 group-hover:text-zinc-300"}`}>
                                {getIcon(route.title)}
                            </span>
                            <span className="text-sm font-medium">{route.title}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout / Bottom Section */}
            <div className="p-4 border-t border-white/5">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-zinc-500 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all">
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}