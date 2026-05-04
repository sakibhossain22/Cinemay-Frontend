/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useEffect } from 'react';
import { getMovieDetails, getMoviesByCategory } from "@/services/movieService";
import { PlayCircle, Info, Calendar, Star, Users, ArrowLeft, Film, AlertCircle, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import WatchTrailerSkeleton from './loading';

const getYoutubeId = (url: string) => {
    if (!url) return "";
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : url;
};

export default function WatchTrailer({ params }: { params: any }) {
    const [movieData, setMovieData] = useState<any>(null);
    const [trailerId, setTrailerId] = useState("");
    const [relatedMovies, setRelatedMovies] = useState<any[]>([]);
    const [isTimedOut, setIsTimedOut] = useState(false);

    useEffect(() => {
        // ১০ সেকেন্ডের টাইমার সেটআপ
        const timer = setTimeout(() => {
            if (!movieData) {
                setIsTimedOut(true);
            }
        }, 10000);

        const fetchData = async () => {
            try {
                const resolvedParams = await params;
                const response = await getMovieDetails(resolvedParams?.customid);
                
                if (response) {
                    setMovieData(response);
                    if (response?.streamingLink) {
                        setTrailerId(getYoutubeId(response?.streamingLink));
                    }

                    const categoryMovies = await getMoviesByCategory(response?.categories?.[0]?.name ?? "TRENDING");
                    const catMovies = categoryMovies.data;
                    setRelatedMovies(catMovies.filter((m: any) => m?.id !== response?.id).slice(0, 5));
                }
            } catch (error) {
                console.error("Error fetching movie data:", error);
                setIsTimedOut(true);
            }
        };

        fetchData();

        return () => clearTimeout(timer); // Cleanup timer
    }, [params, movieData]);

    // ১. ডাটা লোড হচ্ছে (টাইম আউট হয়নি)
    if (!movieData && !isTimedOut) {
        return <WatchTrailerSkeleton />;
    }

    // ২. ১০ সেকেন্ড হয়ে গেছে কিন্তু ডাটা নেই (Error/Not Found State)
    if (isTimedOut && !movieData) {
        return <MovieNotFoundUI />;
    }

    // ৩. মেইন কন্টেন্ট রেন্ডার
    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-white transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto">
                
                <div className="p-4 lg:px-6">
                    <Link
                        href={`/movies/details/${movieData?.customid}`}
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-emerald-500 transition-colors font-bold text-xs uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} />
                        Back to details
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-6">

                    <div className="flex-1">
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-black group">
                            {trailerId ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&rel=0&modestbranding=1`}
                                    width="100%"
                                    height="100%"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    className="absolute inset-0 border-0"
                                    title="Movie Trailer"
                                ></iframe>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600 space-y-4">
                                    <PlayCircle size={64} strokeWidth={1} />
                                    <span className="uppercase font-black tracking-[0.3em] text-xs">Trailer Not Available</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 border-b border-zinc-200 dark:border-zinc-800/50 pb-6">
                            <div className="flex items-center gap-2 text-emerald-500 mb-3">
                                <span className="bg-emerald-500 text-white dark:text-black text-[10px] font-black px-2 py-0.5 rounded uppercase">Official</span>
                                <span className="text-[10px] font-black uppercase tracking-widest">Trailer</span>
                            </div>
                            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
                                {movieData?.title}
                            </h1>
                        </div>

                        <div className="mt-8 bg-zinc-100 dark:bg-zinc-900/30 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/50 backdrop-blur-sm">
                            <div className="flex items-center gap-2 mb-4 text-zinc-500 dark:text-zinc-400">
                                <span className="text-emerald-500"><Info size={18} /></span>
                                <h2 className="text-xs font-black uppercase tracking-[0.2em]">Synopsis</h2>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base font-medium">
                                {movieData?.synopsis}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-6">
                                {movieData?.genre?.map((g: string) => (
                                    <span key={g} className="bg-white dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 px-3 py-1 rounded-md text-[10px] font-bold border border-zinc-200 dark:border-zinc-700/50 uppercase">
                                        {g}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-col md:flex-row gap-6 '>
                        {relatedMovies?.length > 0 && (
                            <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center gap-2 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                    <Film size={14} className="text-emerald-500" />
                                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">More Like This</h3>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {relatedMovies?.map((movie: any) => (
                                        <Link
                                            key={movie?.id}
                                            href={`/movies/details/${movie?.customid}`}
                                            className="group flex gap-3 items-center"
                                        >
                                            <div className="w-16 h-20 bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0 border border-zinc-300 dark:border-zinc-700/50">
                                                <Image
                                                    width={400}
                                                    height={700}
                                                    src={movie?.posterUrl}
                                                    quality={70}
                                                    alt={movie?.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1 min-w-0">
                                                <span className="text-[11px] font-black text-zinc-700 dark:text-zinc-300 group-hover:text-emerald-500 transition-colors uppercase truncate">
                                                    {movie?.title}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <Star size={10} fill="currentColor" className="text-yellow-500" />
                                                    <span className="text-[10px] font-bold text-zinc-500">{movie?.ratingAverage}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="w-full lg:w-[350px] space-y-6 pb-10">
                            <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-3">Movie Info</h3>
                                <div className="space-y-5">
                                    <SidebarDetail label="Director" value={movieData?.director} icon={<Info size={12} />} />
                                    <SidebarDetail label="Release" value={movieData?.releaseYear} icon={<Calendar size={12} />} />
                                    <SidebarDetail label="IMDb Rating" value={`${movieData?.ratingAverage} / 10`} icon={<Star size={12} fill="currentColor" className="text-yellow-500" />} />
                                </div>
                            </div>

                            <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center gap-2 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                    <Users size={14} className="text-emerald-500" />
                                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Lead Cast</h3>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {movieData?.cast?.slice(0, 5).map((person: string) => (
                                        <div key={person} className="flex items-center gap-3 group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-emerald-500 transition-colors" />
                                            <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-emerald-500 dark:group-hover:text-zinc-200 transition-colors uppercase">
                                                {person}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

// সুন্দর "Movie Not Found" UI
function MovieNotFoundUI() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-6 p-10 rounded-[2.5rem] bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
                <div className="relative mx-auto w-20 h-20 flex items-center justify-center bg-red-50 dark:bg-red-500/10 rounded-full">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                    <div className="absolute inset-0 rounded-full border border-red-500/20 animate-ping" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-black uppercase tracking-tighter italic">Content Missing</h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                        The requested trailer could not be loaded. This might be due to a slow connection or a broken link.
                    </p>
                </div>
                <div className="flex flex-col gap-3 pt-4">
                    <button 
                        onClick={() => window.location.reload()}
                        className="flex items-center justify-center gap-2 w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:opacity-90 transition-all active:scale-95"
                    >
                        <RefreshCcw size={14} /> Retry Loading
                    </button>
                    <Link 
                        href="/movies"
                        className="w-full py-4 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-center"
                    >
                        Back to Library
                    </Link>
                </div>
            </div>
        </div>
    );
}

function SidebarDetail({ label, value, icon }: { label: string, value: any, icon: any }) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-zinc-500">
                {icon}
                <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
            </div>
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-200 uppercase pl-5">{value || "N/A"}</span>
        </div>
    );
}