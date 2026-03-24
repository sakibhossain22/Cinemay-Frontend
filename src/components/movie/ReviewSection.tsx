/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { submitReview, toggleLike } from "@/actions/movieAction";
import { Button } from "../ui/button";
import { Star, ThumbsUp } from "lucide-react";
import { useState, useOptimistic, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";

export default function ReviewSection({ movieId, customid, userId, reviews }: any) {
  const [rating, setRating] = useState(0);
  const [isPending, startTransition] = useTransition();

  // রিভিউ সাবমিট হ্যান্ডলার
  const handleReviewSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await submitReview(formData);
        if (result?.success) {
          toast.success("Review added successfully!");
          setRating(0); // স্টার রিসেট
          const form = document.getElementById("review-form") as HTMLFormElement;
          form?.reset(); // ফর্ম রিসেট
        } else {
          // এরর মেসেজ দেখালে সেটি ডাইনামিকালি দেখাবে
          toast.error(!result?.success || "Failed to add review");
        }
      } catch (err) {
        toast.error("Something went wrong while submitting.");
      }
    });
  };

  return (
    <div className="space-y-8 mt-12">
      <h3 className="text-2xl font-bold text-white">User Reviews ({reviews.length})</h3>

      {/* --- Review Form --- */}
      {userId ? (
        <form 
          id="review-form"
          action={handleReviewSubmit} 
          className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 space-y-4"
        >
          <input type="hidden" name="movieId" value={movieId} />
          <input type="hidden" name="customId" value={customid} />
          <input type="hidden" name="userId" value={userId} />
          <input type="hidden" name="rating" value={rating} />

          {/* Star Rating Input */}
          <div className="flex gap-2">
            {[...Array(10)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 cursor-pointer transition-all ${i < rating ? "fill-yellow-500 text-yellow-500 scale-110" : "text-zinc-600 hover:text-zinc-400"}`}
                onClick={() => setRating(i + 1)}
              />
            ))}
            <span className="ml-2 text-zinc-400 text-sm font-medium">{rating}/10</span>
          </div>

          <textarea
            name="content"
            placeholder="Write your review here..."
            className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm focus:border-emerald-500 outline-none min-h-[120px] text-zinc-200 transition-colors"
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer group">
              <input type="checkbox" name="hasSpoiler" className="w-4 h-4 accent-emerald-500 cursor-pointer" />
              <span className="group-hover:text-zinc-200 transition-colors">Contains Spoilers?</span>
            </label>
            <Button 
              type="submit" 
              disabled={isPending}
              className="bg-emerald-600 hover:bg-emerald-700 font-bold px-6 py-2 rounded-xl transition-all active:scale-95"
            >
              {isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="p-8 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-2xl text-center text-zinc-500">
          Please login to leave a review and join the conversation.
        </div>
      )}

      {/* --- Reviews List --- */}
      <div className="space-y-6">
        {reviews.length === 0 && <p className="text-zinc-600 italic">No reviews yet. Be the first one!</p>}
        
        {reviews.map((review: any) => (
          <div key={review.id} className="p-5 bg-zinc-900/40 rounded-2xl border border-white/5 flex flex-col gap-4 hover:border-emerald-500/20 transition-all">
            {/* User Info Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-emerald-900/50 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  {review.user?.image ? (
                    <Image 
                      src={review.user.image} 
                      alt={review.user.name || "User"} 
                      width={40} 
                      height={40} 
                      className="object-cover" 
                    />
                  ) : (
                    <span className="font-bold text-lg text-emerald-200 uppercase">
                      {review.user?.name?.slice(0, 1) || "U"}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-zinc-100 leading-tight">{review.user?.name}</h4>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-black/60 px-2.5 py-1 rounded-lg border border-white/5 shadow-inner">
                <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                <span className="text-yellow-500 text-xs font-bold">{review.rating}/10</span>
              </div>
            </div>

            {/* Review Content */}
            <div className="pl-1">
              <div className={`text-sm leading-relaxed transition-all duration-700 ${review.hasSpoiler ? "blur-md hover:blur-none cursor-help bg-zinc-800/10 p-3 rounded-xl border border-white/5" : "text-zinc-300"}`}>
                {review.hasSpoiler && (
                  <span className="text-[10px] bg-red-900/30 text-red-400 px-2 py-0.5 rounded-full font-bold inline-block mb-2 uppercase tracking-tighter border border-red-500/20">
                    Spoiler Alert
                  </span>
                )}
                <p>{review.content}</p>
              </div>
            </div>

            {/* Like/Helpful Button Section */}
            <div className="flex items-center gap-4 pt-3 border-t border-white/5 mt-1">
              <ReviewLikeButton
                reviewId={review.id}
                userId={userId}
                customid={customid}
                initialLikes={review.likeCount || 0}
                isLiked={review.likes?.some((l: any) => l.userId === userId)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * আলাদা লাইক বাটন কম্পোনেন্ট (Optimistic UI ফিক্স সহ)
 */
function ReviewLikeButton({ reviewId, userId, customid, initialLikes, isLiked }: any) {
  const [isPending, startTransition] = useTransition();
  
  // সংখ্যা ছাড়াই শুধু লাইক স্ট্যাটাস টগল হবে
  const [optimisticLiked, toggleOptimisticLiked] = useOptimistic(
    isLiked,
    (state: boolean) => !state
  );

  const handleLike = async () => {
    if (!userId) return toast.error("Login to like this review");
    
    startTransition(async () => {
      // আইকন এবং কালার সাথে সাথে টগল হবে
      toggleOptimisticLiked(null); 
      
      try {
        const result = await toggleLike(reviewId, userId, customid);
        if (result?.success) {
          if (result.isLiked) {
             toast.success("Marked as helpful!", { duration: 1500 });
          } else {
             toast.info("Removed helpful mark", { duration: 1500 });
          }
        }
      } catch (err) {
        toast.error("Failed to update like");
      }
    });
  };

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className={`flex items-center gap-2 text-xs font-semibold transition-all px-3 py-1.5 rounded-full border border-white/5 ${
        optimisticLiked 
        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
      }`}
    >
      <ThumbsUp className={`w-4 h-4 ${optimisticLiked ? "fill-emerald-500" : "group-hover:scale-110 transition-transform"}`} />
      {/* এখানে initialLikes ই থাকবে, revalidatePath হলে স্বয়ংক্রিয়ভাবে সংখ্যা বদলাবে */}
      <span>{initialLikes} Helpful</span>
    </button>
  );
}