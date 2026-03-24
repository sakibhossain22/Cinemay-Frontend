/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getWatchListByUser, toggleWatchlist } from "@/actions/movieAction";
import { Bookmark, Share2, Users, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState, useTransition, useMemo } from "react";
import { motion } from "framer-motion";

export default function GlobalNotFound() {
    return (
        <div className="min-h-screen bg-black text-zinc-300 font-sans flex flex-col justify-center items-center gap-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-9xl font-bold text-emerald-500"
            >
                404
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl font-semibold text-white"
            >
                Page Not Found
            </motion.div>
            <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-zinc-500"
            >
                Sorry, the page you are looking for does not exist.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <Link
                    href="/"
                    className="px-6 py-3 bg-emerald-500 text-black font-semibold rounded-lg shadow-md hover:bg-emerald-600 transition-colors"
                >
                    Go back to Home
                </Link>
            </motion.div>
        </div>
    );
}