/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useEffect } from 'react';
import { getMovieDetails } from "@/services/movieService";
import { PlayCircle } from 'lucide-react'; // ট্রেলারের জন্য আইকন

// ইউটিউব আইডি বের করার জন্য নতুন Regex
const getYoutubeId = (url: string) => {
    if (!url) return "";
    // handles: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : url;
};

export default function WatchTrailer({ params }: { params: any }) {
    const [movieData, setMovieData] = useState<any>(null);
    const [trailerId, setTrailerId] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const resolvedParams = await params;
            const response = await getMovieDetails(resolvedParams.customid);
            const data = response;
            setMovieData(data);

            if (data?.streamingLink) {
                setTrailerId(getYoutubeId(data.streamingLink));
            }
        };
        fetchData();
    }, [params]);

    if (!movieData) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-emerald-500 animate-pulse font-bold tracking-widest uppercase">
            Loading Trailer...
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-10">
            <div className="max-w-7xl mx-auto">

                {/* Video Player Section (YouTube Trailer) */}
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/10 border border-zinc-800 bg-zinc-900 group">
                    {trailerId ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&rel=0`}
                            width="100%"
                            height="100%"
                            allow="autoplay; fullscreen; picture-in-picture"
                            className="absolute inset-0 border-0"
                            title="Movie Trailer"
                        ></iframe>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-500 uppercase font-black tracking-widest">
                            No Trailer Available
                        </div>
                    )}
                </div>

                {/* Header Section */}
                <div className="mt-10 mb-8 border-b border-zinc-800 pb-8">
                    <div className="flex items-center gap-3 text-emerald-500 mb-2">
                        <PlayCircle size={24} />
                        <span className="text-sm font-black uppercase tracking-[0.3em]">Official Trailer</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                        {movieData.title}
                    </h1>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800/50 backdrop-blur-sm">
                            <h2 className="text-xl font-bold text-emerald-500 mb-4 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                                SYNOPSIS
                            </h2>
                            <p className="text-zinc-400 leading-relaxed text-sm md:text-base font-medium">
                                {movieData.synopsis}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-8">
                                {movieData.genre.map((g: string) => (
                                    <span key={g} className="bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-lg text-xs font-bold border border-emerald-500/20 uppercase">
                                        {g}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Metadata Sidebar */}
                    <div className="space-y-4">
                        <div className="bg-zinc-900/60 p-6 rounded-3xl border border-zinc-800">
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-6">Information</h3>
                            <div className="space-y-4">
                                <DetailItem label="DIRECTOR" value={movieData.director} />
                                <DetailItem label="YEAR" value={movieData.releaseYear} />
                                <DetailItem label="RATING" value={`⭐ ${movieData.ratingAverage}`} />
                            </div>
                        </div>

                        {/* Cast Preview */}
                        <div className="bg-zinc-900/60 p-6 rounded-3xl border border-zinc-800">
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4">Lead Cast</h3>
                            <div className="flex flex-wrap gap-2">
                                {movieData.cast.slice(0, 6).map((person: string) => (
                                    <span key={person} className="text-[10px] font-bold bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-700/50 uppercase">
                                        {person}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper Component
function DetailItem({ label, value }: { label: string, value: any }) {
    return (
        <div className="flex justify-between items-center border-b border-zinc-800/30 pb-3">
            <span className="text-zinc-500 text-[10px] font-black tracking-widest">{label}</span>
            <span className="text-zinc-200 text-sm font-bold uppercase">{value}</span>
        </div>
    );
}