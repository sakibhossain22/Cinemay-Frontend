import { IMovieDetail } from "@/interfaces/movie.interface";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react"; // Play icon এর জন্য lucide-react ব্যবহার করা হয়েছে

export default function MovieCard({ movie }: { movie: IMovieDetail }) {
  return (
    <Link 
      href={`/movies/details/${movie.customid}`} 
      className="group relative block overflow-hidden rounded-lg bg-zinc-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10"
    >
      <div className="aspect-[2/3] relative w-full overflow-hidden">
        <Image
          src={movie.posterUrl || '/placeholder-poster.png'}
          alt={movie.title}
          width={768}
          height={432}
          className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110 group-hover:opacity-60"
          loading="lazy"
        />
        
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-emerald-500 p-4 rounded-full shadow-lg shadow-emerald-500/50 transform scale-50 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-8 h-8 text-black fill-current" />
          </div>
        </div>

        
        {movie.ratingAverage > 0 && (
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-emerald-400 border border-emerald-500/30">
            ★ {movie.ratingAverage.toFixed(1)}
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold text-zinc-100 truncate group-hover:text-emerald-400 transition-colors">
          {movie.title}
        </h3>
        <p className="text-xs text-zinc-500 mt-1">
          {movie.releaseYear} • {movie.type}
        </p>
      </div>
    </Link>
  );
}