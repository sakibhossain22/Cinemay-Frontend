/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Bookmark, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState, useTransition, useMemo } from "react";
import { getWatchListByUser, toggleWatchlist } from "@/actions/movieAction";

export default function MovieInteractions({ movieId, userId }: any) {
  const [isPending, startTransition] = useTransition();
  const [watchLists, setWatchLists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(watchLists)
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        setLoading(true);
        const result = await getWatchListByUser(userId);
        if (result.success) {
          setWatchLists(result.data || []);
        }
      } catch (err) {
        console.error("Watchlist fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchWatchlist();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const inWatchlist = useMemo(() => {
    return watchLists.some((item: any) => item.movieId === movieId);
  }, [watchLists, movieId]);

  const handleWatchlist = () => {
    if (!userId) {
      return toast.error("Please login to add to watchlist");
    }

    // মুভিটি অলরেডি অ্যাড করা থাকলে আর সার্ভার কল হবে না
    if (inWatchlist) {
      return toast.info("Movie already added to watchlist");
    }

    startTransition(async () => {
      const result = await toggleWatchlist(movieId);

      if (result.success) {
        // শুধুমাত্র অ্যাড হওয়ার পর লোকাল স্টেট আপডেট
        setWatchLists((prev) => [...prev, { movieId }]);

        toast.success("Added to Watchlist", {
          icon: <Bookmark className="w-4 h-4 fill-current" />
        });
      } else {
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

  const isLoadingState = loading || isPending;

  return (
    <div className="flex items-center gap-6 py-4">
      <button
        onClick={handleWatchlist}
        disabled={isLoadingState}
        className={`flex items-center gap-2 transition-all duration-300 ${
          inWatchlist ? "text-emerald-400" : "text-zinc-400 hover:text-emerald-400"
        } ${isLoadingState ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <Bookmark
          className={`w-6 h-6 transition-all ${
            inWatchlist ? "fill-emerald-400 scale-110" : "fill-none"
          }`}
        />
        <span className="text-sm font-medium">
          {loading ? "Checking..." : inWatchlist ? "In Watchlist" : "Watchlist"}
        </span>
      </button>

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