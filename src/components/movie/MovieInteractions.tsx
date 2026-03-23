/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useOptimistic } from "react";
import { Heart, Bookmark, Share2 } from "lucide-react";
import { toast } from "sonner";
import { toggleLike } from "@/actions/movieAction";

export default function MovieInteractions({ movieId, userId, initialLikes, isLiked }: any) {
  // Optimistic UI: সার্ভার রেসপন্সের আগেই লাইক সংখ্যা আপডেট করা
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    { count: initialLikes, liked: isLiked },
    (state) => ({
      count: state.liked ? state.count - 1 : state.count + 1,
      liked: !state.liked,
    })
  );

  const handleLike = async () => {
    if (!userId) return toast.error("Please login to like!");
    
    addOptimisticLike(null); // সাথে সাথে UI আপডেট
    await toggleLike(movieId, userId);
  };

  return (
    <div className="flex items-center gap-6 py-4">
      <button onClick={handleLike} className="flex items-center gap-2 group">
        <Heart className={`w-6 h-6 transition-colors ${optimisticLikes.liked ? "fill-red-500 text-red-500" : "text-zinc-400 group-hover:text-red-400"}`} />
        <span className="text-sm font-medium">{optimisticLikes.count} Likes</span>
      </button>
      
      <button className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors">
        <Bookmark className="w-6 h-6" />
        <span className="text-sm font-medium">Watchlist</span>
      </button>

      <button className="flex items-center gap-2 text-zinc-400 hover:text-blue-400 transition-colors">
        <Share2 className="w-6 h-6" />
        <span className="text-sm font-medium">Share</span>
      </button>
    </div>
  );
}