/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function GlobalNotFound() {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-zinc-600 dark:text-zinc-300 font-sans flex flex-col justify-center items-center gap-6 transition-colors duration-300">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-9xl font-bold text-emerald-600 dark:text-emerald-500"
            >
                404
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl font-semibold text-zinc-900 dark:text-white"
            >
                Page Not Found
            </motion.div>
            <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-zinc-500 dark:text-zinc-400"
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
                    className="px-6 py-3 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-black font-semibold rounded-lg shadow-md hover:bg-emerald-700 dark:hover:bg-emerald-400 transition-colors"
                >
                    Go back to Home
                </Link>
            </motion.div>
        </div>
    );
}