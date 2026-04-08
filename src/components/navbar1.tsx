/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, LayoutDashboard, Loader2, LogOut, User, Sun, Moon, LifeBuoy, Scale, HelpCircle, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const user = userInfo?.user;
  const isLoading = userInfo === undefined;

  // Handle clicking outside to close the resources dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMounted(true);
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
        "sticky top-0 z-50 w-full transition-all duration-500",
        isScrolled
          ? "bg-white/95 dark:bg-black/90 backdrop-blur-md border-b border-zinc-200 dark:border-emerald-500/20 py-3 shadow-sm"
          : "bg-transparent border-b border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* Logo Section */}
          <div className="flex items-center gap-10 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform duration-500">
                <span className="text-white font-black text-xl">C</span>
              </div>
              <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-zinc-900 to-emerald-600 dark:from-white dark:to-emerald-400 bg-clip-text text-transparent hidden sm:block uppercase">
                CinemaY
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xs font-black uppercase tracking-widest transition-all hover:text-emerald-600 dark:hover:text-emerald-400",
                    pathname === link.href
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-zinc-500 dark:text-zinc-400"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            {/* New Resources Dropdown */}
            <div className="relative invisible lg:visible" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl  transition-all text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-emerald-500 border border-transparent"
              >

                <span className="text-xs font-black uppercase tracking-widest transition-all hover:text-emerald-600 dark:hover:text-emerald-300">Resources</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-3 w-52 p-2 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-xl">
                  <DropdownLink icon={<Scale size={14} />} title="Terms & Condition" href="/terms" />
                  <DropdownLink icon={<HelpCircle size={14} />} title="FAQ" href="/faq" />
                  <DropdownLink icon={<LifeBuoy size={14} />} title="Help & Support" href="/contact-us" />
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <NavMovieSearch />
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">

            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 bg-zinc-100/50 dark:bg-zinc-900/50 border border-transparent hover:border-emerald-500/20"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            )}

            {isLoading ? (
              <Loader2 className="size-5 animate-spin text-emerald-500" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <Button asChild variant="ghost" size="sm" className="text-zinc-600 dark:text-zinc-300 font-bold uppercase tracking-tighter text-[11px] rounded-xl hover:bg-emerald-500/10 hover:text-emerald-600">
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
                  className="bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-xl font-black uppercase text-[11px] px-4"
                >
                  {isLoggingOut ? <Loader2 className="mr-2 size-4 animate-spin" /> : <LogOut className="mr-2 size-4" />}
                  {isLoggingOut ? "..." : "Logout"}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button asChild variant="ghost" size="sm" className="text-zinc-600 dark:text-zinc-300 font-black uppercase tracking-widest text-[10px]">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm" className="bg-zinc-900 dark:bg-emerald-600 hover:bg-black dark:hover:bg-emerald-500 text-white rounded-xl font-black uppercase tracking-widest text-[10px] px-6 shadow-lg shadow-emerald-500/10">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 rounded-lg"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-emerald-600 bg-emerald-500/10 rounded-lg">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white dark:bg-black border-zinc-200 dark:border-zinc-900 w-[300px] p-0">
                <SheetHeader className="p-8 border-b border-zinc-100 dark:border-zinc-900">
                  <SheetTitle className="text-emerald-600 dark:text-emerald-500 font-black uppercase tracking-tighter text-2xl">CinemaY</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 p-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "py-4 text-sm font-black uppercase tracking-widest border-b border-zinc-50 dark:border-zinc-900/50",
                        pathname === link.href ? "text-emerald-600" : "text-zinc-600 dark:text-zinc-400"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}

                  <div className="mt-10 flex flex-col gap-4">
                    {user ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 px-4 py-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                            <User size={24} />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-sm font-black text-zinc-900 dark:text-white uppercase truncate">{user.name || "User"}</p>
                            <p className="text-[10px] font-bold text-zinc-400 truncate uppercase">{user.email}</p>
                          </div>
                        </div>
                        <Button asChild className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-7 rounded-2xl font-black uppercase tracking-widest">
                          <Link href="/dashboard">
                            <LayoutDashboard className="mr-2 size-5" />
                            Dashboard
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <Button asChild className="bg-emerald-600 hover:bg-emerald-500 w-full py-7 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20">
                        <Link href="/register">Join Now</Link>
                      </Button>
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
function DropdownLink({ icon, title, href }: { icon: React.ReactNode, title: string, href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-emerald-500/10 text-zinc-400 hover:text-emerald-500 transition-all group"
    >
      <span className="text-zinc-500 group-hover:text-emerald-500 transition-colors">{icon}</span>
      <span className="text-[10px] font-black uppercase tracking-wider">{title}</span>
    </Link>
  );
}
export default Navbar;