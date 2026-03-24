/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { addComment, submitReview, toggleLike } from "@/actions/movieAction";
import { Button } from "../ui/button";
import { Star, ThumbsUp, MessageSquare, Send } from "lucide-react";
import { useState, useOptimistic, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";
import CommentSection from "./CommentSection";

export default function ReviewSection({ movieId, customid, userId, reviews }: any) {
  const [rating, setRating] = useState(0);
  const [isPending, startTransition] = useTransition();

  // টাইপ এরর ফিক্স: ফাংশনটি এখন কিছুই রিটার্ন করবে না (void)
  const handleReviewSubmit = (formData: FormData): void => {
    startTransition(async () => {
      try {
        const result = await submitReview(formData);
        if (result?.success) {
          toast.success("Review added successfully!");
          setRating(0);
          (document.getElementById("review-form") as HTMLFormElement)?.reset();
        } else {
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

      {/* --- Review Input Form --- */}
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
            <Button disabled={isPending} type="submit" className="bg-emerald-600 hover:bg-emerald-700 font-bold px-6">
              {isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="p-8 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-2xl text-center text-zinc-500">
          Please login to leave a review.
        </div>
      )}

      {/* --- Reviews List --- */}
      <div className="space-y-6">
        {reviews.length === 0 && <p className="text-zinc-600 italic">No reviews yet.</p>}
        {reviews.map((review: any) => (
          <ReviewCard key={review.id} review={review} userId={userId} customid={customid} />
        ))}
      </div>
    </div>
  );
}

/**
 * ইন্ডিভিজুয়াল রিভিউ কার্ড কম্পোনেন্ট
 */
function ReviewCard({ review, userId, customid }: any) {
  const [showReply, setShowReply] = useState(false);
  const [isPending, startTransition] = useTransition();

  // টাইপ এরর ফিক্স: action প্রপস এর জন্য ফাংশনটি async হওয়া সত্ত্বেও কিছু রিটার্ন করবে না
  const handleReplySubmit = (formData: FormData): void => {
    if (!userId) {
      toast.error("Please login to reply");
      return;
    }

    startTransition(async () => {
      try {
        const result = await addComment(formData);
        if (result?.success) {
          toast.success("Reply posted!");
          setShowReply(false);
          (document.getElementById(`reply-form-${review.id}`) as HTMLFormElement)?.reset();
        } else {
          toast.error(result?.error || "Failed to post reply");
        }
      } catch (err) {
        toast.error("An error occurred");
      }
    });
  };

  return (
    <div className="p-5 bg-zinc-900/40 rounded-2xl border border-white/5 flex flex-col gap-4 hover:border-emerald-500/20 transition-all">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-emerald-900/50 flex items-center justify-center shrink-0 border border-emerald-500/20">
            {review.user?.image ? (
              <Image src={review.user.image} alt={review.user.name || "User"} width={40} height={40} className="object-cover" />
            ) : (
              <span className="font-bold text-lg text-emerald-200 uppercase">{review.user?.name?.slice(0, 1) || "U"}</span>
            )}
          </div>
          <div>
            <h4 className="font-bold text-zinc-100 leading-tight">{review.user?.name}</h4>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-black/60 px-2.5 py-1 rounded-lg border border-white/5 shadow-inner">
          <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
          <span className="text-yellow-500 text-xs font-bold">{review.rating}/10</span>
        </div>
      </div>

      <div className="pl-1">
        <div className={`text-sm leading-relaxed transition-all duration-700 ${review.hasSpoiler ? "blur-md hover:blur-none cursor-help bg-zinc-800/10 p-3 rounded-xl border border-white/5" : "text-zinc-300"}`}>
          {review.hasSpoiler && <span className="text-[10px] bg-red-900/30 text-red-400 px-2 py-0.5 rounded-full font-bold inline-block mb-2 uppercase border border-red-500/20">Spoiler Alert</span>}
          <p>{review.content}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-3 border-t border-white/5 mt-1">
        <ReviewLikeButton
          reviewId={review.id}
          userId={userId}
          customid={customid}
          initialLikes={review.likeCount || 0}
          isLiked={review.likes?.some((l: any) => l.userId === userId)}
        />

        <button
          onClick={() => setShowReply(!showReply)}
          className={`flex items-center gap-2 text-xs font-semibold transition-all px-3 py-1.5 rounded-full border border-white/5 ${showReply ? "text-emerald-400 bg-emerald-500/10" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"}`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Reply ({review.comments?.length || 0})</span>
        </button>
      </div>

      {showReply && (
        <form
          id={`reply-form-${review.id}`}
          action={handleReplySubmit}
          className="mt-2 flex gap-2 animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <input type="hidden" name="reviewId" value={review.id} />
          <input type="hidden" name="customId" value={customid} />
          <input
            name="content"
            autoFocus
            placeholder="Write a reply..."
            className="flex-1 bg-black/60 border border-zinc-800 rounded-full px-4 py-2 text-sm outline-none focus:border-emerald-500 text-zinc-200 transition-all shadow-inner"
            required
          />
          <button
            disabled={isPending}
            type="submit"
            className="w-10 h-10 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-transform active:scale-90 disabled:opacity-50"
          >
            {isPending ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
      )}

      <CommentSection
        comments={review.comments} 
        userId={userId}
        customid={customid}
        reviewId={review.id}
      />
    </div>
  );
}

/**
 * লাইক বাটন কম্পোনেন্ট
 */
function ReviewLikeButton({ reviewId, userId, customid, initialLikes, isLiked }: any) {
  const [isPending, startTransition] = useTransition();
  const [optimisticLiked, toggleOptimisticLiked] = useOptimistic(isLiked, (state: boolean) => !state);

  const handleLike = (): void => {
    if (!userId) {
      toast.error("Login to like this review");
      return;
    }
    startTransition(async () => {
      toggleOptimisticLiked(null);
      try {
        const result = await toggleLike(reviewId, userId, customid);
        if (result?.success && result.isLiked) {
          toast.success("Helpful mark added!", { duration: 1500 });
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
      className={`flex items-center gap-2 text-xs font-semibold transition-all px-3 py-1.5 rounded-full border border-white/5 ${optimisticLiked ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"}`}
    >
      <ThumbsUp className={`w-4 h-4 ${optimisticLiked ? "fill-emerald-500" : ""}`} />
      <span>{initialLikes} Helpful</span>
    </button>
  );
}