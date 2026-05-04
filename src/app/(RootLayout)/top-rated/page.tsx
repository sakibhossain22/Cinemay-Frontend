/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-static'; 

import Link from "next/link";
import Image from "next/image";
import { Play, Star } from "lucide-react";
import { getTrending } from "@/actions/new.action";

async function TopRated() {
    const trendingData = await getTrending("TOP RATED");

    const items = trendingData?.data?.data || [];
    // const meta = trendingData?.data?.meta || {}; // প্রয়োজনে ব্যবহার করতে পারো

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8 border-l-4 border-emerald-500 pl-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
                            Top Rated
                        </h2>
                        <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-1 uppercase tracking-widest">
                            Most acclaimed cinema
                        </p>
                    </div>
                    <Link href="/movies" className="text-xs font-bold text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all uppercase tracking-widest border-b border-transparent hover:border-emerald-500">
                        View All
                    </Link>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
                    {items && items.length > 0 ? (
                        items.map((item: any) => (
                            <Link href={`/movies/details/${item.customid}`} key={item.tmdb_id || item._id} className="group">
                                <div className="relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/20 dark:hover:shadow-emerald-500/10 hover:-translate-y-2 border border-zinc-200 dark:border-zinc-800">
                                    
                                    {/* Poster Image */}
                                    <div className="aspect-[2/3] relative w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                                        <Image
                                            width={400}
                                            height={600}
                                            src={item.posterUrl}
                                            alt={item.title}
                                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                                            loading="lazy"
                                        />

                                        {/* Play Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <div className="bg-emerald-500 p-4 rounded-full shadow-xl shadow-emerald-500/40 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <Play className="w-6 h-6 md:w-8 md:h-8 text-black fill-current" />
                                            </div>
                                        </div>

                                        {/* Rating Badge */}
                                        {item.ratingAverage && (
                                            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] md:text-xs font-black text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                                                <Star size={12} className="fill-emerald-400" />
                                                {item.ratingAverage.toFixed(1)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Details */}
                                    <div className="p-4">
                                        <h3 className="text-sm md:text-base font-bold truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-[10px] md:text-xs text-zinc-500 font-bold uppercase tracking-tighter">
                                                {item.releaseYear}
                                            </span>
                                            <span className="text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 uppercase tracking-widest group-hover:border-emerald-500/50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                {item.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-zinc-100 dark:bg-zinc-900/30 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                            <p className="text-zinc-500 font-bold tracking-widest uppercase text-sm">
                                No trending content found.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default TopRated;