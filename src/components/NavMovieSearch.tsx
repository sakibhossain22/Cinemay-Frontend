/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Search, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

function NavMovieSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    console.log(movies)
    useEffect(() => {
        const fetchMovies = async () => {
            if (searchTerm.length < 2) {
                setMovies([]);
                return;
            }

            setLoading(true);
            try {
                // আপনার এক্সপ্রেস ব্যাকএন্ডের ফুল URL দিন যদি ফ্রন্টএন্ড থেকে আলাদা পোর্টে হয়
                const response = await fetch(`http://localhost:5000/api/media/all-media?searchTerm=${encodeURIComponent(searchTerm)}`);
                const data = await response.json();
                setMovies(data.data.data || []); // আপনার API রেসপন্স অনুযায়ী 'data.movies' ও হতে পারে
            }
            catch (error) {
                console.error("Error fetching movies:", error);
            }
            finally {
                setLoading(false);
            }
        };

        // Debouncing: ইউজার টাইপ থামানোর ৫০০ মিলি-সেকেন্ড পর API কল হবে
        const delayDebounceFn = setTimeout(() => {
            fetchMovies();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <div className="relative w-full max-w-sm group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 group-focus-within:text-emerald-500 transition-colors z-10" />
            
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                placeholder="Search movies..."
                className="w-full bg-zinc-900/40 border border-zinc-800 text-sm text-zinc-200 rounded-full py-2.5 pl-10 pr-10 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
            />

            {loading && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-emerald-500 animate-spin" />
            )}

            {/* সার্চ রেজাল্ট ড্রপডাউন */}
            {showResults && searchTerm.length >= 2 && (
                <>
                    {/* স্ক্রিনের বাইরে ক্লিক করলে ড্রপডাউন বন্ধ করার জন্য ওভারলে */}
                    <div className="fixed inset-0 z-10" onClick={() => setShowResults(false)}></div>
                    
                    <div className="absolute top-full mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-20 backdrop-blur-xl">
                        {movies.length > 0 ? (
                            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                                {movies.map((movie: any) => (
                                    <Link 
                                        key={movie._id} 
                                        href={`/movies/details/${movie.customid}`}
                                        onClick={() => setShowResults(false)}
                                        className="flex items-center gap-3 p-3 hover:bg-emerald-500/10 transition-colors border-b border-zinc-800/50 last:border-0"
                                    >
                                        <div className="relative size-12 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                                            <Image 
                                                src={movie.posterUrl || "/placeholder.jpg"} 
                                                alt={movie.title} 
                                                fill 
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-sm font-medium text-zinc-200 truncate">{movie.title}</span>
                                            <span className="text-xs text-zinc-500">{movie.year || "Movie"}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : !loading ? (
                            <div className="p-4 text-center text-sm text-zinc-500">
                                No movies found for &quot;{searchTerm}&quot;
                            </div>
                        ) : null}
                    </div>
                </>
            )}
        </div>
    )
}

export default NavMovieSearch