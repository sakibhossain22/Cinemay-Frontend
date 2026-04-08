import { IMovieDetail } from "@/interfaces/movie.interface";
import Image from "next/image";
import Link from "next/link";
import { Play, Star } from "lucide-react"; 

export default function MovieCard({ movie }: { movie: IMovieDetail }) {
  return (
    <Link 
      href={`/movies/details/${movie.customid}`} 
      className="group relative flex flex-col bg-white dark:bg-zinc-900/20 rounded-[2rem] border border-zinc-200 dark:border-white/5 overflow-hidden hover:border-emerald-500/30 transition-all duration-500 shadow-sm dark:shadow-none"
    >
      {/* Image Section */}
      <div className="relative aspect-[2/3] overflow-hidden bg-zinc-200 dark:bg-zinc-800">
        <Image
          src={movie.posterUrl || '/placeholder-poster.png'}
          alt={movie.title}
          fill
          quality={30}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 dark:opacity-100"
          loading="lazy"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Play Icon - Centered */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play size={24} fill="black" className="text-black ml-1" />
          </div>
        </div>

        {/* Rating Badge */}
        {movie.ratingAverage > 0 && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-amber-500 border border-white/10 flex items-center gap-1 shadow-lg">
            <Star size={10} fill="currentColor" /> {movie.ratingAverage.toFixed(1)}
          </div>
        )}
      </div>

      {/* Content Section - Background & Text Adjusted */}
      <div className="p-5 space-y-2 bg-white dark:bg-transparent transition-colors duration-300">
        <h3 className="text-zinc-900 dark:text-white font-bold text-base truncate leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-white/5">
          <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            {movie.releaseYear} • {movie.type}
          </p>
          
          {/* Small Indicator for Content Type if available */}
          <span className="text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase">
            HD
          </span>
        </div>
      </div>
    </Link>
  );
}