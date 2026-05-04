/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTrendingMoviesForCarousel } from "@/services/movieService";
import MovieSlider from "./EmblaCarousel";
import { getMovieBackDrop } from "@/services/getMovieCast";

export async function getStaticProps() {

    try {
        const response = await fetch(`${process.env.API_URL}/media/all-media?category=TRENDING&limit=8`);
        const data = await response.json();
            return {
        props: {
            data: data.data, // Pass the fetched data as props
        },
        revalidate: 3600, // 1 hour
    };
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }

}

export default async function HomePageCarousel() {
    const movieData = await getTrendingMoviesForCarousel();
    const moviesWithBackdrops = await Promise.all(
        movieData?.data?.map(async (movie: any) => {
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