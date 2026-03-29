"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6">
            
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 mb-8"
            >
                <AlertTriangle className="w-12 h-12 text-red-500" />
            </motion.div>

            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-4"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    Something went wrong!
                </h1>
                <p className="text-zinc-500 max-w-md mx-auto text-sm md:text-base">
                    An unexpected error occurred. Our team has been notified and we are working to fix it.
                </p>
            </motion.div>

            
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 mt-10"
            >
                <button
                    onClick={() => reset()}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl transition-all active:scale-95"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Try Again
                </button>

                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl border border-white/5 transition-all active:scale-95"
                >
                    <Home className="w-4 h-4" />
                    Go Home
                </Link>
            </motion.div>

            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] -z-10" />
        </div>
    );
}