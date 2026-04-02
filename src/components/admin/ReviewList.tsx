/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import {
    Trash2,
    CheckCircle,
    User,
    Film,
    Star,
    AlertTriangle,
    Clock
} from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import { format } from 'date-fns';
import { deleteReview, updateReviewStatus } from '@/actions/review.admin.action';

export default function ReviewList({ initialReviews }: { initialReviews: any[] }) {
    const [reviews, setReviews] = useState(initialReviews);
    const handleApprove = async (id: string, customid : string) => {
        const res = await updateReviewStatus(id,customid);
        if (!res.success) {
            toast.error("Failed to approve review");
            return;
        }

        setReviews(reviews.map(rev => rev.id === id ? { ...rev, isApproved: true } : rev));
        toast.success("Review approved successfully");
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this review forever?")) return;
        const res = await deleteReview(id);
        if (!res.success) {
            toast.error("Failed to delete review");
            return;
        }
        setReviews(reviews.filter(rev => rev.id !== id));
        toast.success("Review deleted");
    };

    return (
        <div className="grid gap-4">
            {reviews.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/5 rounded-3xl text-zinc-600 uppercase text-xs font-bold tracking-widest">
                    No reviews found in database
                </div>
            ) : (
                reviews.map((review) => (
                    <div
                        key={review.id}
                        className="group bg-zinc-900/20 border border-white/5 rounded-2xl p-4 md:p-5 hover:bg-white/[0.02] transition-all"
                    >
                        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-between items-start md:items-center">
                            <div className="flex gap-3 md:gap-4 items-start flex-1 w-full">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border border-white/10 shrink-0">
                                    {review.user?.image ? (
                                        <Image src={review.user.image} alt="User" width={40} height={40} className="object-cover w-full h-full" />
                                    ) : (
                                        <User size={16} className="text-zinc-500" />
                                    )}
                                </div>

                                <div className="space-y-1 flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                        <span className="text-xs md:text-sm font-black text-white truncate max-w-[120px] md:max-w-none">
                                            {review.user?.name}
                                        </span>
                                        <span className="hidden md:inline text-[10px] text-zinc-500">•</span>
                                        <span className="text-[9px] md:text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-1 truncate max-w-[150px]">
                                            <Film size={10} /> {review.movie?.title}
                                        </span>
                                    </div>

                                    <p className="text-zinc-400 text-xs md:text-sm italic leading-relaxed line-clamp-3 md:line-clamp-none">
                                        {review.content}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-1">
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={10}
                                                    fill={i < review.rating ? "#fbbf24" : "transparent"}
                                                    className={i < review.rating ? "text-yellow-500" : "text-zinc-800"}
                                                />
                                            ))}
                                        </div>
                                        {review.hasSpoiler && (
                                            <span className="flex items-center gap-1 text-[8px] md:text-[9px] bg-rose-500/10 text-rose-500 px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">
                                                <AlertTriangle size={10} /> Spoiler
                                            </span>
                                        )}
                                        <span className="text-[8px] md:text-[9px] text-zinc-600 flex items-center gap-1 font-bold uppercase shrink-0">
                                            <Clock size={10} /> {format(new Date(review.createdAt), 'dd MMM yy')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                                {!review.isApproved ? (
                                    <button
                                        onClick={() => handleApprove(review?.id, review?.movie?.customid)}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-500 text-black border border-emerald-500/20 px-3 md:px-4 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all"
                                    >
                                        <CheckCircle size={14} /> Approve
                                    </button>
                                ) : (
                                    <div className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-zinc-900 text-zinc-500 border border-white/5 px-3 md:px-4 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest cursor-default">
                                        <CheckCircle size={14} className="text-emerald-500" /> Approved
                                    </div>
                                )}

                                <button
                                    onClick={() => handleDelete(review.id)}
                                    className="p-2 md:p-2.5 bg-zinc-900 border border-white/5 rounded-xl text-zinc-600 hover:text-rose-500 hover:border-rose-500/30 transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}