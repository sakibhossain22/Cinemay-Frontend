/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useEffect } from 'react';
import { Trash2, Play, Star, Loader2, BookmarkX } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';
import { removeFromWatchlist } from '@/actions/user.action';
import { useRouter } from 'next/navigation';

export default function WatchListClient({ initialData }: { initialData: any[] }) {
    const router = useRouter();
    const [list, setList] = useState(initialData);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        setList(initialData);
    }, [initialData]);

    const handleDelete = async (watchListId: string) => {
        try {
            setDeletingId(watchListId);
            
            const res = await removeFromWatchlist(watchListId);
            
            if (res.success) {
                setList((prev) => prev.filter(item => item.id !== watchListId));
                toast.success("Removed from watchlist");
                router.refresh(); 
            } else {
                toast.error(res.error || "Failed to remove item");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("An error occurred while removing the item");
        } finally {
            setDeletingId(null);
        }
    };

    if (list.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 bg-zinc-100 dark:bg-zinc-900/10 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-[2rem] animate-in fade-in duration-500">
                <BookmarkX size={48} className="text-zinc-400 dark:text-zinc-700 mb-4" />
                <p className="text-zinc-600 dark:text-zinc-500 font-medium text-lg">Your watchlist is empty</p>
                <Link href="/movies" className="mt-4 text-emerald-600 dark:text-emerald-500 hover:underline text-sm font-bold">Explore Movies</Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {list.map((item) => {
                const movie = item.movie;
                return (
                    <div key={item.id} className="group relative bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 rounded-3xl overflow-hidden hover:shadow-xl dark:hover:bg-zinc-900/60 transition-all duration-500">
                        
                        <div className="relative aspect-[2/3] overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                            <Image
                                src={movie.posterUrl || "/placeholder-movie.jpg"}
                                alt={movie.title}
                                fill
                                quality={30}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 dark:opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 dark:from-black via-transparent to-transparent opacity-60" />

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(item.id)}
                                disabled={deletingId === item.id}
                                className="absolute top-4 right-4 p-3 bg-white/80 dark:bg-black/60 backdrop-blur-md text-rose-600 dark:text-white hover:bg-rose-600 hover:text-white rounded-2xl transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50 z-10 shadow-lg"
                                title="Remove from Watchlist"
                            >
                                {deletingId === item.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                            </button>
                        </div>

                        {/* Details */}
                        <div className="p-5 space-y-3">
                            <div className="flex justify-between items-start gap-2">
                                <h3 className="font-bold text-zinc-800 dark:text-zinc-100 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    {movie.title}
                                </h3>
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star size={14} className="fill-amber-500" />
                                    <span className="text-xs font-bold">{movie.ratingAverage || "N/A"}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {movie.genre?.slice(0, 2).map((g: string) => (
                                    <span key={g} className="text-[10px] px-2 py-1 bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 rounded-md uppercase font-bold tracking-wider border border-zinc-200 dark:border-transparent">
                                        {g}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-2 flex gap-3">
                                <Link
                                    href={`/movies/details/${movie.customid}`}
                                    className="flex-1 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-2xl text-xs font-black uppercase flex items-center justify-center gap-2 hover:bg-emerald-600 dark:hover:bg-white transition-colors shadow-md"
                                >
                                    <Play size={14} className="fill-current" />
                                    Watch Now
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}