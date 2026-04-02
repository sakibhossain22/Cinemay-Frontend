/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { addComment, submitReview, toggleLike } from "@/actions/movieAction";
import { Button } from "../ui/button";
import { Star, ThumbsUp, MessageSquare, Send, AlertTriangle } from "lucide-react";
import { useState, useOptimistic, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";
import CommentSection from "./CommentSection";

export default function ReviewSection({ movieId, customid, userId, reviews, role, userStatus }: any) {
  const [rating, setRating] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleReviewSubmit = (formData: FormData): any => {
    if (role === "ADMIN") {
      return toast.error("Only User Can Add Review to Movie")
    }
    if (userStatus === "BANNED") {
      return toast.error("Banned User Can't Add Review to Movie")
    }
    startTransition(async () => {
      try {
        const result = await submitReview(formData);
        if (result?.success) {
          toast.success("Review added! Pending Admin Approval.");
          setRating(0);
          (document.getElementById("review-form") as HTMLFormElement)?.reset();
        } else {
          toast.error("Failed to add review");
        }
      } catch (err) {
        toast.error("Something went wrong while submitting.");
      }
    });
  };

  return (
    <div className="space-y-6 md:space-y-8 mt-10 md:mt-12 px-1">
      <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
        User Reviews <span className="text-emerald-500 text-sm bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">{reviews.length}</span>
      </h3>

      {userId ? (
        <form
          id="review-form"
          action={handleReviewSubmit}
          className="bg-zinc-900/40 p-4 md:p-6 rounded-2xl border border-white/5 space-y-5 backdrop-blur-sm"
        >
          <input type="hidden" name="movieId" value={movieId} />
          <input type="hidden" name="customId" value={customid} />
          <input type="hidden" name="userId" value={userId} />
          <input type="hidden" name="rating" value={rating} />

          <div className="space-y-2">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Your Rating</p>
            <div className="flex items-center gap-1.5 md:gap-2">
              {[...Array(10)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 md:w-6 md:h-6 cursor-pointer transition-all duration-300 ${i < rating ? "fill-yellow-500 text-yellow-500 scale-110 drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]" : "text-zinc-700 hover:text-zinc-500"}`}
                  onClick={() => setRating(i + 1)}
                />
              ))}
              <span className="ml-3 text-emerald-400 font-bold text-sm md:text-lg">{rating || "0"}<span className="text-zinc-600 text-xs font-normal">/10</span></span>
            </div>
          </div>

          <textarea
            name="content"
            placeholder="What did you think about the movie?"
            className="w-full bg-black/40 border border-zinc-800 rounded-xl p-4 text-sm focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 outline-none min-h-[100px] md:min-h-[130px] text-zinc-200 transition-all placeholder:text-zinc-600"
            required
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <label className="flex items-center gap-3 text-zinc-400 cursor-pointer group">
              <div className="relative flex items-center">
                <input type="checkbox" name="hasSpoiler" className="peer sr-only" />
                <div className="w-5 h-5 border-2 border-zinc-700 rounded-md peer-checked:bg-emerald-600 peer-checked:border-emerald-600 transition-all"></div>
                <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 left-0.5 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="group-hover:text-zinc-200 text-sm transition-colors font-medium">Contains Spoilers?</span>
            </label>
            <Button disabled={isPending} type="submit" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 px-8 rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-900/20">
              {isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="p-10 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-3xl text-center">
          <p className="text-zinc-500 font-medium">Please login to share your thoughts on this movie.</p>
        </div>
      )}

      <div className="space-y-5">
        {reviews.length === 0 && <p className="text-zinc-600 italic text-center py-10">No reviews yet. Be the first to review!</p>}
        {reviews.map((review: any) => (
          <ReviewCard key={review.id} review={review} userId={userId} customid={customid} />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review, userId, customid }: any) {
  const [showReply, setShowReply] = useState(false);
  const [isPending, startTransition] = useTransition();

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
    <div className="p-4 md:p-5 bg-zinc-900/30 rounded-2xl border border-white/5 flex flex-col gap-4 hover:border-emerald-500/20 transition-all duration-300 group/card">
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-emerald-950 border border-emerald-500/20 flex-shrink-0">
            {review.user?.image ? (
              <Image src={review.user.image} alt={review.user.name || "User"} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-emerald-400 uppercase text-sm">
                {review.user?.name?.slice(0, 1) || "U"}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-zinc-100 text-xs md:text-base truncate">{review.user?.name}</h4>
            <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">{new Date(review.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-zinc-950/80 px-2.5 py-1 rounded-full border border-white/5 shrink-0">
          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
          <span className="text-yellow-500 text-xs font-black">{review?.rating}</span>
        </div>
      </div>

      <div className="relative">
        {review.hasSpoiler ? (
          <div className="relative group/spoiler">
            <div className="blur-md select-none pointer-events-none group-hover/spoiler:blur-none group-active/spoiler:blur-none transition-all duration-500 text-zinc-300 text-sm leading-relaxed p-4 bg-zinc-800/20 rounded-xl border border-white/5">
              {review.content}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center group-hover/spoiler:opacity-0 group-active/spoiler:opacity-0 transition-opacity bg-black/40 rounded-xl backdrop-blur-sm cursor-help">
              <AlertTriangle className="text-emerald-500 mb-1" size={20} />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Spoiler - Click to view</span>
            </div>
          </div>
        ) : (
          <p className="text-zinc-300 text-sm leading-relaxed pl-1">{review.content}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <ReviewLikeButton
          reviewId={review.id}
          userId={userId}
          customid={customid}
          initialLikes={review.likeCount || 0}
          isLiked={review.likes?.some((l: any) => l.userId === userId)}
        />

        <button
          onClick={() => setShowReply(!showReply)}
          className={`flex items-center gap-2 text-[11px] font-bold transition-all px-4 py-2 rounded-full border border-white/5 ${showReply ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80"}`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Reply ({review.comments?.length || 0})</span>
        </button>
      </div>

      {showReply && (
        <form
          id={`reply-form-${review.id}`}
          action={handleReplySubmit}
          className="mt-2 flex gap-2 animate-in fade-in zoom-in-95 duration-200"
        >
          <input type="hidden" name="reviewId" value={review.id} />
          <input type="hidden" name="customId" value={customid} />
          <input
            name="content"
            autoFocus
            placeholder="Share your thoughts..."
            className="flex-1 bg-black/40 border border-zinc-800 rounded-full px-5 py-2.5 text-xs md:text-sm outline-none focus:border-emerald-500/50 text-zinc-200 transition-all"
            required
          />
          <button
            disabled={isPending}
            type="submit"
            className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-all active:scale-90 disabled:opacity-50 shrink-0"
          >
            {isPending ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
      )}

      <div className="pl-4 md:pl-8">
        <CommentSection
          comments={review.comments}
          userId={userId}
          customid={customid}
          reviewId={review.id}
        />
      </div>
    </div>
  );
}

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
          toast.success("Helpful!", { duration: 1000 });
        }
      } catch (err) {
        toast.error("Action failed");
      }
    });
  };

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className={`flex items-center gap-2 text-[11px] font-bold transition-all px-4 py-2 rounded-full border border-white/5 ${optimisticLiked ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80"}`}
    >
      <ThumbsUp className={`w-3.5 h-3.5 ${optimisticLiked ? "fill-emerald-500" : ""}`} />
      <span>{initialLikes} <span className="hidden sm:inline">Helpful</span></span>
    </button>
  );
}