/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Film, Star, Calendar } from "lucide-react";
import MovieActions from "@/components/admin/MovieActions";
import { getAllMedia } from "@/actions/adminAction";

export default async function ManageMovies() {
  const res = await getAllMedia();
  const movies = res.data.media || [];

  return (
    <div className="space-y-6 p-2 max-w-full overflow-x-hidden">
      
      <div className="relative overflow-hidden bg-zinc-900/40 border border-white/5 p-4 md:p-8 rounded-2xl backdrop-blur-xl">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="w-full md:w-auto">
            <h2 className="text-xl md:text-3xl font-black uppercase text-white tracking-tight flex items-center gap-2">
              <Film className="text-emerald-500 w-5 h-5 md:w-8 md:h-8" /> 
              <span>Cinema <span className="text-emerald-500">Inventory</span></span>
            </h2>
            <p className="text-zinc-500 mt-1 font-medium text-[10px] md:text-sm">Manage premium collection & pricing.</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-left md:text-right shrink-0">
            <span className="block text-[8px] md:text-[10px] uppercase font-black text-emerald-500 tracking-widest">Live Movies</span>
            <span className="text-xl md:text-3xl font-black text-white">{movies.length}</span>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/20 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
        <table className="w-full text-left border-collapse table-fixed md:table-auto">
          <thead>
            <tr className="bg-white/[0.03] text-zinc-400 text-[9px] md:text-[10px] uppercase tracking-wider">
              <th className="px-2 md:px-6 py-4 font-bold w-[75%] md:w-auto">Movie Details</th>
              <th className="px-6 py-4 font-bold hidden md:table-cell">Pricing & Type</th>
              <th className="px-6 py-4 font-bold text-center hidden lg:table-cell">Stats</th>
              <th className="px-2 md:px-6 py-4 font-bold text-right w-[25%] md:w-auto">Ops</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {movies.map((movie: any) => (
              <tr key={movie.id} className="hover:bg-white/[0.02] transition-all group">
                
                <td className="px-2 md:px-6 py-3 md:py-5">
                  <div className="flex items-center gap-2 md:gap-5">
                    <div className="relative w-10 h-14 md:w-16 md:h-24 rounded-lg overflow-hidden shadow-2xl border border-white/10 shrink-0">
                      <Image
                        src={movie.posterUrl}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-white font-bold text-sm md:text-base leading-tight truncate group-hover:text-emerald-400 transition-colors">
                        {movie.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-semibold text-zinc-500 mt-1">
                        <span className="flex items-center gap-1"><Calendar size={10} /> {movie.releaseYear}</span>
                        <span className="flex items-center gap-1"><Star size={10} className="text-yellow-500 fill-yellow-500" /> {movie.ratingAverage}</span>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 hidden md:table-cell">
                  <div className="space-y-1">
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

                <td className="px-6 py-5 hidden lg:table-cell">
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

                <td className="px-2 md:px-6 py-3 md:py-5 text-right">
                   <MovieActions customid={movie.customid} movieId={movie.id} movieTitle={movie.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}