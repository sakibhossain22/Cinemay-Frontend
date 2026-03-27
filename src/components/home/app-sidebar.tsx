"use client";

import * as React from "react";
import { 
  Film, 
  Flame, 
  Clock, 
  Star, 
  Heart, 
  History, 
  Library,
  Compass,
  Zap
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

export function AppSidebar({ ...props }) {
  const pathname = usePathname();

  return (
    <Sidebar 
      {...props}
      className="top-[73px] h-[calc(100vh-73px)] border-r border-zinc-900 bg-black/40 backdrop-blur-2xl"
    >
      <SidebarContent className="p-3">
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-400 px-4 text-[10px] uppercase tracking-[3px] font-bold mb-3">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-1">
                  <SidebarMenuButton 
                    asChild 
                    className={cn(
                      "h-12 px-4 rounded-xl transition-all duration-300",
                      pathname === item.url 
                        ? "bg-emerald-600/20 text-white border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                        : "text-zinc-100 font-medium hover:bg-zinc-800/50 hover:text-white"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className="size-5" />
                      <span className="font-semibold text-white">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-zinc-400 px-4 text-[10px] uppercase tracking-[3px] font-bold mb-3">
            Library
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {libraryItems.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-1">
                  <SidebarMenuButton 
                    asChild 
                    className="h-11 px-4 text-zinc-100 font-medium hover:text-emerald-400 transition-colors"
                  >
                    <Link href={item.url}>
                      <item.icon className="size-5" />
                      <span className="text-white">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-zinc-400 px-4 text-[10px] uppercase tracking-[3px] font-bold mb-3">
            Genres
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {genreItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="px-4 text-zinc-100 font-medium hover:text-white hover:translate-x-1 transition-all"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <div className="size-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      <span className="text-white">{item.title}</span>
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