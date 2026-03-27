/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, Search, LayoutDashboard, LogIn, UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // স্ক্রল করলে নেববারে হালকা শ্যাডো দেওয়ার জন্য
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "Trending", href: "/trending" },
    { name: "Subscriptions", href: "/subscriptions" },
  ];

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 border-b",
      isScrolled 
        ? "bg-black/80 backdrop-blur-md border-emerald-500/20 py-2" 
        : "bg-transparent border-transparent py-4"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* 1. Logo Section */}
          <div className="flex items-center gap-8 shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:rotate-12 transition-transform">
                <span className="text-white font-black text-xl italic">C</span>
              </div>
              <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent hidden sm:block">
                CinemaY
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-emerald-400",
                    pathname === link.href ? "text-emerald-500" : "text-zinc-400"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 2. Central Search Box */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search movies..." 
                className="w-full bg-zinc-900/40 border border-zinc-800 text-sm text-zinc-200 rounded-full py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:inline-flex h-5 items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-500">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* 3. Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Button asChild variant="ghost" size="sm" className="text-zinc-400 hover:text-emerald-400">
              <Link href="/dashboard">
                <LayoutDashboard className="mr-2 size-4" />
                Dashboard
              </Link>
            </Button>
            <div className="h-4 w-[1px] bg-zinc-800 mx-1" />
            <Button asChild variant="ghost" size="sm" className="text-zinc-300">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white">
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>

          {/* 4. Mobile Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button variant="ghost" size="icon" className="md:hidden text-zinc-400">
              <Search className="size-5" />
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-emerald-500">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-zinc-950 border-zinc-800 p-0">
                <SheetHeader className="p-6 border-b border-zinc-900">
                  <SheetTitle className="text-emerald-500 flex items-center gap-2 font-bold">
                    CinemaY
                  </SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col gap-2 p-6">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[2px] mb-2">Main Menu</p>
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href}
                      href={link.href} 
                      className={cn(
                        "py-3 text-lg font-semibold transition-colors border-b border-zinc-900/50",
                        pathname === link.href ? "text-emerald-500" : "text-zinc-300"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}

                  <div className="mt-8 flex flex-col gap-4">
                    <Button asChild className="bg-emerald-600 w-full justify-start py-6 text-lg">
                      <Link href="/register">Join Now</Link>
                    </Button>
                    <div className="flex gap-4">
                       <Button asChild variant="outline" className="flex-1 border-zinc-800 py-6">
                          <Link href="/login">Login</Link>
                       </Button>
                       <Button asChild variant="outline" className="flex-1 border-zinc-800 py-6">
                          <Link href="/dashboard">Panel</Link>
                       </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;