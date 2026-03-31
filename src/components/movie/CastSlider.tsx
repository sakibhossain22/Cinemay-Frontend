/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // স্লাইডার ব্যবহারের জন্য এটি ক্লায়েন্ট কম্পোনেন্ট হতে হবে

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function CastSlider({ casts }: { casts: any[] }) {
    if (!casts || casts.length === 0) return null;

    return (
        <section className="py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Top Cast ({casts.length})</h2>
            </div>

            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={16}
                slidesPerView={2}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 6 },
                }}
                className="cast-swiper"
            >
                {casts.slice(0, 15).map((member: any) => (
                    <SwiperSlide key={member.id}>
                        <div className="group bg-zinc-900 rounded-xl overflow-hidden border border-white/5 hover:border-emerald-500/50 transition-all duration-300 shadow-lg">
                            
                            <div className="relative aspect-[2/3] w-full bg-zinc-800">
                                {member.profile_path ? (
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                                        alt={member.name}
                                        width={768}
                                        height={432}
                                        quality={30}
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-zinc-500 text-xs">
                                        No Image
                                    </div>
                                )}
                            </div>

                            
                            <div className="p-3">
                                <h3 className="font-bold text-sm text-white truncate group-hover:text-emerald-400 transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-[10px] md:text-xs text-zinc-500 mt-1 truncate">
                                    {member.character}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            
            <style jsx global>{`
        .cast-swiper .swiper-button-next,
        .cast-swiper .swiper-button-prev {
          color: #10b981 !important;
          transform: scale(0.5);
          background: rgba(0, 0, 0, 0.5);
          padding: 30px;
          border-radius: 50%;
        }
      `}</style>
        </section>
    );
}