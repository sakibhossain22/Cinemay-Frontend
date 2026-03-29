/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useEffect } from 'react';
import { getMovieDetails, getMoviesByCategory } from "@/services/movieService";
import { Download, ListVideo, Lock, ArrowLeft, Info, Calendar, Star, User, Play } from 'lucide-react';
import { getPurchaseHistory } from '@/actions/user.action';
import Link from 'next/link';
import Image from 'next/image';

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
    const [relatedMovies, setRelatedMovies] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const resolvedParams = await params;
            const movieResponse = await getMovieDetails(resolvedParams.customid);
            setMovieData(movieResponse);

            const categoryMovies = await getMoviesByCategory(movieResponse.categories?.[0]?.name ?? "TRENDING");
            const catMovies = categoryMovies.data;
            setRelatedMovies(catMovies.filter((m: any) => m.id !== movieResponse.id).slice(0, 6));

            const purchaseHistory = await getPurchaseHistory();
            const purchasedMovies = purchaseHistory?.data?.movies.map((item: any) => item.movie);
            const isAlreadyPurchased = purchasedMovies?.some((m: any) => m.id === movieResponse.id);

            if (movieResponse.contentType === "FREE" || isAlreadyPurchased) {
                setHasPurchased(true);
            } else {
                setHasPurchased(false);
            }

            if (movieResponse?.episodeLinks && movieResponse.episodeLinks.length > 0) {
                setActiveVideoId(getDriveId(movieResponse.episodeLinks[0]));
            } else if (movieResponse?.downloadLink) {
                setActiveVideoId(getDriveId(movieResponse.downloadLink));
            }
        };
        fetchData();
    }, [params]);

    if (!movieData) return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center text-emerald-500 animate-pulse font-bold uppercase tracking-tighter">
            Initializing Cinemay Player...
        </div>
    );

    // চেক করা হচ্ছে এটি সিরিজ কি না
    const isSeries = movieData.episodeLinks && movieData.episodeLinks.length > 0;

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* Left Column: Video Player & Title */}
                    <div className="flex-1 lg:pl-4">
                        <div className="w-full bg-black shadow-2xl relative">
                            <div className="relative w-full aspect-video max-h-[80vh] mx-auto bg-zinc-900 overflow-hidden">
                                {hasPurchased ? (
                                    <iframe
                                        src={`https://drive.google.com/file/d/${activeVideoId}/preview`}
                                        width="100%"
                                        height="100%"
                                        allow="autoplay; fullscreen"
                                        className="absolute inset-0 border-0"
                                    ></iframe>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl p-6 text-center">
                                        <Lock className="text-red-500 mb-6 animate-bounce" size={48} />
                                        <h2 className="text-2xl font-black uppercase mb-3">Premium Content</h2>
                                        <p className="text-zinc-500 mb-8 max-w-sm text-sm font-medium">Please purchase the movie to unlock streaming and downloads.</p>
                                        <Link href={`/movies/details/${movieData.customid}`} className="bg-emerald-500 text-black px-8 py-3 rounded-full font-black text-xs hover:scale-105 transition-transform">
                                            BUY NOW
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-4 lg:px-0 mt-4">
                            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter">{movieData.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 mt-3 pb-6 border-b border-zinc-800/50">
                                <div className="flex items-center gap-1 text-emerald-500 font-bold text-sm bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                    <Star size={14} fill="currentColor" /> {movieData.ratingAverage}
                                </div>
                                <span className="text-zinc-500 text-xs font-black border border-zinc-800 px-2 py-0.5 rounded">{movieData.contentType}</span>
                                {hasPurchased && (
                                    <a href={`https://drive.google.com/uc?export=download&id=${activeVideoId}`} className="ml-auto flex items-center gap-2 bg-emerald-600 hover:bg-emerald-800 hover:text-black text-white px-5 py-2 rounded-full font-bold text-[10px] transition-all">
                                        <Download size={14} /> DOWNLOAD
                                    </a>
                                )}
                            </div>

                            <div className="mt-6 bg-zinc-900/30 p-5 rounded-2xl border border-zinc-800/50">
                                <p className="text-zinc-400 text-sm leading-relaxed font-medium">{movieData.synopsis}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Dynamic Sidebar (Episodes or Related Movies) */}
                    <div className="w-full lg:w-[400px] p-4 lg:pr-6 space-y-6">
                        
                        <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden">
                            <div className="p-4 border-b border-zinc-800 bg-zinc-900/80 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ListVideo size={16} className="text-emerald-500" />
                                    <h3 className="font-black uppercase tracking-widest text-[10px]">
                                        {isSeries ? "Playlists / Episodes" : "Up Next / Related"}
                                    </h3>
                                </div>
                            </div>

                            <div className="max-h-[600px] lg:max-h-[800px] overflow-y-auto custom-scrollbar">
                                {isSeries ? (
                                    /* Series Mode: Episode List */
                                    movieData?.episodeLinks.map((link: string, index: number) => {
                                        const epId = getDriveId(link);
                                        const isActive = activeVideoId === epId;
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => setActiveVideoId(epId)}
                                                className={`w-full flex items-center gap-4 p-4 transition-all border-b border-zinc-800/30 hover:bg-white/5 ${isActive ? 'bg-emerald-500/10 border-l-4 border-l-emerald-500' : ''}`}
                                            >
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-black text-xs ${isActive ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-zinc-800 text-zinc-500'}`}>
                                                    {index + 1}
                                                </div>
                                                <div className="text-left">
                                                    <p className={`text-[11px] font-black uppercase ${isActive ? 'text-emerald-500' : 'text-zinc-300'}`}>Episode {index + 1}</p>
                                                    <p className="text-[9px] text-zinc-500 uppercase mt-1">Full HD Stream</p>
                                                </div>
                                                {isActive && <Play size={12} className="ml-auto text-emerald-500 fill-current animate-pulse" />}
                                            </button>
                                        );
                                    })
                                ) : (
                                    /* Movie Mode: Related Movies List */
                                    relatedMovies?.map((movie: any) => (
                                        <Link
                                            key={movie.id}
                                            href={`/movies/details/${movie.customid}`}
                                            className="flex gap-3 p-3 hover:bg-white/5 transition-all border-b border-zinc-800/30 group"
                                        >
                                            <div className="relative w-32 aspect-video rounded-lg overflow-hidden shrink-0 bg-zinc-800">
                                                <Image 
                                                    src={movie.backdropUrl || movie.posterUrl} 
                                                    alt={movie.title} 
                                                    fill 
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h4 className="text-[11px] font-black uppercase line-clamp-2 leading-tight group-hover:text-emerald-500 transition-colors">
                                                    {movie.title}
                                                </h4>
                                                <div className="flex items-center gap-2 mt-1.5">
                                                    <span className="text-[9px] text-zinc-500 font-bold uppercase">{movie.releaseYear}</span>
                                                    <div className="flex items-center gap-0.5 text-yellow-500 text-[9px] font-bold">
                                                        <Star size={10} fill="currentColor" /> {movie.ratingAverage}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <SidebarInfoItem icon={<User size={14} />} label="Director" value={movieData.director} />
                            <SidebarInfoItem icon={<Calendar size={14} />} label="Release" value={movieData.releaseYear} />
                        </div>
                    </div>

                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #10b981; }
            `}</style>
        </div>
    );
}

function SidebarInfoItem({ icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="bg-zinc-900/40 border border-zinc-800/60 p-4 rounded-xl flex items-center gap-4 hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500">
                {icon}
            </div>
            <div>
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{label}</p>
                <p className="text-xs font-bold text-zinc-200 uppercase">{value}</p>
            </div>
        </div>
    );
}