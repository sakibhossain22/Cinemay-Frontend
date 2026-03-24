/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Bookmark, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { toggleWatchlist } from "@/actions/movieAction";

export default function MovieInteractions({ movieId, userId, isAddedToWatchlist }: any) {
  const [isPending, startTransition] = useTransition();
  const [inWatchlist, setInWatchlist] = useState(isAddedToWatchlist);

  // ওয়াচলিস্ট হ্যান্ডলার
  const handleWatchlist = () => {
    if (!userId) {
      return toast.error("Please login to add to watchlist");
    }

    startTransition(async () => {
      // Optimistic Update: সার্ভার রেসপন্সের আগেই UI চেঞ্জ করে দেওয়া
      setInWatchlist((prev: boolean) => !prev);

      const result = await toggleWatchlist(movieId);
      
      if (result.success) {
        toast.success(inWatchlist ? "Removed from Watchlist" : "Added to Watchlist", {
            icon: <Bookmark className="w-4 h-4 fill-current" />
        });
      } else {
        // ফেইল করলে আগের অবস্থায় ফেরত নেওয়া
        setInWatchlist((prev: boolean) => !prev);
        toast.error("Something went wrong!");
      }
    });
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex items-center gap-6 py-4">
      {/* Watchlist Button */}
      <button 
        onClick={handleWatchlist}
        disabled={isPending}
        className={`flex items-center gap-2 transition-all duration-300 ${
          inWatchlist ? "text-emerald-400" : "text-zinc-400 hover:text-emerald-400"
        }`}
      >
        <Bookmark 
          className={`w-6 h-6 transition-all ${inWatchlist ? "fill-emerald-400 scale-110" : "fill-none"}`} 
        />
        <span className="text-sm font-medium">
          {inWatchlist ? "In Watchlist" : "Watchlist"}
        </span>
      </button>

      {/* Share Button */}
      <button 
        onClick={handleShare}
        className="flex items-center gap-2 text-zinc-400 hover:text-blue-400 transition-colors"
      >
        <Share2 className="w-6 h-6" />
        <span className="text-sm font-medium">Share</span>
      </button>
    </div>
  );
}