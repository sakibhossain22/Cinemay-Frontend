/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMovieDetails, getMoviesByCategory } from "@/services/movieService";
import Image from "next/image";
import { Tv } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getMovieBackDrop, getMovieCast } from "@/services/getMovieCast";
import CastSlider from "@/components/movie/CastSlider";
import MovieCard from "@/components/home/MovieCard";
import MovieInteractions from "@/components/movie/MovieInteractions";
import ReviewSection from "@/components/movie/ReviewSection";
import { trackMovieView } from "@/actions/history.action";
import MovieDetailsAction from "@/components/movie/MovieDetailsAction";
import { confirmMoviePurchase, getPurchaseHistory } from "@/actions/user.action";
import { getSession } from "@/services/userService";

async function MovieDetails({ params, searchParams }: { params: Promise<{ customid: string, paymentStatus: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { customid } = await params;
  const sParams = await searchParams;

  const paymentStatus = sParams.paymentStatus;
  const transactionId = sParams.transactionId as string;
  const type = sParams.type as string;

  const response = await getMovieDetails(customid);
  const casts = await getMovieCast(response?.tmdb_id, response?.type === "MOVIE" ? "movie" : "tv");

  const movies = response;
  const backdropUrl = await getMovieBackDrop(movies?.tmdb_id, movies?.type === "MOVIE" ? "movie" : "tv");
  const movie = {
    ...movies,
    backdropUrl: backdropUrl || movies.posterUrl,
  };

  if (paymentStatus === "success") {
    await confirmMoviePurchase(movie.id, type, transactionId, customid);
  }

  const data = await getPurchaseHistory();
  const purchasedMovies = data?.data?.movies?.map((item: any) => item.movie);

  let hasPurchased = purchasedMovies?.some((m: any) => m.id === movie.id);

  if (movie.contentType === "FREE") {
    hasPurchased = true;
  }

  const categoryMovies = await getMoviesByCategory(movie.categories?.[0]?.name ?? "TRENDING");
  const catMovies = categoryMovies.data

  const user = await getSession();
  const userId = user?.user?.id;
  const role = user?.user?.role
  await trackMovieView(movie.id);

  if (!movie) return <div className="text-zinc-900 dark:text-white text-center p-20 font-bold uppercase tracking-widest">Loading...</div>;

  return (
    // ১. মেইন ব্যাকগ্রাউন্ড ডাইনামিক করা হয়েছে
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-600 dark:text-zinc-300 font-sans transition-colors duration-300">

      {/* Hero Section with Backdrop */}
      <div className="relative w-full h-[450px] overflow-hidden group">
        <div className="absolute inset-0 z-0">
          <Image
            src={movie.backdropUrl}
            alt="backdrop"
            width={1280}
            height={720}
            quality={70}
            className="absolute right-0 top-0 h-full w-auto object-cover object-right opacity-80 dark:opacity-70 blur-[1px] dark:blur-[2px] transition-all"
            priority
          />
          {/* ২. গ্রেডিয়েন্ট থিম অনুযায়ী পরিবর্তন হবে */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 dark:from-black dark:via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-8xl mx-auto px-6 h-full flex flex-col justify-center gap-2">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            
            {/* Poster */}
            <div className="w-36 md:w-44 lg:w-48 aspect-[2/3] relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl shrink-0 self-center md:self-start">
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                fill
                quality={70}
                priority
                className="object-cover"
                sizes="(max-width: 768px) 144px, 192px"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left w-full">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tighter uppercase">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-6">
                <Badge variant="outline" className="text-zinc-500 border-zinc-200 dark:border-zinc-800 px-2 py-0.5"><Tv size={14} /></Badge>
                <span className="text-zinc-300 dark:text-zinc-800">|</span>
                <span>{movie.releaseYear}</span>
                <span className="text-zinc-300 dark:text-zinc-800">|</span>
                <span className="text-emerald-600 dark:text-emerald-500 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-1 rounded-lg font-black">{movie.contentType}</span>
                <span className="text-zinc-300 dark:text-zinc-800">|</span>
                <span className="truncate">{movie.genre.join(" • ")}</span>
              </div>

              <p className="max-w-3xl text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-300 mb-6 font-medium line-clamp-2 md:line-clamp-none italic">
                {movie.synopsis}
              </p>

              <div className="w-full">
                <MovieDetailsAction userId={userId} hasPurchased={hasPurchased} movie={movie} />
              </div>
            </div>

            {/* Rating Display */}
            <div className="hidden lg:flex flex-col items-end pt-2 shrink-0">
              <div className="flex items-center gap-2 text-yellow-500 text-5xl font-black">
                <span className="text-3xl">★</span> {movie.ratingAverage?.toFixed(1) || "0.0"}
                <span className="text-zinc-300 dark:text-zinc-700 text-xl font-medium">/10</span>
              </div>
              <p className="text-zinc-400 dark:text-zinc-600 text-[10px] font-black uppercase tracking-widest mt-1">Global Rating</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          <div className="lg:col-span-3 space-y-16">

            {/* Cast Section */}
            <section id="cast-section" className="scroll-mt-20">

              <CastSlider casts={casts} />
            </section>

            {/* Interactions & Reviews */}
            <div className="space-y-12">
              <div className="bg-zinc-50 dark:bg-zinc-900/20 p-6 rounded-[2.5rem] border border-zinc-100 dark:border-white/5">
                <MovieInteractions
                  movieId={movie.id}
                  userId={userId}
                  role={role}
                  initialLikes={movie._count?.likes || 0}
                  isLiked={movie.likes?.some((l: any) => l.userId === userId)}
                />
              </div>

              <div id="review-section" className="scroll-mt-20">
                <ReviewSection
                  movieId={movie.id}
                  customid={movie.customid}
                  userId={userId}
                  role={role}
                  userStatus={user?.user?.status}
                  reviews={movie.reviews || []}
                />
              </div>
            </div>
          </div>

          {/* Sidebar - More Like This */}
          <aside className="space-y-8">
            <div className="flex items-center gap-4 mb-2">
               <h2 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-[0.2em]">Similar Content</h2>
               <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {catMovies?.length === 0 ? (
                <div className="text-zinc-400 col-span-2 text-center py-10 text-xs font-bold uppercase tracking-widest">No similar media</div>
              ) : (
                catMovies?.slice(0, 8).map((catMovie: any) => (
                  <MovieCard key={catMovie.id} movie={catMovie} />
                ))
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;