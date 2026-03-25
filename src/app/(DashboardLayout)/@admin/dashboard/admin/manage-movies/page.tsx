/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Film, Star, Calendar, Tag } from "lucide-react";
import MovieActions from "@/components/admin/MovieActions";
import { getAllMedia } from "@/actions/adminAction";
import { getTheMovieDB } from "@/actions/movieAction";

export default async function ManageMovies() {
  const res = await getAllMedia();
  const movies = res.data.media || [];

  return (
    <div className="space-y-8 p-2">
      {/* Header Stat Card */}
      <div className="relative overflow-hidden bg-zinc-900/40 border border-white/5 p-8 rounded-3xl backdrop-blur-xl">
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <Film className="text-emerald-500" /> Cinema <span className="text-emerald-500">Inventory</span>
            </h2>
            <p className="text-zinc-500 mt-1 font-medium">Manage your premium movie collection and pricing.</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-2xl text-right">
            <span className="block text-[10px] uppercase font-black text-emerald-500 tracking-widest">Live Movies</span>
            <span className="text-3xl font-black text-white">{movies.length}</span>
          </div>
        </div>
        {/* Decorative Gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -mr-32 -mt-32" />
      </div>

      {/* Modern Movie Table */}
      <div className="bg-zinc-900/20 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.03] text-zinc-400 text-[10px] uppercase tracking-[0.2em]">
                <th className="px-6 py-5 font-bold">Movie Details</th>
                <th className="px-6 py-5 font-bold">Pricing & Type</th>
                <th className="px-6 py-5 font-bold text-center">Stats</th>
                <th className="px-6 py-5 font-bold text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {movies.map((movie: any) => (
                <tr key={movie.id} className="hover:bg-white/[0.02] transition-all group">
                  {/* Movie Info */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-5">
                      <div className="relative w-16 h-24 rounded-xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                        <Image
                          src={movie.posterUrl}
                          alt={movie.title}
                          fill
                          className="object-cover"
                        />
                        {movie.contentType === "PREMIUM" && (
                          <div className="absolute top-1 left-1 bg-yellow-500 text-[8px] font-black px-1.5 py-0.5 rounded shadow-lg text-black">
                            PRO
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-white font-bold text-base leading-tight group-hover:text-emerald-400 transition-colors">
                          {movie.title}
                        </h4>
                        <div className="flex items-center gap-3 text-[11px] font-semibold text-zinc-500">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {movie.releaseYear}</span>
                          <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                          <span className="flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500" /> {movie.ratingAverage}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {movie.genre.slice(0, 2).map((g: string) => (
                            <span key={g} className="px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded text-[9px] uppercase border border-white/5">
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Pricing */}
                  <td className="px-6 py-5">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-500 font-bold w-10">BUY:</span>
                        <span className="text-sm font-black text-emerald-500">${movie.buyPrice}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-500 font-bold w-10">RENT:</span>
                        <span className="text-sm font-black text-blue-400">${movie.rentPrice}</span>
                      </div>
                    </div>
                  </td>

                  {/* Engagement */}
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-6 text-center">
                      <div>
                        <p className="text-sm font-black text-white">{movie._count.purchases}</p>
                        <p className="text-[9px] text-zinc-600 font-bold uppercase">Sales</p>
                      </div>
                      <div className="w-[1px] h-8 bg-white/5" />
                      <div>
                        <p className="text-sm font-black text-white">{movie._count.reviews}</p>
                        <p className="text-[9px] text-zinc-600 font-bold uppercase">Reviews</p>
                      </div>
                    </div>
                  </td>

                  {/* Separate Client Action Component */}
                  <td className="px-6 py-5 text-right">
                    <MovieActions customid={movie.customid} movieId={movie.id} movieTitle={movie.title} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}