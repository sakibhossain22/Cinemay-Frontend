/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: "Navigation",
            links: [
                { name: "Home", href: "/" },
                { name: "Movies", href: "/movies" },
                { name: "Trending", href: "/trending" },
                { name: "Subscriptions", href: "/subscriptions" },
            ],
        },
        {
            title: "Legal",
            links: [
                { name: "Terms of Service", href: "/terms" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "DMCA", href: "/dmca" },
            ],
        },
        {
            title: "Support",
            links: [
                { name: "FAQ", href: "/faq" },
                { name: "Help Center", href: "/help" },
                { name: "Contact Us", href: "/contact" },
            ],
        },
    ];

    const socialLinks = [
        { icon: Facebook, href: "#", name: "Facebook" },
        { icon: Twitter, href: "#", name: "Twitter" },
        { icon: Instagram, href: "#", name: "Instagram" },
        { icon: Youtube, href: "#", name: "Youtube" },
    ];

    return (
        <footer className="w-full bg-zinc-950 border-t border-zinc-800/50 mt-16 relative overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-emerald-600/10 blur-[120px] rounded-full -z-10"></div>

            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    
                    {/* 1. Logo & About Section */}
                    <div className="lg:col-span-2 space-y-5">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="w-11 h-11 bg-emerald-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:rotate-6 transition-transform duration-300">
                                <span className="text-white font-black text-2xl italic">C</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
                                CinemaY
                            </span>
                        </Link>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                            Your ultimate destination for movies, series, and entertainment. Stream your favorites anytime, anywhere. Experience the magic of cinema.
                        </p>
                        
                        {/* Contact Info */}
                        <div className="space-y-3 pt-2 text-sm text-zinc-500">
                            <div className="flex items-center gap-3">
                                <MapPin className="size-4 text-emerald-500" />
                                <span>123 Movie Lane, Film City, CA 90210</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="size-4 text-emerald-500" />
                                <a href="mailto:support@cinemay.com" className="hover:text-emerald-400 transition-colors">support@cinemay.com</a>
                            </div>
                        </div>
                    </div>

                    {/* 2. Link Sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title} className="space-y-5">
                            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest relative inline-block">
                                {section.title}
                                <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-emerald-500 rounded-full"></span>
                            </h3>
                            <ul className="space-y-3.5">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link 
                                            href={link.href} 
                                            className="text-zinc-400 hover:text-emerald-400 text-sm transition-colors duration-200 flex items-center group"
                                        >
                                            <span className="w-0 group-hover:w-2.5 h-0.5 bg-emerald-500 rounded-full mr-0 group-hover:mr-2 transition-all duration-200"></span>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* 3. Divider */}
                <div className="border-t border-zinc-800/80 my-10 md:my-12"></div>

                {/* 4. Bottom Section: Copyright & Socials */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-500">
                    <p className="text-center md:text-left">
                        &copy; {currentYear} <span className="text-emerald-500 font-medium">CinemaY Inc.</span> All rights reserved. 
                        <span className="hidden md:inline"> | Crafted with ❤️ for movie lovers.</span>
                    </p>

                    {/* Social Media Icons */}
                    <div className="flex items-center gap-2">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;
                            return (
                                <Link 
                                    key={social.name} 
                                    href={social.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    title={social.name}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-500 hover:-translate-y-1 transition-all duration-300 shadow-md"
                                >
                                    <Icon className="size-5" />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;