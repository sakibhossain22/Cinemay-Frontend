/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserProfile } from '@/actions/user.action';
import React from 'react';
import Link from 'next/link';
import { 
  Mail, Phone, Calendar, CheckCircle2, 
  Settings, Crown, Shield, ArrowRight,
  Fingerprint, MapPin
} from 'lucide-react';
import Image from 'next/image';

async function AdminProfile() {
    const response = await getUserProfile();
    const profile = response?.data;

    if (!profile) return <div className="h-screen flex items-center justify-center text-zinc-500">Loading profile...</div>;

    const isPremium = profile.isPremium;

    return (
        <div className="p-4 md:p-10 bg-[#0A0A0A] min-h-screen text-zinc-100 font-sans">
            <div className="max-w-5xl mx-auto">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className={`w-24 h-24 rounded-full p-[2px] ${isPremium ? 'bg-gradient-to-tr from-yellow-500 to-amber-200' : 'bg-zinc-800'}`}>
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border-4 border-black">
                                    {profile.image ? (
                                        <Image src={profile.image} alt={profile.name} className="w-full h-full object-cover" width={96} height={96} />
                                    ) : (
                                        <span className="text-3xl font-bold text-zinc-700">{profile.name[0]}</span>
                                    )}
                                </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1">
                                {isPremium ? (
                                    <div className="bg-amber-500 p-1.5 rounded-full border-2 border-black shadow-lg" title="Premium User">
                                        <Crown size={14} className="text-black" />
                                    </div>
                                ) : (
                                    <div className="bg-zinc-700 p-1.5 rounded-full border-2 border-black shadow-lg" title="Free User">
                                        <Shield size={14} className="text-zinc-300" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight mb-1">{profile.name}</h1>
                            <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
                                <CheckCircle2 size={14} className="text-blue-500" />
                                <span>Verified {profile.role}</span>
                                <span className="mx-1">•</span>
                                <span>ID: {profile.id.slice(0, 8)}</span>
                            </div>
                        </div>
                    </div>

                    <Link 
                        href="/dashboard/admin/admin-profile/update" 
                        className="flex items-center gap-2 px-5 py-2.5 bg-zinc-100 text-black rounded-full text-sm font-bold hover:bg-white transition-all active:scale-95"
                    >
                        <Settings size={16} />
                        Edit Profile
                    </Link>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left Column: Essential Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-8">
                            <h3 className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em] mb-8">Account Credentials</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8">
                                <ProfileItem icon={<Mail className="text-zinc-500" />} label="Email Address" value={profile.email} />
                                <ProfileItem icon={<Phone className="text-zinc-500" />} label="Phone Number" value={profile.phone || "Not provided"} />
                                <ProfileItem icon={<Calendar className="text-zinc-500" />} label="Member Since" value={new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} />
                                <ProfileItem  icon={<Fingerprint className="text-green-500" />} label="Account Status" value={profile.status} />
                            </div>
                        </div>

                        {/* Banner for Non-Premium Users */}
                        {!isPremium && (
                            <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-3xl p-6 flex justify-between items-center group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-amber-500/10 rounded-2xl">
                                        <Crown className="text-amber-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Upgrade to Premium</h4>
                                        <p className="text-xs text-zinc-500">Get 8K resolution and unlimited downloads.</p>
                                    </div>
                                </div>
                                <ArrowRight className="text-zinc-600 group-hover:translate-x-1 transition-transform" />
                            </div>
                        )}
                    </div>

                    {/* Right Column: Mini Stats/Security */}
                    <div className="space-y-6">
                        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-8">
                            <h3 className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em] mb-6">Security</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-zinc-800/50">
                                    <span className="text-sm text-zinc-400">Two-Factor Auth</span>
                                    <span className="text-[10px] font-bold px-2 py-1 bg-zinc-800 text-zinc-500 rounded-md">OFF</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-zinc-800/50">
                                    <span className="text-sm text-zinc-400">Email Verified</span>
                                    {profile.emailVerified ? <CheckCircle2 size={18} className="text-emerald-500" /> : <span className="text-rose-500 text-[10px] font-bold">NO</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function ProfileItem({ icon, label, value }: any) {
    return (
        <div className="flex items-start gap-4">
            <div className="mt-1">{icon}</div>
            <div>
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-sm font-medium text-zinc-200">{value}</p>
            </div>
        </div>
    );
}

export default AdminProfile;