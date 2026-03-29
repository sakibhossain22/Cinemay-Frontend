/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTrendingMoviesForCarousel } from "@/services/movieService";
import MovieSlider from "./EmblaCarousel";
import { getMovieBackDrop } from "@/services/getMovieCast";

export default async function HomePageCarousel() {
    const moviesResponse = await getTrendingMoviesForCarousel();
    
    const movieData = moviesResponse?.data || [];

    if (!Array.isArray(movieData) || movieData.length === 0) {
        return null;
    }

    const moviesWithBackdrops = await Promise.all(
        movieData.map(async (movie: any) => {
            try {
                const backdropUrl = await getMovieBackDrop(
                    movie.tmdb_id,
                    movie.type === "MOVIE" ? "movie" : "tv"
                );
                return {
                    ...movie,
                    backdropUrl: backdropUrl || movie.posterUrl,
                };
            } catch (error) {
                console.error(`Error fetching backdrop for ${movie.tmdb_id}:`, error);
                return { ...movie, backdropUrl: movie.posterUrl };
            }
        })
    );

    return (
        <div className="w-full h-[400px] md:h-[600px] relative group overflow-hidden">
            <MovieSlider movies={moviesWithBackdrops} />

            <style dangerouslySetInnerHTML={{
                __html: `
                .swiper-button-next, .swiper-button-prev {
                    color: white !important;
                    background: rgba(0,0,0,0.3);
                    width: 50px !important;
                    height: 50px !important;
                    border-radius: 50%;
                    backdrop-filter: blur(4px);
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                .group:hover .swiper-button-next, .group:hover .swiper-button-prev {
                    opacity: 1;
                }
                .swiper-pagination-bullet-active {
                    background: #10b981 !important;
                }
            `}} />
        </div>
    );
}