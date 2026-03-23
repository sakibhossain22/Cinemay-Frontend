import { IMovieDetail } from "@/interfaces/movie.interface";
import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }: { movie: IMovieDetail }) {
  return (
    <Link href={`/movies/details/${movie.customid}`} className="group relative block overflow-hidden rounded-lg bg-zinc-900 transition-all hover:scale-105">
      <div className="aspect-[2/3] relative w-4/5">
        <Image
          src={movie.posterUrl || '/placeholder-poster.png'}
          alt={movie.title}
          fill
          className="object-cover transition-opacity group-hover:opacity-80"
        />
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-yellow-400">
          ★ {movie.ratingAverage}
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-zinc-100 truncate">{movie.title}</h3>
        <p className="text-xs text-zinc-500">{movie.releaseYear} • {movie.type}</p>
      </div>
    </Link>
  );
}