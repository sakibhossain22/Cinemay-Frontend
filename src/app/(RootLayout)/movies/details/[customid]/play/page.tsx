/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useEffect } from 'react';
import { getMovieDetails } from "@/services/movieService";
import { Download, ListVideo, Lock, ArrowLeft } from 'lucide-react';
import { getPurchaseHistory } from '@/actions/user.action';
import Link from 'next/link';

const getDriveId = (url: string) => {
    if (!url) return "";
    const regex = /\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : url;
};

export default function PlayMovie({ params }: { params: any }) {
    const [movieData, setMovieData] = useState<any>(null);
    const [activeVideoId, setActiveVideoId] = useState("");
    const [hasPurchased, setHasPurchased] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const resolvedParams = await params;
            const movieResponse = await getMovieDetails(resolvedParams.customid);
            setMovieData(movieResponse);

            // পারচেজ হিস্ট্রি চেক
            const purchaseHistory = await getPurchaseHistory();
            const purchasedMovies = purchaseHistory?.data?.movies.map((item: any) => item.movie);
            
            // স্টেট আপডেট করার সঠিক লজিক
            const isAlreadyPurchased = purchasedMovies?.some((m: any) => m.id === movieResponse.id);
            
            if (movieResponse.contentType === "FREE" || isAlreadyPurchased) {
                setHasPurchased(true);
            } else {
                setHasPurchased(false);
            }

            // ডিফল্ট ভিডিও সেট করা
            if (movieResponse?.episodeLinks && movieResponse.episodeLinks.length > 0) {
                setActiveVideoId(getDriveId(movieResponse.episodeLinks[0]));
            } else if (movieResponse?.downloadLink) {
                setActiveVideoId(getDriveId(movieResponse.downloadLink));
            }
        };
        fetchData();
    }, [params]);

    if (!movieData) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-emerald-500 animate-pulse font-bold tracking-widest uppercase">
            Loading Cinemay Player...
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-10">
            <div className="max-w-7xl mx-auto">

                {/* Video Player or Purchase Warning */}
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/10 border border-zinc-800 bg-zinc-900">
                    {hasPurchased ? (
                        <iframe
                            src={`https://drive.google.com/file/d/${activeVideoId}/preview`}
                            width="100%"
                            height="100%"
                            allow="autoplay; fullscreen"
                            className="absolute inset-0 border-0"
                        ></iframe>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-md p-6 text-center">
                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
                                <Lock className="text-red-500" size={32} />
                            </div>
                            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2 text-white">
                                Content Locked
                            </h2>
                            <p className="text-zinc-400 mb-6 max-w-sm text-xs md:text-sm">
                                This is a premium content. You need to purchase this movie to watch or download it.
                            </p>
                            <Link 
                                href={`/movies/details/${movieData.customid}`} 
                                className="flex items-center gap-2 bg-white hover:bg-emerald-500 text-black px-6 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105"
                            >
                                <ArrowLeft size={16} strokeWidth={3} />
                                BACK TO DETAILS
                            </Link>
                        </div>
                    )}
                </div>

                {/* Episode Selection - শুধু কিনলে দেখাবে */}
                {hasPurchased && movieData.episodeLinks && movieData.episodeLinks.length > 0 && (
                    <div className="mt-8">
                        <div className="flex items-center gap-2 mb-4">
                            <ListVideo size={18} className="text-emerald-500" />
                            <h3 className="font-bold uppercase tracking-widest text-xs text-zinc-400">Select Episode</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {movieData.episodeLinks.map((link: string, index: number) => {
                                const epId = getDriveId(link);
                                return (
                                    <button
                                        key={index}
                                        onClick={() => setActiveVideoId(epId)}
                                        className={`px-5 py-2 rounded-lg border text-xs font-bold transition-all ${
                                            activeVideoId === epId 
                                            ? 'bg-emerald-500 border-emerald-500 text-black scale-105' 
                                            : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-emerald-500'
                                        }`}
                                    >
                                        EP {index + 1}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Title & Download Section */}
                <div className="flex mt-10 flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-zinc-800 pb-8">
                    <h1 className="text-xl md:text-2xl font-black border-l-4 border-emerald-500 pl-4 uppercase tracking-tighter">
                        Watching : <span className="text-emerald-500">{movieData.title}</span>
                    </h1>

                    {hasPurchased && (
                        <a
                            href={`https://drive.google.com/uc?export=download&id=${activeVideoId}`}
                            target="_blank"
                            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-2 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/20"
                        >
                            <Download size={18} />
                            DOWNLOAD
                        </a>
                    )}
                </div>

                {/* Movie Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/50">
                            <h2 className="text-sm font-black text-emerald-500 mb-4 tracking-widest uppercase">Synopsis</h2>
                            <p className="text-zinc-400 leading-relaxed text-sm font-medium">
                                {movieData.synopsis}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800">
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 text-center">Movie Info</h3>
                            <div className="space-y-3">
                                <DetailItem label="DIRECTOR" value={movieData.director} />
                                <DetailItem label="RELEASE" value={movieData.releaseYear} />
                                <DetailItem label="RATING" value={`⭐ ${movieData.ratingAverage}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailItem({ label, value }: { label: string, value: any }) {
    return (
        <div className="flex justify-between items-center border-b border-zinc-800/30 pb-2">
            <span className="text-zinc-500 text-[9px] font-black tracking-widest">{label}</span>
            <span className="text-zinc-200 text-xs font-bold uppercase">{value}</span>
        </div>
    );
}