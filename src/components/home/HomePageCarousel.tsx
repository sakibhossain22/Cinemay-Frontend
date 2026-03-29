/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTrendingMoviesForCarousel } from "@/services/movieService";
import MovieSlider from "./EmblaCarousel";
import { getMovieBackDrop } from "@/services/getMovieCast";

export default async function HomePageCarousel() {

    const movies = await getTrendingMoviesForCarousel();
    // console.log(movies);
    const moviesWithBackdrops = await Promise.all(
        movies?.data?.map(async (movie : any) => {
            const backdropUrl = await getMovieBackDrop(
                movie.tmdb_id,
                movie.type === "MOVIE" ? "movie" : "tv");
            return {
                ...movie,
                backdropUrl: backdropUrl || movie.posterUrl, 
            };
        })
    );
    return (
        <div className="w-full h-[400px] md:h-[600px] relative group">
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