/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import {
    PlusCircle, Search, Loader2, RefreshCcw,
    Globe, DollarSign, Film, User, Tag, List
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addMovie, getCategory, getTheMovieDB } from "@/actions/movieAction";

export default function AddMovies() {
    const router = useRouter();
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allCategories, setAllCategories] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        tmdb_id: "",
        title: "",
        customid: "",
        type: "MOVIE", // MOVIE | SERIES
        synopsis: "",
        posterUrl: "",
        genre: "",
        releaseYear: new Date().getFullYear(),
        director: "",
        cast: "",
        streamingLink: "",
        downloadLink: "",
        episodeLinks: "", // UI-তে কমা দিয়ে ইনপুট নিবে
        contentType: "FREE", // FREE | PREMIUM
        buyPrice: 0,
        rentPrice: 0,
        rentDuration: 48,
        ratingAverage: 0,
        category: [] as string[], // এখানে ক্যাটাগরি নামগুলো থাকবে
    });

    // ১. মাউন্ট হওয়ার সময় সকল ক্যাটাগরি লোড করা
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await getCategory();
                if (res.success) {
                    setAllCategories(res.data);
                }
            } catch (error) {
                console.error("Category fetch error:", error);
            }
        };
        loadCategories();
    }, []);

    // ২. Access Type 'FREE' হলে প্রাইস রিসেট করা
    useEffect(() => {
        if (formData.contentType === "FREE") {
            setFormData(prev => ({ ...prev, buyPrice: 0, rentPrice: 0 }));
        }
    }, [formData.contentType]);

    // ৩. ক্যাটাগরি টগল করার লজিক
    const toggleCategory = (catName: string) => {
        setFormData(prev => {
            const isSelected = prev.category.includes(catName);
            const updated = isSelected
                ? prev.category.filter(c => c !== catName)
                : [...prev.category, catName];
            return { ...prev, category: updated };
        });
    };

    const fetchTmdbData = async () => {
        if (!formData.tmdb_id) return toast.error("Enter TMDB ID first!");
        setFetching(true);
        try {
            const result = await getTheMovieDB(Number(formData.tmdb_id));
            if (result.success && result.data) {
                const movie = result.data;
                setFormData((prev) => ({
                    ...prev,
                    title: movie.title || "",
                    synopsis: movie.synopsis || "",
                    posterUrl: movie.posterUrl || "",
                    releaseYear: movie.releaseYear || new Date().getFullYear(),
                    customid: movie.customid || "",
                    director: movie.director || "",
                    ratingAverage: movie.ratingAverage || 0,
                    genre: Array.isArray(movie.genre) ? movie.genre.join(", ") : "",
                    cast: Array.isArray(movie.cast) ? movie.cast.join(", ") : "",
                }));
                toast.success("Movie details fetched!");
            } else {
                toast.error("Movie not found in TMDB");
            }
        } catch (error) {
            toast.error("Failed to fetch data");
        } finally {
            setFetching(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.category.length === 0) {
            return toast.error("Please select at least one category!");
        }

        setLoading(true);

        // ৪. ডাটা ফরম্যাট করা (String to Array)
        const finalData = {
            ...formData,
            genre: formData.genre.split(",").map(g => g.trim()).filter(Boolean),
            cast: formData.cast.split(",").map(c => c.trim()).filter(Boolean),
            episodeLinks: formData.episodeLinks.split(",").map(l => l.trim()).filter(Boolean),
        };

        try {
            const response = await addMovie(finalData);
            console.log(response.data)
            if (!response.success) {
                toast.error(response.error || "Failed to save");
                return;
            }
            toast.success(`${formData.type} published successfully!`);
            router.push("/dashboard/admin/manage-movies");
            setTimeout(() => router.refresh(), 500);
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const labelStyle = "block text-[10px] uppercase tracking-widest font-black text-zinc-500 mb-2 ml-1";
    const inputStyle = "w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700 text-sm disabled:opacity-20 disabled:cursor-not-allowed";

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter italic uppercase">Add <span className="text-emerald-500">Media</span></h1>
                        <p className="text-zinc-500 font-bold mt-2 uppercase text-xs tracking-widest">Cinema Management System</p>
                    </div>
                    <button
                        form="movie-form"
                        disabled={loading}
                        className="group relative bg-emerald-600 hover:bg-emerald-500 px-10 py-4 rounded-2xl font-black transition-all flex items-center gap-3 shadow-2xl shadow-emerald-900/20 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <PlusCircle className="group-hover:rotate-90 transition-transform" />}
                        PUBLISH NOW
                    </button>
                </div>

                {/* TMDB Search */}
                <div className="bg-zinc-900/40 border-2 border-dashed border-white/10 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-end gap-6 hover:border-emerald-500/30 transition-colors">
                    <div className="flex-1 w-full space-y-2">
                        <label className={labelStyle}>Import from TMDB (ID)</label>
                        <div className="relative">
                            <Search className="absolute left-4 top-3.5 text-zinc-600" size={18} />
                            <input
                                className={`${inputStyle} pl-12 bg-black/40 h-14 text-lg`}
                                placeholder="e.g. 76600"
                                value={formData.tmdb_id}
                                onChange={(e) => setFormData({ ...formData, tmdb_id: e.target.value })}
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={fetchTmdbData}
                        disabled={fetching}
                        className="bg-white text-black px-10 h-14 rounded-2xl font-black flex items-center gap-2 hover:bg-emerald-400 transition-all disabled:opacity-50"
                    >
                        {fetching ? <RefreshCcw className="animate-spin" /> : <RefreshCcw />}
                        AUTO FILL
                    </button>
                </div>

                <form id="movie-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8">

                    {/* Left Column */}
                    <div className="md:col-span-8 space-y-8">

                        {/* Essential Details */}
                        <div className="bg-zinc-900/20 border border-white/5 p-8 rounded-[2.5rem] space-y-6">
                            <h3 className="flex items-center gap-2 font-bold text-zinc-400 uppercase text-xs tracking-widest"><Film size={16} /> Essential Details</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2 md:col-span-1">
                                    <label className={labelStyle}>Content Type</label>
                                    <select className={inputStyle} value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                                        <option value="MOVIE">MOVIE</option>
                                        <option value="SERIES">SERIES</option>
                                    </select>
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className={labelStyle}>Title</label>
                                    <input className={inputStyle} value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className={labelStyle}>Custom Slug / ID</label>
                                    <input className={inputStyle} value={formData.customid} onChange={(e) => setFormData({ ...formData, customid: e.target.value })} />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className={labelStyle}>Release Year</label>
                                    <input type="number" className={inputStyle} value={formData.releaseYear} onChange={(e) => setFormData({ ...formData, releaseYear: Number(e.target.value) })} />
                                </div>
                                <div className="col-span-2">
                                    <label className={labelStyle}>Synopsis</label>
                                    <textarea rows={4} className={`${inputStyle} resize-none`} value={formData.synopsis} onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })} />
                                </div>
                            </div>
                        </div>

                        {/* Category Selection (Multi-select) */}
                        <div className="bg-zinc-900/20 border border-white/5 p-8 rounded-[2.5rem] space-y-6">
                            <h3 className="flex items-center gap-2 font-bold text-zinc-400 uppercase text-xs tracking-widest"><Tag size={16} /> Select Categories</h3>
                            <div className="flex flex-wrap gap-3">
                                {allCategories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => toggleCategory(cat.name)}
                                        className={`px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all border ${formData.category.includes(cat.name)
                                                ? "bg-emerald-500 border-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                                                : "bg-zinc-900 border-white/5 text-zinc-500 hover:border-white/20"
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Media Links */}
                        <div className="bg-zinc-900/20 border border-white/5 p-8 rounded-[2.5rem] space-y-6">
                            <h3 className="flex items-center gap-2 font-bold text-zinc-400 uppercase text-xs tracking-widest"><Globe size={16} /> Media & Links</h3>
                            <div className="space-y-4">
                                <label className={labelStyle}>Poster URL</label>
                                <input className={inputStyle} value={formData.posterUrl} onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })} />

                                <div className="grid grid-cols-2 gap-6 pt-2">
                                    <div>
                                        <label className={labelStyle}>Streaming Link</label>
                                        <input className={inputStyle} value={formData.streamingLink} onChange={(e) => setFormData({ ...formData, streamingLink: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className={labelStyle}>Download Link</label>
                                        <input className={inputStyle} value={formData.downloadLink} onChange={(e) => setFormData({ ...formData, downloadLink: e.target.value })} />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <label className={labelStyle}>Episode Links (Comma separated for Series)</label>
                                    <textarea
                                        rows={3}
                                        className={`${inputStyle} resize-none font-mono text-[11px]`}
                                        placeholder="url1, url2, url3..."
                                        value={formData.episodeLinks}
                                        onChange={(e) => setFormData({ ...formData, episodeLinks: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="md:col-span-4 space-y-8">
                        <div className="bg-zinc-900/20 border border-white/5 p-8 rounded-[2.5rem] space-y-6">
                            <h3 className="flex items-center gap-2 font-bold text-zinc-400 uppercase text-xs tracking-widest"><User size={16} /> Cast & Crew</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className={labelStyle}>Genres (Display only)</label>
                                    <input className={inputStyle} placeholder="Action, Thriller" value={formData.genre} onChange={(e) => setFormData({ ...formData, genre: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Director</label>
                                    <input className={inputStyle} value={formData.director} onChange={(e) => setFormData({ ...formData, director: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Main Cast</label>
                                    <textarea rows={4} className={`${inputStyle} resize-none`} placeholder="Actor Names" value={formData.cast} onChange={(e) => setFormData({ ...formData, cast: e.target.value })} />
                                </div>
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <div className={`bg-zinc-900/20 border p-8 rounded-[2.5rem] space-y-6 transition-all ${formData.contentType === "FREE" ? "border-white/5" : "border-emerald-500/20 shadow-2xl shadow-emerald-500/5"}`}>
                            <h3 className="flex items-center gap-2 font-bold text-emerald-500 uppercase text-xs tracking-widest"><DollarSign size={16} /> Pricing</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className={labelStyle}>Access Type</label>
                                    <select className={inputStyle} value={formData.contentType} onChange={(e) => setFormData({ ...formData, contentType: e.target.value })}>
                                        <option value="PREMIUM">PREMIUM</option>
                                        <option value="FREE">FREE</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelStyle}>Buy Price ($)</label>
                                    <input
                                        type="number"
                                        className={inputStyle}
                                        disabled={formData.contentType === "FREE"}
                                        value={formData.buyPrice}
                                        onChange={(e) => setFormData({ ...formData, buyPrice: Number(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className={labelStyle}>Rent Price ($)</label>
                                    <input
                                        type="number"
                                        className={inputStyle}
                                        disabled={formData.contentType === "FREE"}
                                        value={formData.rentPrice}
                                        onChange={(e) => setFormData({ ...formData, rentPrice: Number(e.target.value) })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}