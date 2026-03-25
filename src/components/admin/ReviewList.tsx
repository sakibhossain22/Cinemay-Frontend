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

    const handleApprove = async (id: string) => {
        // const res = await approveReview(id);
        const res = await updateReviewStatus(id);
        if (!res.success) {
            toast.error("Failed to approve review");
            return;
        }

        setReviews(reviews.map(rev => rev.id === id ? { ...rev, isApproved: true } : rev));
        toast.success("Review approved successfully");
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this review forever?")) return;
        // await deleteReview(id);
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
                        className="group bg-zinc-900/20 border border-white/5 rounded-2xl p-5 hover:bg-white/[0.02] transition-all"
                    >
                        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">

                            {/* Reviewer & Content */}
                            <div className="flex gap-4 items-start flex-1">
                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border border-white/10 shrink-0">
                                    {review.user?.image ? (
                                        <Image src={review.user.image} alt="User" width={40} height={40} />
                                    ) : (
                                        <User size={18} className="text-zinc-500" />
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-black text-white">{review.user?.name}</span>
                                        <span className="text-[10px] text-zinc-500">•</span>
                                        <span className="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-1">
                                            <Film size={10} /> {review.movie?.title}
                                        </span>
                                    </div>

                                    <p className="text-zinc-400 text-sm italic leading-relaxed">
                                        {review.content}
                                    </p>

                                    <div className="flex items-center gap-4 pt-1">
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
                                            <span className="flex items-center gap-1 text-[9px] bg-rose-500/10 text-rose-500 px-2 py-0.5 rounded font-black uppercase tracking-tighter">
                                                <AlertTriangle size={10} /> Spoiler
                                            </span>
                                        )}
                                        <span className="text-[9px] text-zinc-600 flex items-center gap-1 font-bold uppercase">
                                            <Clock size={10} /> {format(new Date(review.createdAt), 'dd MMM yyyy')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                                {!review.isApproved ? (
                                    <button
                                        onClick={() => handleApprove(review.id)}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-500  text-black border border-emerald-500/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-900 hover:text-white transition-all"
                                    >
                                        <CheckCircle size={14} /> Approve
                                    </button>
                                ) : (
                                    <div className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-zinc-900 text-zinc-500 border border-white/5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-default">
                                        <CheckCircle size={14} className="text-emerald-500" /> Approved
                                    </div>
                                )}

                                <button
                                    onClick={() => handleDelete(review.id)}
                                    className="p-2.5 bg-zinc-900 border border-white/5 rounded-xl text-zinc-600 hover:text-rose-500 hover:border-rose-500/30 transition-all"
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