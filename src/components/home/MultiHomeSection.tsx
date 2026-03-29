/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTrendingAnimations, getTrendingMovies, getTrendingSeries } from "@/services/movieService";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import MovieCard from "./MovieCard";
import Link from "next/link";

async function MultiHomeSection() {
    const moviesRes = await getTrendingMovies();
    const seriesRes = await getTrendingSeries();
    const animationRes = await getTrendingAnimations()
    const movies = moviesRes || [];
    const series = seriesRes || [];
    const animations = animationRes || [];
    return (
        <div className="space-y-12">
            
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        🔥 Trending Movies
                    </h2>
                    <Link className="cursor-pointer" href= "/movies?type=MOVIE">
                        <Button variant="ghost" className="text-emerald-500 cursor-pointer hover:text-emerald-400">
                            View All
                        </Button>
                    </Link>
                </div>
                <Separator className="mb-6 opacity-10" />
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                    {movies.slice(0, 6).map((movie: any) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>

            
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        📺 Popular Series
                    </h2>
                    <Link className="cursor-pointer" href="/movies?type=SERIES">
                        <Button variant="ghost" className="text-emerald-500 cursor-pointer hover:text-emerald-400">
                            View All
                        </Button>
                    </Link>
                </div>
                <Separator className="mb-6 opacity-10" />

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                    {series.slice(0, 6).map((item: any) => (
                        <MovieCard key={item.id} movie={item} />
                    ))}
                </div>
            </section>
            
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        🎬 Popular Animations
                    </h2>
                    <Link href="/movies?type=ANIMATION" >
                        <Button variant="ghost" className="text-emerald-500 cursor-pointer hover:text-emerald-400">
                            View All
                        </Button>
                    </Link>
                </div>
                <Separator className="mb-6 opacity-10" />

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                    {animations.slice(0, 6).map((item: any) => (
                        <MovieCard key={item.id} movie={item} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default MultiHomeSection;