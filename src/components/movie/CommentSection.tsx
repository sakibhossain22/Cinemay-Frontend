/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { MessageCircle } from "lucide-react";

export default function CommentSection({ comments }: { comments: any[] }) {
    if (!comments || comments.length === 0) return null;

    return (
        <div className="mt-4 pl-4 md:pl-10 space-y-4 border-l-2 border-zinc-800">
            <div className="flex items-center gap-2 text-zinc-500 mb-2">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Replies</span>
            </div>

            {comments.map((comment) => (
                <div key={comment.id} className="group">
                    <div className="flex gap-3 items-start">
                        {/* User Avatar */}
                        <div className="relative w-7 h-7 rounded-full overflow-hidden bg-zinc-800 shrink-0 border border-white/5">
                            {comment.user?.image ? (
                                <Image
                                    src={comment.user.image}
                                    alt={comment.user.name || "User"}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-700 text-[10px] font-bold text-zinc-300">
                                    {comment.user?.name?.slice(0, 1) || "U"}
                                </div>
                            )}
                        </div>

                        {/* Comment Bubble */}
                        <div className="flex-1 bg-zinc-800/40 p-3 rounded-2xl rounded-tl-none border border-white/5 group-hover:bg-zinc-800/60 transition-colors">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-bold text-emerald-400">
                                    {comment.user?.name}
                                </span>
                                <span className="text-[9px] font-semibold text-zinc-500">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-sm text-zinc-300 leading-snug">
                                {comment.content}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}