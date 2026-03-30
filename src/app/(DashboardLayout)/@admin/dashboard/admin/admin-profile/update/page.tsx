/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ChevronLeft, Loader2, User, Phone, Image as ImageIcon, Pen, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { getUserProfile, updateUserProfile } from '@/actions/user.action';
import Image from 'next/image';

export default function ProfileUpdatePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        image: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getUserProfile();
                if (res?.data) {
                    const profile = res.data;
                    setFormData({
                        name: profile.name || '',
                        phone: profile.phone || '',
                        image: profile.image || ''
                    });
                }
            } catch (error) {
                toast.error("Failed to load profile data");
            } finally {
                setIsInitialLoading(false);
            }
        }
        fetchProfile();
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name) return toast.error("Name is required!");

        try {
            setLoading(true);
            const response = await updateUserProfile(formData);

            if (response?.success) {
                toast.success("Identity updated successfully");
                router.refresh();
                setTimeout(() => {
                    router.push('/dashboard/admin/admin-profile');
                }, 800);
            } else {
                toast.error(response?.message || "Something went wrong");
            }
        } catch (error: any) {
            toast.error("Critical error during update");
        } finally {
            setLoading(false);
        }
    };

    if (isInitialLoading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-emerald-500" size={32} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Syncing Node...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 p-6 md:p-12 flex flex-col items-center font-sans">
            <div className="w-full max-w-xl">
                
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-zinc-600 hover:text-emerald-500 mb-12 transition-all group text-[10px] font-black uppercase tracking-widest"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Return to Dashboard
                </button>

                <div className="relative mb-12 flex flex-col items-center md:items-start gap-6">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-3xl bg-zinc-900 border border-white/5 overflow-hidden flex items-center justify-center relative">
                            {formData.image ? (
                                <Image src={formData.image} alt="Preview" fill className="object-cover  opacity-60 group-hover:opacity-100 transition-opacity" />
                            ) : (
                                <User size={32} className="text-zinc-800" />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera size={20} className="text-emerald-500" />
                            </div>
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <Pen size={10} className="text-black" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase flex items-center gap-3">
                           Edit Profile
                        </h1>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mt-2">Update your public presence and contact details.</p>
                    </div>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 gap-5">
                        <CustomInput
                            icon={<User size={18} />}
                            label="Legal Name"
                            placeholder="Shakib Hossain"
                            value={formData.name}
                            onChange={(val: string) => setFormData({ ...formData, name: val })}
                        />
                        <CustomInput
                            icon={<Phone size={18} />}
                            label="Contact Line"
                            placeholder="019968xxxxx"
                            value={formData.phone}
                            onChange={(val: string) => setFormData({ ...formData, phone: val })}
                        />
                        <CustomInput
                            icon={<ImageIcon size={18} />}
                            label="Avatar Source URL"
                            placeholder="https://your-image-url.com"
                            value={formData.image}
                            onChange={(val: string) => setFormData({ ...formData, image: val })}
                        />
                    </div>

                    <div className="pt-8 flex flex-col md:flex-row justify-end gap-4 border-t border-white/5">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-8 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest hover:text-zinc-300 transition-colors order-2 md:order-1"
                        >
                            Abort Changes
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-10 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-emerald-500 transition-all disabled:opacity-50 active:scale-95 shadow-xl shadow-emerald-600/10 order-1 md:order-2"
                        >
                            {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                            {loading ? "Commiting..." : "Commit Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function CustomInput({ icon, label, placeholder, value, onChange }: any) {
    return (
        <div className="space-y-2 group">
            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 group-focus-within:text-emerald-500 transition-colors">
                {label}
            </label>
            <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-emerald-500 transition-colors">
                    {icon}
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-[#111111] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-xs font-bold focus:border-emerald-500/50 outline-none transition-all placeholder:text-zinc-800 text-zinc-200 tracking-tight"
                />
            </div>
        </div>
    );
}