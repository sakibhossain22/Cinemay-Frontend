/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMovieDetails, getMoviesByCategory } from "@/services/movieService";
import Image from "next/image";
import { Play, Tv, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getMovieCast } from "@/services/getMovieCast";
import CastSlider from "@/components/movie/CastSlider";
import MovieCard from "@/components/home/MovieCard";
import MovieInteractions from "@/components/movie/MovieInteractions";
import ReviewSection from "@/components/movie/ReviewSection";
import { userService } from "@/services/userService";
import { trackMovieView } from "@/actions/history.action";

async function MovieDetails({ params }: { params: Promise<{ customid: string }> }) {
  const { customid } = await params;
  const response = await getMovieDetails(customid);
  const casts = await getMovieCast(response.tmdb_id, response.type === "MOVIE" ? "movie" : "tv");
  const movie = response;


  // const categoryName = (movie.categories && movie.categories.length > 0)
  //   ? movie.categories[0].name
  //   : "TRENDING";

  const categoryMovies = await getMoviesByCategory(movie.categories?.[0]?.name ?? "TRENDING");
  const catMovies = categoryMovies.data

  const user = await userService.getSession();
  const userId = user?.user?.id;
  await trackMovieView(movie.id);


  if (!movie) return <div className="text-white text-center p-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans">

      {/* --- Header Section (Backdrop) --- */}
      <div className="relative w-full h-[450px] overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={movie.posterUrl}
            alt="backdrop"
            width={768}
            height={432}
            className="object-cover opacity-30 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-8xl mx-auto px-6 h-full flex flex-col justify-center gap-6">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Small Poster */}
            <div className="w-32 md:w-44 aspect-[2/3] relative rounded-lg overflow-hidden border border-zinc-800 shadow-2xl">
              <Image src={movie.posterUrl} alt={movie.title} width={768}
                height={432} className="object-cover" />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs md:text-sm text-zinc-400 mb-4">
                <Badge variant="outline" className="text-zinc-400 border-zinc-700"><Tv /></Badge>
                <span>|</span>
                <span>{movie.releaseYear}</span>
                <span>|</span>
                <span className="text-green-600 bg-zinc-800 px-1 rounded uppercase">{movie.contentType}</span>
                <span>|</span>
                <span>{movie.genre.join(", ")}</span>
              </div>

              <p className="max-w-3xl text-sm md:text-base leading-relaxed line-clamp-3 mb-6">
                {movie.synopsis} <span className="text-white cursor-pointer hover:underline">.....</span>
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                <Button className="bg-emerald-500 cursor-pointer hover:bg-emerald-600 text-black font-bold h-12 px-8 rounded-md transition-transform active:scale-95">
                  <Play className="mr-2 fill-current " size={20} /> Watch Online
                </Button>
                <Button variant="secondary" className="bg-zinc-800 cursor-pointer hover:bg-zinc-700 text-white h-12 px-8 rounded-md">
                  <DownloadIcon className="mr-2" size={20} /> Download
                </Button>
              </div>


            </div>

            {/* Rating Section */}
            <div className="hidden lg:flex flex-col items-end pt-4">
              <div className="flex items-center gap-2 text-yellow-500 text-4xl font-bold">
                <span className="text-2xl">★</span> {movie.ratingAverage.toFixed(1)} <span className="text-zinc-600 text-xl font-normal">/10</span>
              </div>
              <p className="text-zinc-500 text-sm">0 people rated</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Tabs Section (Episodes, Cast etc) --- */}
      <div className="max-w-8xl mx-auto px-6 py-2">


        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3 space-y-12">
            {/* Cast Section */}
            <div>
              {/* Top Cast Section */}
              <section id="cast-section" className="scroll-mt-20">
                <div className="">
                  <CastSlider casts={casts} />
                </div>
              </section>
            </div>
            {/* Movie Interactions and Reviews */}
            <div>
              <MovieInteractions
                movieId={movie.id}
                userId={userId}
                initialLikes={movie._count?.likes || 0}
                isLiked={movie.likes?.some((l: any) => l.userId === userId)}
              />

              {/* কাস্ট সেকশনের নিচে রিভিউ সেকশন বসান */}
              <div id="review-section" className="scroll-mt-20">
                <ReviewSection
                  movieId={movie.id}
                  customid={movie.customid}
                  userId={userId}
                  reviews={movie.reviews || []}
                />
              </div>
            </div>

          </div>
          {/* Right Side: More like this */}
          <aside className="space-y-6">
            <h2 className="text-xl font-bold text-white">More like this</h2>
            <div className="grid grid-cols-2 gap-4">
              {
                catMovies?.length === 0 && <div className="text-zinc-500 col-span-2 text-center py-10">No similar movies found.</div>
              }
              {
                catMovies?.slice(0, 8).map((catMovie: any) => (
                  <MovieCard key={catMovie.id} movie={catMovie} />
                ))
              }

            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;