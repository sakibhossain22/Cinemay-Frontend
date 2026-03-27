/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { IMovie } from '@/interfaces/movie.interface';

export default function MovieSlider({ movies }: { movies: IMovie }) {
    return (
        <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper w-full h-full rounded-2xl overflow-hidden"
        >
            {movies.data.map((movie: any) => (
                <SwiperSlide key={movie.id}>
                    <div className="relative w-full h-full">
                        <Image
                            src={movie.posterUrl}
                            alt={movie.title}
                            width={768}
                            height={432}
                            className="object-cover brightness-[0.4]"
                            priority
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 bg-gradient-to-t from-black via-transparent to-transparent">
                            <div className="max-w-2xl space-y-4 text-white">
                                <h2 className="text-4xl md:text-6xl font-bold">{movie.title}</h2>
                                <div className="flex items-center gap-4 text-emerald-400">
                                    <span>{movie.releaseYear}</span>
                                    <span className="px-2 py-0.5 border border-emerald-500 rounded text-xs">{movie.type}</span>
                                    <span className="text-yellow-400">★ {movie.ratingAverage}</span>
                                </div>
                                <p className="text-zinc-300 line-clamp-3">{movie.synopsis}</p>
                                <div className="flex gap-4 pt-4">
                                    <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 font-bold rounded-full transition-all">Watch Now</button>
                                    <button className="px-8 py-3 bg-white/10 backdrop-blur-md font-bold rounded-full">Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}