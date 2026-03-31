/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { getTrending } from "@/actions/new.action";

async function TopRated() {
    const trendingData = await getTrending("TOP RATED");

    const items = trendingData?.data?.data || [];
    const meta = trendingData?.data?.meta || {};

    return (
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-black text-white">
            <div className="flex items-center justify-between mb-6 border-l-4 border-emerald-500 pl-4">
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider">
                    TOP RATED
                </h2>
                <Link href="/movies" className="text-sm text-gray-400 hover:text-emerald-500 transition-colors uppercase">
                    View All
                </Link>
            </div>

            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
                {items && items.length > 0 ? (
                    items.map((item: any) => (
                        <Link href={`/movies/details/${item.customid}`} key={item.tmdb_id || item._id}>
                            <div
                                
                                className="group relative bg-[#121212] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10"
                            >
                                
                                <div className="aspect-[2/3] relative w-full overflow-hidden">
                                    <Image
                                        width={400}
                                        height={700}
                                        src={item.posterUrl}
                                        alt={item.title}
                                        quality={30}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 group-hover:opacity-60"
                                        loading="lazy"
                                    />

                                    
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-emerald-500 p-4 rounded-full shadow-lg shadow-emerald-500/40 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                            <Play className="w-8 h-8 text-black fill-current" />
                                        </div>
                                    </div>

                                    
                                    {item.ratingAverage && (
                                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-emerald-400 border border-emerald-500/30">
                                            ⭐ {item.ratingAverage.toFixed(1)}
                                        </div>
                                    )}
                                </div>

                                
                                <div className="p-3">
                                    <h3 className="text-sm md:text-base font-semibold truncate group-hover:text-emerald-400 transition-colors">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center justify-between mt-1 text-[10px] md:text-xs text-gray-500 uppercase">
                                        <span className="group-hover:text-gray-300">{item.releaseYear}</span>
                                        <span className="border border-gray-700 px-1.5 py-0.5 rounded text-gray-400 group-hover:border-emerald-500/50 group-hover:text-emerald-500 transition-colors">
                                            {item.type}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 py-10 font-medium tracking-wide italic">
                        No trending content found at the moment.
                    </p>
                )}
            </div>
        </section>
    );
}

export default TopRated;