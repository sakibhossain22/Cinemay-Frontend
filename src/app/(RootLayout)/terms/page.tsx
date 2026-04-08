"use client"
import React, { useState } from 'react';
import { ShieldCheck, FileText, Lock, Globe, ChevronRight, Scale } from 'lucide-react';

export default function PrivacyTermsPage() {
    const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

    return (
        <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 p-6 md:p-12 font-sans transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Legal <span className="text-emerald-500 text-stroke">Protocols</span></h1>
                    <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.4em]">Last Updated: April 2026</p>
                </div>

                {/* Tab Switcher */}
                <div className="flex justify-center gap-4 mb-12">
                    <button 
                        onClick={() => setActiveTab('privacy')}
                        className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'privacy' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-400'}`}
                    >
                        Privacy Policy
                    </button>
                    <button 
                        onClick={() => setActiveTab('terms')}
                        className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'terms' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-400'}`}
                    >
                        Terms of Service
                    </button>
                </div>

                {/* Content Area */}
                <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-sm">
                    {activeTab === 'privacy' ? (
                        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Section 
                                icon={<Lock className="text-emerald-500" size={24} />}
                                title="Data Collection"
                                content="আমরা আপনার নাম, ফোন নম্বর এবং ইমেইল সংগ্রহ করি যখন আপনি প্রোফাইল তৈরি করেন। এছাড়া আমাদের সার্ভার আপনার আইপি অ্যাড্রেস এবং ব্রাউজিং ডেটা অটোমেটিক লগ করে সিকিউরিটি নিশ্চিত করার জন্য।"
                            />
                            <Section 
                                icon={<ShieldCheck className="text-emerald-500" size={24} />}
                                title="Security Protocol"
                                content="আপনার ডেটা এনক্রিপ্টেড অবস্থায় আমাদের ডেটাবেসে সংরক্ষিত থাকে। আমরা থার্ড-পার্টি পেমেন্ট গেটওয়ে ব্যবহার করি যাতে আপনার কার্ড বা লেনদেনের তথ্য আমাদের কাছে সেভ না হয়।"
                            />
                            <Section 
                                icon={<Globe className="text-emerald-500" size={24} />}
                                title="Third-Party Sharing"
                                content="আপনার ব্যক্তিগত তথ্য আমরা কোনো থার্ড-পার্টি মার্কেটিং এজেন্সির কাছে বিক্রি করি না। শুধুমাত্র সার্ভিস পরিচালনার প্রয়োজনে প্রয়োজনীয় অংশ শেয়ার করা হয়।"
                            />
                        </div>
                    ) : (
                        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Section 
                                icon={<Scale className="text-blue-500" size={24} />}
                                title="Usage Rules"
                                content="আমাদের সার্ভিস ব্যবহার করে কোনো প্রকার ইললিগাল কন্টেন্ট ডিস্ট্রিবিউশন বা রিভার্স ইঞ্জিনিয়ারিং করা কঠোরভাবে নিষিদ্ধ। আইন লঙ্ঘনে অ্যাকাউন্ট পারমানেন্টলি ব্যান করা হবে।"
                            />
                            <Section 
                                icon={<FileText className="text-blue-500" size={24} />}
                                title="Refund Policy"
                                content="সফলভাবে ট্রানজেকশন হয়ে গেলে সাধারণত রিফান্ড দেওয়া হয় না। তবে টেকনিক্যাল ইস্যুর কারণে পেমেন্ট ফেইল হলে ২৪-৪৮ ঘণ্টার মধ্যে সেটেলমেন্ট করা হয়।"
                            />
                            <Section 
                                icon={<ChevronRight className="text-blue-500" size={24} />}
                                title="Account Responsibility"
                                content="আপনার অ্যাকাউন্টের পাসওয়ার্ড এবং অ্যাক্সেস টোকেন সুরক্ষিত রাখার দায়িত্ব আপনার। যেকোনো সন্দেহজনক অ্যাক্টিভিটি আমাদের সাপোর্ট টিমে রিপোর্ট করুন।"
                            />
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                <div className="mt-12 text-center">
                    <p className="text-xs text-zinc-400 font-medium italic">
                        By using this platform, you automatically agree to our data processing guidelines.
                    </p>
                </div>
            </div>
        </div>
    );
}

function Section({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) {
    return (
        <div className="group space-y-4">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-black rounded-2xl border border-zinc-200 dark:border-white/5 shadow-sm group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter">{title}</h3>
            </div>
            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium pl-2 md:pl-16 border-l-2 border-zinc-200 dark:border-zinc-800 ml-7">
                {content}
            </p>
        </div>
    );
}