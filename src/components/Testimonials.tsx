"use client"
import React from 'react';
import { Star, Quote, ShieldCheck, Zap, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const testimonials = [
    {
        name: "Alex Rivera",
        role: "Full-stack Developer",
        content: "The streaming quality and the UI responsiveness are unmatched. It feels like using a high-end terminal but for entertainment.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=alex"
    },
    {
        name: "Sarah Chen",
        role: "UI/UX Designer",
        content: "The dark mode implementation and the emerald accent colors are a masterclass in modern design systems.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
        name: "Jordan Smith",
        role: "System Architect",
        content: "Robust API handling and lightning-fast search indexing. This is exactly how a modern SaaS should behave.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=jordan"
    },
    {
        name: "Maria Garcia",
        role: "Content Creator",
        content: "Reliable, fast, and secure. The support team actually knows their tech. Highly recommended for power users.",
        rating: 4,
        avatar: "https://i.pravatar.cc/150?u=maria"
    }
];

export default function TestimonialsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 p-6 md:p-12 font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <header className="mb-20 text-center relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6">
                        <Users size={12} /> Trusted by the Tech Community
                    </div>
                    <h1 className="lg:text-6xl md:text-5xl text-4xl font-black tracking-tighter uppercase leading-none mb-6">
                        User <span className="text-emerald-500 text-stroke">Feedback</span>
                    </h1>
                    <p className="mx-auto text-zinc-500 dark:text-zinc-400 text-sm md:text-lg font-medium max-w-2xl leading-relaxed">
                        Don't just take our word for it. Here is what the global developer community has to say about the Node system experience.
                    </p>
                </header>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className={`group relative p-8 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 rounded-[2.5rem] hover:border-emerald-500/30 transition-all duration-500 ${index === 0 ? "lg:col-span-2 lg:row-span-1" : ""
                                }`}
                        >
                            <Quote className="absolute top-6 right-8 text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors" size={40} />

                            <div className="flex gap-1 mb-6">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} size={14} className="fill-emerald-500 text-emerald-500" />
                                ))}
                            </div>

                            <p className="text-zinc-700 dark:text-zinc-300 font-bold text-lg leading-relaxed mb-8 italic">
                                "{item.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="relative size-12 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 group-hover:scale-110 transition-transform">
                                    <Image
                                        src={item.avatar}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
                                        {item.name} <ShieldCheck size={14} className="text-emerald-500" />
                                    </h4>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                        {item.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Stats Card */}
                    <div className="bg-emerald-600 rounded-[2.5rem] p-10 text-white flex flex-col justify-center items-center text-center space-y-4 shadow-xl shadow-emerald-900/20">
                        <Zap size={48} className="animate-pulse" />
                        <h3 className="text-4xl font-black tracking-tighter uppercase leading-tight">99%</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80">System Uptime & Satisfaction</p>
                        <Link href='/subscriptions'>
                            <button className="mt-4 px-6 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
                                Join the Hub
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}