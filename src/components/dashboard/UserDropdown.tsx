/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Settings, CreditCard, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { authClient } from '@/lib/authClient';
import { LogOutFunc } from '@/actions/user.action';
import { useRouter } from 'next/navigation';

export default function UserDropdown({ user }: { user: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getInitials = (name: string) => {
        return name ? name.charAt(0).toUpperCase() : 'S';
    };
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const res = await LogOutFunc();
      await authClient.signOut();
      if (res.success) {
        router.push("/login");
        router.refresh();
      } else {
        console.error(res.error);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };
    return (
        <div className="relative" ref={dropdownRef}>
            {/* প্রোফাইল বাটন */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 p-1.5 rounded-full hover:bg-zinc-800/50 transition-all border border-transparent hover:border-white/10"
            >
                <div className="relative size-10 rounded-full overflow-hidden bg-emerald-600 flex items-center justify-center border-2 border-emerald-500/20">
                    {user?.image ? (
                        <Image src={user.image} alt={user.name} fill className="object-cover" />
                    ) : (
                        <span className="text-white font-bold text-lg">{getInitials(user?.name)}</span>
                    )}
                </div>
                <div className="hidden md:block text-left mr-2">
                    <p className="text-xs font-black uppercase tracking-tight dark:text-white text-black leading-none mb-1">
                        {user?.name || "User"}
                    </p>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">
                        {user?.role}
                    </p>
                </div>
                <ChevronDown size={14} className={`text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* ড্রপডাউন মেনু */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-56 bg-zinc-900 border border-white/5 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-xl"
                    >
                        <div className="p-3 border-b border-white/5 mb-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Logged in as</p>
                            <p className="text-sm font-bold text-white truncate">{user?.email}</p>
                        </div>

                        <div className="space-y-1">
                            <DropdownItem icon={<User size={16} />} label="My Profile" href={user.role === "ADMIN" ? "/dashboard/admin/admin-profile" : "/dashboard/profile"} />
                            <DropdownItem icon={<CreditCard size={16} />} label="Subscriptions" href={user.role === "ADMIN" ? "/dashboard/admin/user-purchase-history" : "/dashboard/purchase-history"} />
                        </div>

                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="w-full flex cursor-pointer items-center gap-3 px-3 py-2.5 mt-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-xs font-black uppercase tracking-widest"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function DropdownItem({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-xs font-black uppercase tracking-widest"
        >
            <span className="text-emerald-500">{icon}</span>
            {label}
        </Link>
    );
}