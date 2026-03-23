"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Film, 
  Tv, 
  Gamepad2, 
  BookOpen, 
  User 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Movie", href: "/movies", icon: Film },
  { name: "TV Show", href: "/tv-series", icon: Tv },
  { name: "Games", href: "/games", icon: Gamepad2 },
  { name: "Novel", href: "/novels", icon: BookOpen },
];

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <section className="fixed left-0 bottom-0 w-full z-[50] bg-[#1a1b1e/80] border-t border-white/5 backdrop-blur-lg rounded-t-2xl py-3 block md:hidden">
      <ul className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.name} className="flex-1">
              <Link
                href={item.href}
                className="flex flex-col items-center justify-center gap-1 group transition-all"
              >
                <div className={cn(
                  "relative p-1 rounded-xl transition-all duration-300",
                  isActive ? "text-emerald-500 scale-110" : "text-zinc-400 group-hover:text-zinc-200"
                )}>
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  
                  {/* Active Indicator Dot */}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}
                </div>
                
                <span className={cn(
                  "text-[10px] tracking-wide transition-colors duration-300",
                  isActive ? "text-white font-bold" : "text-zinc-500 font-medium"
                )}>
                  {item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default BottomNav;