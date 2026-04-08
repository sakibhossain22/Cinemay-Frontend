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
                { name: "Privacy Policy", href: "/terms" },
            ],
        },
        {
            title: "Support",
            links: [
                { name: "FAQ", href: "/faq" },
                { name: "Help Center", href: "/contact-us" },
                { name: "Contact Us", href: "/contact-us" },
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
        <footer className="w-full bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800/50 mt-20 relative overflow-hidden transition-colors duration-500">
            {/* Background Glow Effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-emerald-600/5 dark:bg-emerald-600/10 blur-[120px] rounded-full -z-10"></div>

            <div className="container mx-auto px-6 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-12">
                    
                    {/* 1. Logo & About Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 bg-emerald-600 rounded-[1rem] flex items-center justify-center shadow-lg shadow-emerald-600/20 group-hover:scale-110 transition-transform duration-500">
                                <span className="text-white font-black text-2xl uppercase">C</span>
                            </div>
                            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-zinc-900 to-emerald-600 dark:from-white dark:to-emerald-400 bg-clip-text text-transparent uppercase">
                                CinemaY
                            </span>
                        </Link>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed max-w-sm">
                            Your ultimate destination for movies, series, and entertainment. Stream your favorites anytime, anywhere. Experience the magic of cinema in high definition.
                        </p>
                        
                        {/* Contact Info */}
                        <div className="space-y-4 pt-2">
                            <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
                                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                                    <MapPin className="size-4 text-emerald-600 dark:text-emerald-500" />
                                </div>
                                <span className="text-sm font-bold uppercase tracking-tight">Sherpur, Dhaka, Bangladesh</span>
                            </div>
                            <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
                                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                                    <Mail className="size-4 text-emerald-600 dark:text-emerald-500" />
                                </div>
                                <a href="mailto:support@cinemay.com" className="text-sm font-bold hover:text-emerald-600 transition-colors uppercase tracking-tight">support@cinemay.com</a>
                            </div>
                        </div>
                    </div>

                    {/* 2. Link Sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title} className="space-y-7">
                            <h3 className="text-xs font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-[0.2em] relative inline-block">
                                {section.title}
                                <span className="absolute -bottom-2 left-0 w-6 h-1 bg-emerald-500 rounded-full"></span>
                            </h3>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link 
                                            href={link.href} 
                                            className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center group"
                                        >
                                            <span className="w-0 group-hover:w-3 h-0.5 bg-emerald-500 rounded-full mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* 3. Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent my-12"></div>

                {/* 4. Bottom Section */}
                <div className="flex flex-col md:row items-center justify-between gap-8 md:gap-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 text-center md:text-left">
                        &copy; {currentYear} <span className="text-emerald-600 dark:text-emerald-500">CinemaY Inc.</span> All rights reserved.
                    </p>

                    {/* Social Media Icons */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;
                            return (
                                <Link 
                                    key={social.name} 
                                    href={social.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-white hover:bg-emerald-600 hover:border-emerald-500 hover:-translate-y-1 transition-all duration-500 shadow-sm"
                                >
                                    <Icon className="size-4" />
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