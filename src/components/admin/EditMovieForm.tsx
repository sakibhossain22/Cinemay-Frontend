/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Loader2, Globe, DollarSign, PlayCircle } from "lucide-react";
import { toast } from "sonner";
import { updateMovie } from "@/actions/adminAction";

export default function EditMovieForm({ initialData }: { initialData: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        type: initialData?.type || "MOVIE",
        tmdb_id: initialData?.tmdb_id || "",
        synopsis: initialData?.synopsis || "",
        streamingLink: initialData?.streamingLink || "",
        downloadLink: initialData?.downloadLink || "",
        posterUrl: initialData?.posterUrl || "",
        contentType: initialData?.contentType || "PREMIUM",
        buyPrice: initialData?.buyPrice || 0,
        rentPrice: initialData?.rentPrice || 0,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {

            const body = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                body.append(key, value.toString());
            });
            const res = await updateMovie(initialData.id, body);
            if (!res.success) {
                toast.error(res.message || "Failed to update movie");
                return;
            }
            toast.success("Movie updated successfully!");
            if (res.success) {
                router.push("/dashboard/admin/manage-movies");
                
                setTimeout(() => {
                    router.refresh();
                }, 300)
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = "w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-600";
    const labelStyle = "block text-[11px] uppercase tracking-widest font-black text-zinc-500 mb-2 ml-1";

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
            {/* Header Actions */}
            <div className="flex justify-between items-center mb-10">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-bold"
                >
                    <ArrowLeft size={20} /> Back
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-2xl font-black transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    UPDATE MOVIE
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-6 bg-zinc-900/30 p-6 rounded-3xl border border-white/5">
                    <h3 className="text-emerald-500 font-black text-xs uppercase tracking-[0.2em] mb-4">Identity & Visuals</h3>

                    <div>
                        <label className={labelStyle}>Movie Title</label>
                        <input
                            className={inputStyle}
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. John Wick 4"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelStyle}>TMDB ID</label>
                            <input className={inputStyle} value={formData.tmdb_id} onChange={(e) => setFormData({ ...formData, tmdb_id: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelStyle}>Content Type</label>
                            <select className={inputStyle} value={formData.contentType} onChange={(e) => setFormData({ ...formData, contentType: e.target.value })}>
                                <option value="FREE">FREE</option>
                                <option value="PREMIUM">PREMIUM</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className={labelStyle}>Poster URL</label>
                        <div className="relative">
                            <Globe className="absolute left-4 top-3.5 text-zinc-600" size={18} />
                            <input className={`${inputStyle} pl-12`} value={formData.posterUrl} onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })} />
                        </div>
                    </div>
                </div>

                {/* Pricing & Links */}
                <div className="space-y-6 bg-zinc-900/30 p-6 rounded-3xl border border-white/5">
                    <h3 className="text-blue-500 font-black text-xs uppercase tracking-[0.2em] mb-4">Monetization & Access</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelStyle}>Buy Price ($)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-3.5 text-zinc-600" size={18} />
                                <input type="number" className={`${inputStyle} pl-12`} value={formData.buyPrice} onChange={(e) => setFormData({ ...formData, buyPrice: Number(e.target.value) })} />
                            </div>
                        </div>
                        <div>
                            <label className={labelStyle}>Rent Price ($)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-3.5 text-zinc-600" size={18} />
                                <input type="number" className={`${inputStyle} pl-12`} value={formData.rentPrice} onChange={(e) => setFormData({ ...formData, rentPrice: Number(e.target.value) })} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className={labelStyle}>Streaming Link</label>
                        <div className="relative">
                            <PlayCircle className="absolute left-4 top-3.5 text-zinc-600" size={18} />
                            <input className={`${inputStyle} pl-12`} value={formData.streamingLink} onChange={(e) => setFormData({ ...formData, streamingLink: e.target.value })} />
                        </div>
                    </div>

                    <div>
                        <label className={labelStyle}>Download Link</label>
                        <input className={inputStyle} value={formData.downloadLink} onChange={(e) => setFormData({ ...formData, downloadLink: e.target.value })} />
                    </div>
                </div>

                {/* Synopsis Full Width */}
                <div className="md:col-span-2 bg-zinc-900/30 p-6 rounded-3xl border border-white/5">
                    <label className={labelStyle}>Synopsis / Storyline</label>
                    <textarea
                        rows={4}
                        className={`${inputStyle} resize-none`}
                        value={formData.synopsis}
                        onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                    />
                </div>
            </div>
        </form>
    );
}