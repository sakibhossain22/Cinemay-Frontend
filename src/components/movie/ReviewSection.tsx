/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { submitReview } from "@/actions/movieAction";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { useState } from "react";

export default function ReviewSection({ movieId, userId, reviews }: any) {
  const [rating, setRating] = useState(0);

  return (
    <div className="space-y-8 mt-12">
      <h3 className="text-2xl font-bold text-white">User Reviews ({reviews.length})</h3>

      {/* Review Form */}
      {userId && (
        <form action={submitReview} className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 space-y-4">
          <input type="hidden" name="movieId" value={movieId} />
          <input type="hidden" name="userId" value={userId} />
          <input type="hidden" name="rating" value={rating} />

          <div className="flex gap-2">
            {[...Array(10)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 cursor-pointer ${i < rating ? "fill-yellow-500 text-yellow-500" : "text-zinc-600"}`}
                onClick={() => setRating(i + 1)}
              />
            ))}
          </div>

          <textarea
            name="content"
            placeholder="Write your review here..."
            className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm focus:border-emerald-500 outline-none min-h-[100px]"
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
              <input type="checkbox" name="isSpoiler" className="accent-emerald-500" />
              Contains Spoilers?
            </label>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">Submit Review</Button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review: any) => (
          <div key={review.id} className="p-4 bg-zinc-900/30 rounded-xl border border-white/5">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-zinc-200">User_{review.userId.slice(0,5)}</span>
              <span className="text-yellow-500 text-sm font-bold">★ {review.rating}/10</span>
            </div>
            
            <p className={`text-sm ${review.isSpoiler ? "blur-md hover:blur-none transition-all cursor-help" : "text-zinc-400"}`}>
              {review.isSpoiler ? "Spoiler Alert: " + review.content : review.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}