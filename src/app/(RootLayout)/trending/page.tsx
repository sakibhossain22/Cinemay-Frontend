/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-static'; 

import Link from "next/link";
import Image from "next/image";
import { Play, TrendingUp } from "lucide-react";
import { getTrending } from "@/actions/new.action";

async function TrendingNow() {
    const trendingData = await getTrending("TRENDING");

    const items = trendingData?.data?.data || [];

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8 border-l-4 border-emerald-500 dark:border-emerald-400 pl-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
                            Trending Now
                        </h2>
                        <TrendingUp size={24} className="text-emerald-500 animate-bounce hidden md:block" />
                    </div>
                    <Link 
                        href="/movies" 
                        className="text-xs font-bold text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-all uppercase tracking-widest group flex items-center gap-1"
                    >
                        View All
                        <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </Link>
                </div>

                {/* Movie Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
                    {items && items.length > 0 ? (
                        items.map((item: any) => (
                            <Link href={`/movies/details/${item.customid}`} key={item.tmdb_id || item._id} className="group">
                                <div className="relative bg-white dark:bg-zinc-900 rounded-[1.5rem] overflow-hidden transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/20 dark:hover:shadow-emerald-500/10 hover:-translate-y-2 border border-zinc-200 dark:border-zinc-800">
                                    
                                    {/* Thumbnail Container */}
                                    <div className="aspect-[2/3] relative w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                                        <Image
                                            width={400}
                                            height={600}
                                            src={item.posterUrl}
                                            alt={item.title}
                                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 group-hover:opacity-30"
                                            loading="lazy"
                                        />

                                        {/* Dynamic Play Button Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <div className="bg-emerald-500 p-4 rounded-full shadow-2xl shadow-emerald-500/50 transform scale-75 group-hover:scale-100 transition-all duration-500">
                                                <Play className="w-6 h-6 md:w-8 md:h-8 text-black fill-current" />
                                            </div>
                                        </div>

                                        {/* Rating Badge (Optional) */}
                                        {item.ratingAverage && (
                                            <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] md:text-xs font-black text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-lg">
                                                ★ {item.ratingAverage.toFixed(1)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Meta Information */}
                                    <div className="p-4">
                                        <h3 className="text-sm md:text-base font-bold truncate text-zinc-800 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-[10px] md:text-xs text-zinc-500 font-bold uppercase">
                                                {item.releaseYear}
                                            </span>
                                            <span className="text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 uppercase tracking-widest">
                                                {item.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-zinc-100/50 dark:bg-zinc-900/20 rounded-[2rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                            <p className="text-zinc-400 font-bold tracking-widest uppercase text-sm italic">
                                No trending movies right now.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default TrendingNow;