/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBanglaMovies, getHindiMovies, getTrendingAnimations, getTrendingMovies, getTrendingSeries } from "@/services/movieService";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import MovieCard from "./MovieCard";
import Link from "next/link";

async function MultiHomeSection() {
    const moviesRes = await getTrendingMovies();
    const seriesRes = await getTrendingSeries();
    const animationRes = await getTrendingAnimations();
    const hindiMoviesRes = await getHindiMovies();
    const banglaMoviesRes = await getBanglaMovies();

    const movies = moviesRes || [];
    const series = seriesRes || [];
    const animations = animationRes || [];
    const hindiMovies = hindiMoviesRes || [];
    const banglaMovies = banglaMoviesRes || [];


    return (
        <div className="space-y-12">
            
            {/* Trending Movies Section */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        🔥 Trending Movies
                    </h2>
                    <Link href="/movies?type=MOVIE">
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

            {/* Popular Series Section */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        📺 Popular Series
                    </h2>
                    <Link href="/movies?type=SERIES">
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

            {/* Hindi Movies Section */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        🌟 Hindi Movies
                    </h2>
                    <Link href="/movies?category=HINDI">
                        <Button variant="ghost" className="text-emerald-500 cursor-pointer hover:text-emerald-400">
                            View All
                        </Button>
                    </Link>
                </div>
                <Separator className="mb-6 opacity-10" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                    {hindiMovies.slice(0, 6).map((item: any) => (
                        <MovieCard key={item.id} movie={item} />
                    ))}
                </div>
            </section>

            {/* Bangla Movies Section */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        🎭 Bangla Movies
                    </h2>
                    <Link href="/movies?category=BANGLA">
                        <Button variant="ghost" className="text-emerald-500 cursor-pointer hover:text-emerald-400">
                            View All
                        </Button>
                    </Link>
                </div>
                <Separator className="mb-6 opacity-10" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                    {banglaMovies.slice(0, 6).map((item: any) => (
                        <MovieCard key={item.id} movie={item} />
                    ))}
                </div>
            </section>
            
            {/* Popular Animations Section */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        🎬 Popular Animations
                    </h2>
                    <Link href="/movies?type=ANIMATION">
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