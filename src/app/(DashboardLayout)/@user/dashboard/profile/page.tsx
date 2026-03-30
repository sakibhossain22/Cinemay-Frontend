/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserProfile } from '@/actions/user.action';
import React from 'react';
import Link from 'next/link';
import { 
  Mail, Phone, Calendar, CheckCircle2, 
  Settings, Crown, Shield, ArrowRight,
  Fingerprint
} from 'lucide-react';
import Image from 'next/image';

async function UserProfile() {
    const response = await getUserProfile();
    const profile = response?.data;

    if (!profile) return <div className="h-screen flex items-center justify-center text-zinc-500 uppercase text-[10px] font-black tracking-[0.3em]">Initialising Session...</div>;

    const isPremium = profile.isPremium;

    return (
        <div className="p-4 md:p-10 bg-[#0A0A0A] min-h-screen text-zinc-100 font-sans">
            <div className="max-w-5xl mx-auto">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/5 pb-12">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full p-[2px] ${isPremium ? 'bg-gradient-to-tr from-yellow-500 to-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'bg-zinc-800'}`}>
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border-4 border-black">
                                    {profile.image ? (
                                        <Image src={profile.image} alt={profile.name} className="w-full h-full object-cover" width={96} height={96} />
                                    ) : (
                                        <span className="text-3xl bg-emerald-600 px-4 py-3 rounded-full font-black text-zinc-800">{profile.name[0]}</span>
                                    )}
                                </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1">
                                {isPremium ? (
                                    <div className="bg-amber-500 p-1.5 rounded-full border-2 border-black shadow-lg">
                                        <Crown size={14} className="text-black" />
                                    </div>
                                ) : (
                                    <div className="bg-zinc-700 p-1.5 rounded-full border-2 border-black shadow-lg">
                                        <Shield size={14} className="text-zinc-300" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase mb-1">
                                {profile.name}
                            </h1>
                            <div className="flex items-center gap-2 text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em]">
                                <CheckCircle2 size={12} className="text-emerald-500" />
                                <span>Verified {profile.role}</span>
                                <span className="text-zinc-800">•</span>
                                <span className="text-zinc-400 opacity-50">UID-{profile.id.slice(0, 8)}</span>
                            </div>
                        </div>
                    </div>

                    <Link 
                        href="/dashboard/profile/update" 
                        className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-lg shadow-white/5"
                    >
                        <Settings size={14} />
                        Edit Profile
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-zinc-900/20 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50" />
                            <h3 className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Identity & Access
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6">
                                <ProfileItem icon={<Mail className="text-emerald-500" size={18} />} label="System Email" value={profile.email} />
                                <ProfileItem icon={<Phone className="text-emerald-500" size={18} />} label="Contact Line" value={profile.phone || "UNSET"} />
                                <ProfileItem icon={<Calendar className="text-emerald-500" size={18} />} label="Activation Date" value={new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} />
                                <ProfileItem icon={<Fingerprint className="text-emerald-500" size={18} />} label="Current Status" value={profile.status} />
                            </div>
                        </div>

                        {!isPremium && (
                            <Link href="/subscriptions" className="block bg-gradient-to-r from-zinc-900 to-zinc-800 border border-white/5 rounded-3xl p-6 group transition-all hover:border-amber-500/40 relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Crown size={80} className="rotate-12 text-amber-500" />
                                </div>
                                <div className="flex justify-between items-center relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                                            <Crown className="text-amber-500" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-black uppercase tracking-tighter text-sm md:text-base">Ascend to Premium</h4>
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">Unlock 8K resolution & exclusive bandwidth.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-widest bg-amber-500/10 px-3 py-2 rounded-lg group-hover:bg-amber-500 group-hover:text-black transition-all">
                                        Upgrade <ArrowRight size={12} />
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-zinc-900/20 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md">
                            <h3 className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6 border-l-2 border-emerald-500/50 pl-4">Security Protocol</h3>
                            <div className="space-y-3">
                                <SecurityToggle label="2-Factor Auth" status="DISABLED" />
                                <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-all">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Node Verification</span>
                                    {profile.emailVerified ? (
                                        <CheckCircle2 size={16} className="text-emerald-500" />
                                    ) : (
                                        <span className="text-rose-500 text-[9px] font-black uppercase bg-rose-500/10 px-2 py-1 rounded tracking-tighter">Required</span>
                                    )}
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
        <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/[0.03] transition-all border border-transparent hover:border-white/5">
            <div className="mt-1 opacity-70 group-hover:opacity-100 transition-opacity">{icon}</div>
            <div className="min-w-0 flex-1">
                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1.5">{label}</p>
                <p className="text-xs md:text-sm font-bold text-zinc-200 truncate tracking-tight">{value}</p>
            </div>
        </div>
    );
}

function SecurityToggle({ label, status }: { label: string, status: string }) {
    return (
        <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 group hover:border-emerald-500/20 transition-all">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</span>
            <span className="text-[9px] font-black px-2.5 py-1 bg-zinc-800 text-zinc-600 rounded-md tracking-tighter group-hover:bg-zinc-700 group-hover:text-zinc-400 transition-all">{status}</span>
        </div>
    );
}

export default UserProfile;