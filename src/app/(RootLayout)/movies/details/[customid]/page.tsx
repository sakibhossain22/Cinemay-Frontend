import { getMovieDetails } from "@/services/movieService";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Download, Star, Calendar, Clock } from "lucide-react";

async function MovieDetails({ params }: { params: Promise<{ customid: string }> }) {
  // ১. params কে await করে customid বের করা
  const { customid } = await params;
  console.log(customid)
  // ২. মুভি ডিটেইলস ফেচ করা
  const response = await getMovieDetails(customid);
  const movie = response; // আপনার API স্ট্রাকচার অনুযায়ী

  if (!movie) {
    return <div className="text-center p-20 text-xl">Movie not found!</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Backdrop */}
      <div className="relative w-full h-[50vh] md:h-[70vh]">
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          className="object-cover opacity-40 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col md:flex-row items-end md:items-center gap-8 px-6 md:px-16 pb-10">
          {/* Main Poster */}
          <div className="relative w-48 md:w-80 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-white/10 hidden md:block">
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
              <span className="flex items-center gap-1 text-yellow-400 font-bold">
                <Star className="w-4 h-4 fill-yellow-400" /> {movie.ratingAverage}
              </span>
              <span className="flex items-center gap-1 text-zinc-400">
                <Calendar className="w-4 h-4" /> {movie.releaseYear}
              </span>
              <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-none">
                {movie.contentType}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genre.map((g: string) => (
                <Badge key={g} variant="outline" className="border-zinc-700">
                  {g}
                </Badge>
              ))}
            </div>

            <p className="text-zinc-300 max-w-3xl text-sm md:text-lg leading-relaxed line-clamp-4">
              {movie.synopsis}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-8">
                <Play className="mr-2 h-5 w-5 fill-current" /> Watch Now
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 border-zinc-700">
                <Download className="mr-2 h-5 w-5" /> Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details Section */}
      <div className="px-6 md:px-16 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Cast</h3>
            <div className="flex flex-wrap gap-3">
              {movie.cast.map((person: string) => (
                <span key={person} className="px-4 py-2 bg-zinc-900 rounded-lg text-zinc-300 text-sm">
                  {person}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4">
          <h3 className="text-xl font-bold">Movie Info</h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-zinc-500">Director:</span> {movie.director}</p>
            <p><span className="text-zinc-500">Type:</span> {movie.type}</p>
            <p><span className="text-zinc-500">Buy Price:</span> {movie.buyPrice} BDT</p>
            <p><span className="text-zinc-500">Rent Price:</span> {movie.rentPrice} BDT (For {movie.rentDuration}h)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;