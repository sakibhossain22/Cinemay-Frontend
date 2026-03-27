/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import { Save, User, Phone, Mail, Loader2, Edit3 } from 'lucide-react';
import { updateUserProfile } from '@/actions/user.action';
import { toast } from 'sonner';

export default function ProfileUpdateForm({ initialData }: any) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData.name,
        phone: initialData.phone || '',
        image: initialData.image || ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await updateUserProfile(formData);
        if (!res.success) {
            toast.error("Failed to update user profile");
        }
        toast.success("User Profile Updated Successfully");

        setTimeout(() => setLoading(false), 1500);
    };

    return (
        <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-3xl sticky top-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
                <Edit3 size={16} /> Update Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-zinc-600 ml-1">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-3 text-zinc-600" size={16} />
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-sm focus:border-blue-500 focus:outline-none transition-all"
                            placeholder="Your Name"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-zinc-600 ml-1">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-3 text-zinc-600" size={16} />
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-sm focus:border-blue-500 focus:outline-none transition-all"
                            placeholder="017xxxxxxxx"
                        />
                    </div>
                </div>

                <div className="space-y-2 opacity-50 cursor-not-allowed">
                    <label className="text-[10px] font-bold uppercase text-zinc-600 ml-1">Email (Read Only)</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-3 text-zinc-600" size={16} />
                        <input
                            type="email"
                            value={initialData.email}
                            disabled
                            className="w-full bg-black/20 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-sm outline-none"
                        />
                    </div>
                </div>

                <button
                    disabled={loading}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
}