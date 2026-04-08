/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  Flame,
  Clock,
  Star,
  Heart,
  History,
  Compass,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Browse Home", url: "/", icon: Compass },
  { title: "Trending Now", url: "/trending", icon: Flame },
  { title: "New Releases", url: "/new", icon: Clock },
  { title: "Top Rated", url: "/top-rated", icon: Star },
];

const libraryItems = [
  { title: "Watchlist", url: "/watchlist", icon: Heart },
  { title: "History", url: "/history", icon: History },
];

const genreItems = [
  { title: "Action", url: "/movies?genre=Action" },
  { title: "Sci-Fi", url: "/movies?genre=Science Fiction" },
  { title: "Comedy", url: "/movies?genre=Comedy" },
  { title: "Thriller", url: "/movies?genre=Thriller" },
];

const categoryItems = [
  { title: "Movies", url: "/movies?type=MOVIE" },
  { title: "Series", url: "/movies?type=SERIES" },
  { title: "Animation", url: "/movies?type=ANIMATION" },
];

export function AppSidebar({ ...props }) {
  const pathname = usePathname();

  return (
    <Sidebar
      {...props}
      className="top-[73px] h-[calc(100vh-73px)] border-r border-zinc-900 bg-black/60 backdrop-blur-3xl"
    >
      <SidebarContent className="p-4 scrollbar-hide">
        
        {/* Main Menu Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-500 px-4 text-[10px] uppercase tracking-[4px] font-black mb-4">
            Explore
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title} className="mb-1.5">
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "h-11 px-4 rounded-xl transition-all duration-300 relative group",
                        isActive
                          ? "bg-emerald-600/10 text-emerald-500 border border-emerald-500/20"
                          : "text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-100"
                      )}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className={cn("size-5", isActive ? "text-emerald-500" : "group-hover:text-emerald-400 transition-colors")} />
                        <span className="font-bold tracking-tight">{item.title}</span>
                        {isActive && (
                          <div className="absolute left-0 w-1 h-5 bg-emerald-500 rounded-r-full" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Library Section */}
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-zinc-500 px-4 text-[10px] uppercase tracking-[4px] font-black mb-4">
            Your Library
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {libraryItems.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-1">
                  <SidebarMenuButton
                    asChild
                    className="h-10 px-4 text-zinc-400 font-bold hover:text-emerald-400 transition-all group"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="size-5 group-hover:scale-110 transition-transform" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Categories Section */}
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-zinc-500 px-4 text-[10px] uppercase tracking-[4px] font-black mb-4">
            Category
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categoryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="px-4 h-9 text-zinc-400 font-bold hover:text-white hover:translate-x-1 transition-all group"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <div className="size-1.5 bg-zinc-700 group-hover:bg-emerald-500 rounded-full transition-colors shadow-[0_0_8px_rgba(16,185,129,0)] group-hover:shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                      <span className="text-[13px] uppercase tracking-wider">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Genres Section */}
        <SidebarGroup className="mt-8 mb-6">
          <SidebarGroupLabel className="text-zinc-500 px-4 text-[10px] uppercase tracking-[4px] font-black mb-4">
            Genres
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {genreItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="px-4 h-9 text-zinc-400 font-bold hover:text-white hover:translate-x-1 transition-all group"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <div className="size-1 bg-emerald-500/40 group-hover:bg-emerald-500 rounded-full transition-all" />
                      <span className="text-[13px] uppercase tracking-wider">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}