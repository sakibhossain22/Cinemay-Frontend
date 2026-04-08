/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; 

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { User } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

export default function CastSlider({ casts }: { casts: any[] }) {
    if (!casts || casts.length === 0) return null;

    return (
        <section className="py-12">
            {/* Header Section */}
            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em]">
                    Top Cast <span className="text-emerald-500 ml-1">({casts.length})</span>
                </h2>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
            </div>

            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={2}
                navigation
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                breakpoints={{
                    480: { slidesPerView: 2.5 },
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                    1280: { slidesPerView: 6 },
                }}
                className="cast-swiper !pb-4"
            >
                {casts.slice(0, 18).map((member: any) => (
                    <SwiperSlide key={member.id}>
                        <div className="group relative bg-zinc-900/40 rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-500/30 transition-all duration-500 shadow-xl">
                            
                            {/* Profile Image with Overlay */}
                            <div className="relative aspect-[3/4] w-full bg-zinc-800 overflow-hidden">
                                {member.profile_path ? (
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                                        alt={member.name}
                                        fill
                                        sizes="(max-width: 768px) 33vw, 16vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-zinc-700 gap-2">
                                        <User size={32} strokeWidth={1} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">No Profile</span>
                                    </div>
                                )}
                                {/* Gradient Overlay on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Cast Info */}
                            <div className="p-4 text-center">
                                <h3 className="font-black text-[11px] md:text-xs text-zinc-200 truncate uppercase tracking-tighter group-hover:text-emerald-400 transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-[9px] md:text-[10px] text-zinc-500 mt-1 truncate font-bold uppercase tracking-wider">
                                    {member.character}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Swiper Custom Styling */}
            <style jsx global>{`
                .cast-swiper .swiper-button-next,
                .cast-swiper .swiper-button-prev {
                    width: 40px !important;
                    height: 40px !important;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    color: #10b981 !important;
                    transition: all 0.3s ease;
                }

                .cast-swiper .swiper-button-next:after,
                .cast-swiper .swiper-button-prev:after {
                    font-size: 14px !important;
                    font-weight: bold;
                }

                .cast-swiper .swiper-button-next:hover,
                .cast-swiper .swiper-button-prev:hover {
                    background: #10b981;
                    color: black !important;
                    border-color: #10b981;
                    box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
                }

                .cast-swiper .swiper-button-disabled {
                    opacity: 0 !important;
                    cursor: not-allowed;
                }

                @media (max-width: 640px) {
                    .cast-swiper .swiper-button-next,
                    .cast-swiper .swiper-button-prev {
                        display: none !important;
                    }
                }
            `}</style>
        </section>
    );
}