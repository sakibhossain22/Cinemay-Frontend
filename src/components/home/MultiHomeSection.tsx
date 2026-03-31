/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
    getBanglaMovies, 
    getHindiMovies, 
    getTrendingAnimations, 
    getTrendingMovies, 
    getTrendingSeries 
} from "@/services/movieService";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import MovieCard from "./MovieCard";
import Link from "next/link";

const RenderSection = ({ title, data, link, icon }: any) => (
    <section>
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                {icon} {title}
            </h2>
            <Link href={link}>
                <Button variant="ghost" className="text-emerald-500 cursor-pointer hover:text-emerald-400">
                    View All
                </Button>
            </Link>
        </div>
        <Separator className="mb-6 opacity-10" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {data?.slice(0, 6).map((item: any) => (
                <MovieCard key={item.id || item._id} movie={item} />
            ))}
        </div>
    </section>
);

async function MultiHomeSection() {
    const [
        movies,
        series,
        animations,
        hindiMovies,
        banglaMovies
    ] = await Promise.all([
        getTrendingMovies(),
        getTrendingSeries(),
        getTrendingAnimations(),
        getHindiMovies(),
        getBanglaMovies(),
    ]);

    return (
        <div className="space-y-12">
            <RenderSection 
                title="Trending Movies" 
                data={movies} 
                link="/movies?type=MOVIE" 
                icon="🔥" 
            />
            <RenderSection 
                title="Popular Series" 
                data={series} 
                link="/movies?type=SERIES" 
                icon="📺" 
            />
            <RenderSection 
                title="Hindi Movies" 
                data={hindiMovies} 
                link="/movies?category=HINDI" 
                icon="🌟" 
            />
            <RenderSection 
                title="Bangla Movies" 
                data={banglaMovies} 
                link="/movies?category=BANGLA" 
                icon="🎭" 
            />
            <RenderSection 
                title="Popular Animations" 
                data={animations} 
                link="/movies?type=ANIMATION" 
                icon="🎬" 
            />
        </div>
    );
}

export default MultiHomeSection;