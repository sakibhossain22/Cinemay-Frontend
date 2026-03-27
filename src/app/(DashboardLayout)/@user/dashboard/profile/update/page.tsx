/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ChevronLeft, Loader2, User, Phone, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { getUserProfile, updateUserProfile } from '@/actions/user.action';

export default function ProfileUpdatePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        image: ''
    });
    useEffect(() => {
        const fetchProfile = async () => {
            const res = await getUserProfile();
            if (res?.data) {
                const profile = res.data;
                setFormData({
                    name: profile.name || '',
                    phone: profile.phone || '',
                    image: profile.image || ''
                });
            } else {
                toast.error("Failed to load profile data");
            }
        }
        fetchProfile();

    }, []);


    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name) {
            return toast.error("Name is required!");
        }
        try {
            setLoading(true);
            const response = await updateUserProfile(formData);

            if (response?.success) {
                toast.success("Profile updated successfully!");
                router.refresh();
                setTimeout(() => {
                    router.push('/dashboard/profile');
                }, 1000);
            } else {
                toast.error(response?.message || "Something went wrong");
            }
        } catch (error: any) {
            console.error("Update Error:", error);
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    if (!formData || formData.name === '') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-zinc-100 p-6 flex flex-col items-center font-sans">
            <div className="w-full max-w-2xl">
                {/* Navigation */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-zinc-500 hover:text-white mb-10 transition-colors group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Profile
                </button>

                <div className="space-y-2 mb-10">
                    <h1 className="text-4xl font-black tracking-tight uppercase">Edit Profile</h1>
                    <p className="text-zinc-500">Update your public presence and contact details.</p>
                </div>

                <form onSubmit={handleUpdate} className="space-y-8">
                    <div className="grid grid-cols-1 gap-6">
                        <CustomInput
                            icon={<User size={18} />}
                            label="Full Name"
                            placeholder="Shakib Hossain"
                            value={formData.name}
                            onChange={(val: string) => setFormData({ ...formData, name: val })}
                        />
                        <CustomInput
                            icon={<Phone size={18} />}
                            label="Phone Number"
                            placeholder="019968xxxxx"
                            value={formData.phone}
                            onChange={(val: string) => setFormData({ ...formData, phone: val })}
                        />
                        <CustomInput
                            icon={<ImageIcon size={18} />}
                            label="Profile Image URL"
                            placeholder="https://your-image-url.com"
                            value={formData.image}
                            onChange={(val: string) => setFormData({ ...formData, image: val })}
                        />
                    </div>

                    <div className="pt-6 border-t border-zinc-900 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-2.5 text-sm font-bold text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-2.5 bg-blue-600 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-lg shadow-blue-600/20"
                        >
                            {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function CustomInput({ icon, label, placeholder, value, onChange }: any) {
    return (
        <div className="space-y-3">
            <label className="text-xs font-bold text-zinc-600 uppercase tracking-widest ml-1">{label}</label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors">
                    {icon}
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700 text-zinc-200"
                />
            </div>
        </div>
    );
}