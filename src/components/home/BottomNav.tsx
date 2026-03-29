"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { 
  Home, 
  Film, 
  Tv, 
  Music,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// নেভিগেশন আইটেম লিস্ট
const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Movie", href: "/movies", icon: Film },
  { name: "TV Show", href: "/movies?type=SERIES", icon: Tv, type: "SERIES" },
  { name: "Animation", href: "/movies?type=ANIMATION", icon: Sparkles, type: "ANIMATION" },
  { name: "Hindi Movies", href: "/movies?genre=HINDI", icon: Music, genre: "HINDI" },
];

const NavContent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // URL থেকে বর্তমান type এবং genre বের করা
  const currentType = searchParams.get("type");
  const currentGenre = searchParams.get("genre");

  return (
    <ul className="flex items-center justify-around">
      {navItems.map((item) => {
        // Active State Logic:
        // ১. যদি আইটেমে genre থাকে (যেমন Hindi), তবে URL এর genre এর সাথে মিলাবে
        // ২. যদি আইটেমে type থাকে (যেমন TV Show), তবে URL এর type এর সাথে মিলাবে
        // ৩. যদি কোনোটাই না থাকে (Home/Movie), তবে শুধু pathname চেক করবে (নিশ্চিত করবে যেন কোনো ফিল্টার না থাকে)
        const isActive = item.genre 
          ? currentGenre === item.genre 
          : item.type 
            ? currentType === item.type 
            : pathname === item.href && !currentType && !currentGenre;

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
                
                {/* Active Indicator Dot with Animation */}
                {isActive && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
              </div>
              
              <span className={cn(
                "text-[10px] tracking-wide transition-colors duration-300 whitespace-nowrap",
                isActive ? "text-white font-bold" : "text-zinc-500 font-medium"
              )}>
                {item.name}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const BottomNav = () => {
  return (
    <section className="fixed left-0 bottom-0 w-full z-[50] bg-[#1a1b1e]/90 border-t border-white/5 backdrop-blur-lg rounded-t-2xl py-3 block md:hidden shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
      {/* useSearchParams ব্যবহারের কারণে Suspense দিয়ে র‍্যাপ করা জরুরি */}
      <Suspense fallback={<div className="h-10 w-full animate-pulse bg-zinc-800/50 rounded-lg" />}>
        <NavContent />
      </Suspense>
    </section>
  );
};

export default BottomNav;