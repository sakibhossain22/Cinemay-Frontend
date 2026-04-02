/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, LayoutDashboard, Loader2, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import NavMovieSearch from "./NavMovieSearch";
import { LogOutFunc } from "@/actions/user.action";
import { authClient } from "@/lib/authClient";

const Navbar = ({ userInfo }: { userInfo: any }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const user = userInfo?.user;
  const isLoading = userInfo === undefined;

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
        alert("Logout failed: " + res.error);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-emerald-500/20 py-2"
          : "bg-transparent border-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo Section */}
          <div className="flex items-center gap-8 shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:rotate-12 transition-transform">
                <span className="text-white font-black text-xl italic">C</span>
              </div>
              <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent hidden sm:block">
                CinemaY
              </span>
            </Link>

            {/* Desktop Navigation */}
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

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full group">
              <NavMovieSearch />
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {isLoading ? (
              <Loader2 className="size-5 animate-spin text-emerald-500" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <Button asChild variant="ghost" size="sm" className="text-zinc-400 hover:text-emerald-400">
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 size-4" />
                    Dashboard
                  </Link>
                </Button>
                
                <Button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  variant="destructive"
                  size="sm"
                  className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20"
                >
                  {isLoggingOut ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  ) : (
                    <LogOut className="mr-2 size-4" />
                  )}
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm" className="text-zinc-300">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu (Sheet) */}
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-emerald-500">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-zinc-950 border-zinc-800 p-0">
                <SheetHeader className="p-6 border-b border-zinc-900">
                  <SheetTitle className="text-emerald-500 font-bold">CinemaY</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 p-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "py-3 text-lg font-semibold border-b border-zinc-900/50",
                        pathname === link.href ? "text-emerald-500" : "text-zinc-300"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                  <div className="mt-8 flex flex-col gap-4">
                    {user ? (
                      <>
                        <div className="flex items-center gap-3 px-2 py-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                                <User className="size-6" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white truncate">{user.name || "User"}</p>
                                <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                            </div>
                        </div>
                        <Button asChild className="w-full bg-zinc-900 hover:bg-zinc-800 text-white justify-start py-6">
                          <Link href="/dashboard">
                            <LayoutDashboard className="mr-2 size-5" />
                            Dashboard
                          </Link>
                        </Button>
                        <Button 
                          onClick={handleLogout} 
                          disabled={isLoggingOut}
                          variant="destructive" 
                          className="w-full py-6 flex items-center justify-center gap-2"
                        >
                          {isLoggingOut ? <Loader2 className="animate-spin size-5" /> : <LogOut className="size-5" />}
                          {isLoggingOut ? "Logging out..." : "Logout"}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button asChild className="bg-emerald-600 w-full py-6">
                          <Link href="/register">Join Now</Link>
                        </Button>
                        <Button asChild variant="outline" className="py-6 text-white border-zinc-700">
                          <Link href="/login">Login</Link>
                        </Button>
                      </>
                    )}
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