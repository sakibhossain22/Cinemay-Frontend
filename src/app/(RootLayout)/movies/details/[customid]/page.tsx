import { getMovieDetails } from "@/services/movieService";
import Image from "next/image";
import { Play, Smartphone, Share2, Facebook, Twitter, Linkedin, Send, Radio, Tv, DownloadIcon  } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

async function MovieDetails({ params }: { params: Promise<{ customid: string }> }) {
  const { customid } = await params;
  const response = await getMovieDetails(customid);
  const movie = response;
  console.log(movie, customid)
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
            fill
            className="object-cover opacity-30 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center gap-6">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Small Poster */}
            <div className="w-32 md:w-44 aspect-[2/3] relative rounded-lg overflow-hidden border border-zinc-800 shadow-2xl">
              <Image src={movie.posterUrl} alt={movie.title} fill className="object-cover" />
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
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex gap-8 border-b border-zinc-800 mb-8">
          <button className="pb-3 text-zinc-500 font-bold uppercase text-sm hover:text-zinc-300">Top Cast</button>
          <button className="pb-3 text-zinc-500 font-bold uppercase text-sm hover:text-zinc-300">User Review</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Left Side: Episodes & Cast */}
          <div className="lg:col-span-3 space-y-12">

            {/* Episodes List */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Episodes</h2>
              <div className="flex gap-2">
                {['film', 'Iklk', 'Netflix', 'Plex'].map((tag) => (
                  <Badge key={tag} className="bg-zinc-800 text-zinc-400 hover:bg-zinc-700 cursor-pointer px-4 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Top Cast Section */}
            <section>
              <h2 className="text-xl font-bold text-white mb-6">Top Cast({movie.cast.length})</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {movie.cast.map((actor: string, i: number) => (
                  <div key={actor} className="space-y-2">
                    <div className="aspect-[4/5] relative rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
                      {/* যদি ইমেজ না থাকে তবে প্লেসহোল্ডার */}
                      <div className="flex items-center justify-center h-full text-zinc-700">
                        {/* এখানে ডামি প্রোফাইল আইকন বসাতে পারেন */}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-zinc-300">{actor}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Side: More like this */}
          <aside className="space-y-6">
            <h2 className="text-xl font-bold text-white">More like this</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* এখানে সিমিলার মুভির জন্য ম্যাপ করবেন */}
              <div className="aspect-[2/3] bg-zinc-900 rounded-lg overflow-hidden relative border border-zinc-800">
                <p className="absolute bottom-2 left-2 text-[10px] bg-black/60 p-1">Similar Movie 1</p>
              </div>
              <div className="aspect-[2/3] bg-zinc-900 rounded-lg overflow-hidden relative border border-zinc-800">
                <p className="absolute bottom-2 left-2 text-[10px] bg-black/60 p-1">Similar Movie 2</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;