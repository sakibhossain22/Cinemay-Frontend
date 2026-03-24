/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState, useTransition, useMemo } from "react";
import { Send, MessageCircle } from "lucide-react";
import { addComment } from "@/actions/movieAction";
import { toast } from "sonner";

export default function CommentSection({ comments, userId, customid, reviewId, depth = 0 }: any) {
    // ডাটা যদি ফ্ল্যাট হয়, তবে সেটাকে নেস্টেড ট্রিতে রূপান্তর করি
    const nestedComments = useMemo(() => {
        if (depth > 0) return comments; // অলরেডি নেস্টেড থাকলে আর দরকার নেই

        const map: any = {};
        const roots: any[] = [];

        comments.forEach((c: any) => {
            map[c.id] = { ...c, replies: c.replies || [] };
        });

        comments.forEach((c: any) => {
            if (c.parentId && map[c.parentId]) {
                // যদি রিপ্লাই অলরেডি ডুপ্লিকেট না থাকে তবেই পুশ করবে
                if (!map[c.parentId].replies.find((r: any) => r.id === c.id)) {
                    map[c.parentId].replies.push(map[c.id]);
                }
            } else if (!c.parentId) {
                roots.push(map[c.id]);
            }
        });
        return roots;
    }, [comments, depth]);

    if (!nestedComments || nestedComments.length === 0) return null;

    return (
        <div className={`space-y-4 ${depth > 0 ? "ml-8 md:ml-12 border-l-2 border-zinc-800 pl-4 mt-2" : "mt-6"}`}>
            {nestedComments.map((comment: any) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    userId={userId}
                    customid={customid}
                    reviewId={reviewId}
                    depth={depth}
                />
            ))}
        </div>
    );
}

function CommentItem({ comment, userId, customid, reviewId, depth }: any) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleNestedReply = (formData: FormData): void => {
        if (!userId) {
            toast.error("Please login to reply");
            return;
        }

        startTransition(async () => {
            const result = await addComment(formData);
            if (result?.success) {
                toast.success("Reply added!");
                setShowReplyForm(false);
                (document.getElementById(`form-${comment.id}`) as HTMLFormElement)?.reset();
            }
        });
    };

    return (
        <div className="animate-in fade-in slide-in-from-left-2 duration-300">
            <div className="flex gap-3 items-start relative">
                {/* কানেক্টিং লাইন */}
                {depth > 0 && (
                    <div className="absolute -left-[18px] top-4 w-4 h-[1px] bg-zinc-800" />
                )}

                <div className={`shrink-0 rounded-full bg-zinc-800 border border-white/5 overflow-hidden ${depth > 0 ? "w-7 h-7" : "w-9 h-9"}`}>
                    {comment.user?.image ? (
                        <Image src={comment.user.image} alt="U" width={40} height={40} />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-500 uppercase">
                            {comment.user?.name?.[0]}
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <div className="bg-zinc-900/60 p-3 rounded-2xl rounded-tl-none border border-white/5">
                        <p className="text-[11px] font-bold text-emerald-500 mb-1">{comment.user?.name}</p>
                        <p className="text-sm text-zinc-300 leading-relaxed">{comment.content}</p>
                    </div>

                    <button
                        onClick={() => setShowReplyForm(!showReplyForm)}
                        className="text-[10px] font-bold text-zinc-500 mt-1 ml-2 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                    >
                        <MessageCircle className="w-3 h-3" /> Reply
                    </button>

                    {showReplyForm && (
                        <form id={`form-${comment.id}`} action={handleNestedReply} className="mt-2 flex gap-2">
                            <input type="hidden" name="reviewId" value={reviewId} />
                            <input type="hidden" name="customId" value={customid} />
                            <input type="hidden" name="parentId" value={comment.id} />
                            <input
                                name="content"
                                autoFocus
                                placeholder="Write a reply..."
                                className="flex-1 bg-black/40 border border-zinc-800 rounded-full px-4 py-1.5 text-xs outline-none focus:border-emerald-500 text-zinc-200"
                                required
                            />
                            <button disabled={isPending} type="submit" className="text-emerald-500">
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    )}

                    {/* নেস্টেড রিপ্লাই রেন্ডার করার জন্য রিকার্সিভ কল */}
                    {comment.replies && comment.replies.length > 0 && (
                        <CommentSection
                            comments={comment.replies}
                            userId={userId}
                            customid={customid}
                            reviewId={reviewId}
                            depth={depth + 1}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}