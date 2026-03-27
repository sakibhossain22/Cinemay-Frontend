/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useEffect } from 'react';
import { getMovieDetails } from "@/services/movieService";
import { Download, ListVideo } from 'lucide-react';

// ড্রাইভ আইডি বের করার জন্য Regex ফাংশন
const getDriveId = (url: string) => {
    if (!url) return "";
    const regex = /\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : url;
};

export default function PlayMovie({ params }: { params: any }) {
    const [movieData, setMovieData] = useState<any>(null);
    const [activeVideoId, setActiveVideoId] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const resolvedParams = await params;
            const response = await getMovieDetails(resolvedParams.customid);
            const data = response;
            setMovieData(data);

            // ডিফল্টভাবে প্রথম ভিডিও সেট করা
            // যদি episodeLinks থাকে তবে প্রথম এপিসোড, না থাকলে downloadLink
            if (data?.episodeLinks && data.episodeLinks.length > 0) {
                setActiveVideoId(getDriveId(data.episodeLinks[0]));
            } else if (data?.downloadLink) {
                setActiveVideoId(getDriveId(data.downloadLink));
            }
        };
        fetchData();
    }, [params]);

    if (!movieData) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-emerald-500 animate-pulse font-bold tracking-widest">
            CINEMAY PLAYER LOADING...
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-10">
            <div className="max-w-7xl mx-auto">

                {/* Video Player Section */}
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/10 border border-zinc-800 bg-zinc-900 group">
                    <iframe
                        src={`https://drive.google.com/file/d/${activeVideoId}/preview`}
                        width="100%"
                        height="100%"
                        allow="autoplay; fullscreen"
                        className="absolute inset-0 border-0"
                    ></iframe>
                </div>

                {/* Episode Selection (যদি episodeLinks থাকে) */}
                {movieData.episodeLinks && movieData.episodeLinks.length > 0 && (
                    <div className="mt-8">
                        <div className="flex items-center gap-2 mb-4 text-zinc-400">
                            <ListVideo size={20} className="text-emerald-500" />
                            <h3 className="font-semibold uppercase tracking-widest text-sm text-zinc-200">Select Episode</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {movieData.episodeLinks.map((link: string, index: number) => {
                                const epId = getDriveId(link);
                                return (
                                    <button
                                        key={index}
                                        onClick={() => setActiveVideoId(epId)}
                                        className={`px-6 py-2.5 rounded-xl border transition-all text-sm font-bold tracking-wide ${
                                            activeVideoId === epId 
                                            ? 'bg-emerald-500 border-emerald-500 text-black shadow-lg shadow-emerald-500/20 scale-105' 
                                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-emerald-500 hover:text-emerald-400'
                                        }`}
                                    >
                                        EPISODE {index + 1}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Title & Download Section */}
                <div className="flex mt-10 flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-zinc-800 pb-8">
                    <h1 className="text-2xl md:text-3xl font-black border-l-4 border-emerald-500 pl-4 uppercase tracking-tighter">
                        Watching : <span className="text-emerald-500">{movieData.title}</span>
                    </h1>

                    <a
                        href={`https://drive.google.com/uc?export=download&id=${activeVideoId}`}
                        target="_blank"
                        className="flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-black px-8 py-3 rounded-full font-black transition-all transform hover:scale-105 shadow-xl active:scale-95"
                    >
                        <Download size={20} strokeWidth={3} />
                        DOWNLOAD
                    </a>
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

                            {/* Genres Tags */}
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
                                <DetailItem label="QUALITY" value="1080P" />
                            </div>
                        </div>

                        {/* Cast Preview */}
                        <div className="bg-zinc-900/60 p-6 rounded-3xl border border-zinc-800">
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4">Top Cast</h3>
                            <div className="flex flex-wrap gap-2">
                                {movieData.cast.slice(0, 6).map((person: string) => (
                                    <span key={person} className="text-[10px] font-bold bg-zinc-800 text-zinc-400 px-3 py-1.5 rounded-lg border border-zinc-700/50 uppercase">
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

// Helper Component for Details
function DetailItem({ label, value }: { label: string, value: any }) {
    return (
        <div className="flex justify-between items-center border-b border-zinc-800/30 pb-3">
            <span className="text-zinc-500 text-[10px] font-black tracking-widest">{label}</span>
            <span className="text-zinc-200 text-sm font-bold uppercase">{value}</span>
        </div>
    );
}