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
  const casts = await getMovieCast(response.tmdb_id, response.type === "MOVIE" ? "movie" : "tv");

  const movies = response;
  const backdropUrl = await getMovieBackDrop(movies.tmdb_id, movies.type === "MOVIE" ? "movie" : "tv");
  const movie = {
    ...movies,
    backdropUrl: backdropUrl || movies.posterUrl,
  };



  if (paymentStatus === "success") {
    await confirmMoviePurchase(movie.id, type, transactionId, customid);
  }


  const data = await getPurchaseHistory();
  const purchasedMovies = data?.data?.movies.map((item: any) => item.movie);

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


  if (!movie) return <div className="text-white text-center p-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans">


      <div className="relative w-full h-[450px] overflow-hidden">

        <div className="absolute inset-0 z-0">
          <Image
            src={movie.backdropUrl}
            alt="backdrop"
            width={1280}
            height={720}
            quality={50}
            className="absolute right-0 top-0 h-full w-auto object-cover object-right opacity-70 blur-[2px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>


        <div className="relative z-10 max-w-8xl mx-auto px-2 h-full flex flex-col justify-center gap-2">
          <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-start">

            <div className="w-36 md:w-44 lg:w-48 aspect-[2/3] relative rounded-lg overflow-hidden border border-zinc-800 shadow-2xl shrink-0 self-center md:self-start">
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                fill
                quality={30}
                priority
                className="object-cover mt-6 lg:mt-0 object-top"
                sizes="(max-width: 768px) 128px, (max-width: 1200px) 176px, 192px"
              />
            </div>

            <div className="flex-1 text-center md:text-left w-full">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                {movie.title}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 text-[10px] md:text-sm text-zinc-400 mb-5">
                <Badge variant="outline" className="text-zinc-400 border-zinc-700 px-1 py-0"><Tv size={14} /></Badge>
                <span className="text-zinc-700">|</span>
                <span>{movie.releaseYear}</span>
                <span className="text-zinc-700">|</span>
                <span className="text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">{movie.contentType}</span>
                <span className="text-zinc-700">|</span>
                <span className="truncate">{movie.genre.join(", ")}</span>
              </div>

              <p className="max-w-3xl text-sm md:text-base leading-relaxed text-zinc-300 mb-2 line-clamp-1 md:line-clamp-none">
                {movie.synopsis}
              </p>

              <div className="w-full">
                <MovieDetailsAction userId={userId} hasPurchased={hasPurchased} movie={movie} />
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-end pt-2 shrink-0">
              <div className="flex items-center gap-2 text-yellow-500 text-4xl font-bold">
                <span className="text-2xl">★</span> {movie.ratingAverage?.toFixed(1) || "0.0"}
                <span className="text-zinc-600 text-xl font-normal">/10</span>
              </div>
              <p className="text-zinc-500 text-xs mt-1">Global Rating</p>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-8xl mx-auto px-6 py-2">


        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3 space-y-12">

            <div>

              <section id="cast-section" className="scroll-mt-20">
                <div className="">
                  <CastSlider casts={casts} />
                </div>
              </section>
            </div>

            <div>
              <MovieInteractions
                movieId={movie.id}
                userId={userId}
                role={role}
                initialLikes={movie._count?.likes || 0}
                isLiked={movie.likes?.some((l: any) => l.userId === userId)}
              />


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