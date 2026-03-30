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

async function AdminProfile() {
    const response = await getUserProfile();
    const profile = response?.data;

    if (!profile) return <div className="h-screen flex items-center justify-center text-zinc-500 uppercase text-xs font-black tracking-widest">Loading profile...</div>;

    const isPremium = profile.isPremium;

    return (
        <div className="p-4 md:p-10 bg-[#0A0A0A] min-h-screen text-zinc-100 font-sans">
            <div className="max-w-8xl mx-auto">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/5 pb-12">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full p-[2px] ${isPremium ? 'bg-gradient-to-tr from-yellow-500 to-amber-200' : 'bg-zinc-800'}`}>
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border-4 border-black">
                                    {profile.image ? (
                                        <Image src={profile.image} alt={profile.name} className="w-full h-full object-cover" width={96} height={96} />
                                    ) : (
                                        <span className="text-3xl font-bold bg-emerald-600 px-4 py-3 rounded-full">{profile.name[0]}</span>
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
                            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-1 ">
                                {profile.name}
                            </h1>
                            <div className="flex items-center gap-2 text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                                <CheckCircle2 size={12} className="text-emerald-500" />
                                <span>Verified {profile.role}</span>
                                <span className="text-zinc-800">•</span>
                                <span className="text-zinc-400">ID: {profile.id.slice(0, 8)}</span>
                            </div>
                        </div>
                    </div>

                    <Link 
                        href="/dashboard/admin/admin-profile/update" 
                        className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all active:scale-95"
                    >
                        <Settings size={14} />
                        Edit Profile
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-zinc-900/20 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
                            <h3 className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8 border-l-2 border-emerald-500 pl-4">Account Credentials</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
                                <ProfileItem icon={<Mail className="text-emerald-500" size={18} />} label="Email Address" value={profile.email} />
                                <ProfileItem icon={<Phone className="text-emerald-500" size={18} />} label="Phone Number" value={profile.phone || "Not provided"} />
                                <ProfileItem icon={<Calendar className="text-emerald-500" size={18} />} label="Member Since" value={new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} />
                                <ProfileItem icon={<Fingerprint className="text-emerald-500" size={18} />} label="Account Status" value={profile.status} />
                            </div>
                        </div>

                        {!isPremium && (
                            <Link href="/pricing" className="block bg-gradient-to-r from-zinc-900 to-zinc-800 border border-white/5 rounded-3xl p-6 group transition-all hover:border-amber-500/30">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-amber-500/10 rounded-2xl">
                                            <Crown className="text-amber-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-black uppercase tracking-tighter text-sm">Upgrade to Premium</h4>
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">Get 8K resolution and unlimited downloads.</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="text-zinc-600 group-hover:translate-x-1 transition-transform group-hover:text-amber-500" />
                                </div>
                            </Link>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-zinc-900/20 border border-white/5 rounded-3xl p-6 md:p-8">
                            <h3 className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6 border-l-2 border-emerald-500 pl-4">Security</h3>
                            <div className="space-y-3">
                                <SecurityToggle label="Two-Factor Auth" status="OFF" />
                                <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Email Verified</span>
                                    {profile.emailVerified ? (
                                        <CheckCircle2 size={16} className="text-emerald-500" />
                                    ) : (
                                        <span className="text-rose-500 text-[9px] font-black uppercase bg-rose-500/10 px-2 py-1 rounded">No</span>
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
        <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5">
            <div className="mt-1">{icon}</div>
            <div className="min-w-0 flex-1">
                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-xs md:text-sm font-bold text-zinc-200 truncate">{value}</p>
            </div>
        </div>
    );
}

function SecurityToggle({ label, status }: { label: string, status: string }) {
    return (
        <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 group hover:border-emerald-500/20 transition-all">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{label}</span>
            <span className="text-[9px] font-black px-2 py-1 bg-zinc-800 text-zinc-500 rounded-md tracking-tighter group-hover:bg-zinc-700 transition-colors">{status}</span>
        </div>
    );
}

export default AdminProfile;