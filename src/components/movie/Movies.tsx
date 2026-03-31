/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Search, Crown, Film, Star, ChevronLeft, ChevronRight,
  Play, Calendar, Clapperboard
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface MediaLibraryProps {
  initialData: {
    success: boolean;
    message: string;
    data: {
      meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
      }
      data: any[];
    }
  }
}

export default function AdminMediaLibrary({ initialData }: MediaLibraryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const movies = initialData?.data?.data || [];
  const meta = initialData?.data?.meta || { page: 1, totalPage: 1, total: 0 };

  const [searchInput, setSearchInput] = useState(searchParams.get('searchTerm') || "");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      if (name !== 'page') params.set('page', '1');
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (name: string, value: string) => {
    router.push(`${pathname}?${createQueryString(name, value)}`, { scroll: false });
  };

  const clearFilter = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(name);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // useEffect(() => {
  //   setLoading(true);
  // }, [searchParams]);

  return (
    <div className="lg:p-4 p-0 md:p-8 bg-[#020617] min-h-screen text-zinc-300 font-sans selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto space-y-10">

        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <h1 className="lg:text-3xl md:text-2xl text-xl font-black text-white tracking-tighter flex items-center gap-3">
              <Film className="text-emerald-500 lg:w-10 h-10" /> EXPLORE MEDIA
            </h1>
            <p className="text-zinc-500 text-xs md:text-sm font-medium uppercase tracking-[0.1em]">Discover Premium Entertainment</p>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 group-focus-within:text-emerald-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search movies, series..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFilterChange('searchTerm', searchInput)}
                className="bg-zinc-900/40 border border-white/30 rounded-2xl lg:py-4 py-3  pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 w-full transition-all backdrop-blur-md"
              />
            </div>
            <button
              onClick={() => handleFilterChange('searchTerm', searchInput)}
              className="bg-emerald-600 hover:bg-emerald-500 text-black/80 lg:px-8 px-4 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
            >
              Search
            </button>
          </div>
        </div>

        
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white/[0.02] lg:p-3 rounded-[2.5rem] border border-white/5 backdrop-blur-xl gap-4">
          <div className="flex scroll-none items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-hide">
            <FilterButton
              label="All Content"
              active={!searchParams.get('isPremium')}
              onClick={() => clearFilter('isPremium')}
            />
            <FilterButton
              label="Premium"
              active={searchParams.get('isPremium') === 'true'}
              onClick={() => handleFilterChange('isPremium', 'true')}
              icon={<Crown size={14} className="text-amber-500" />}
            />
            <FilterButton
              label="Free"
              active={searchParams.get('isPremium') === 'false'}
              onClick={() => handleFilterChange('isPremium', 'false')}
            />
          </div>

          <div className="flex lg:flex-wrap items-center gap-4">
            
            <div className="flex items-center gap-3 bg-black/20 px-4 py-3 rounded-2xl border border-white/5 group">
              <Clapperboard size={14} className="text-emerald-500 group-hover:text-emerald-400 transition-colors" />
              <select
                value={searchParams.get('type') || ''}
                onChange={(e) => e.target.value === '' ? clearFilter('type') : handleFilterChange('type', e.target.value)}
                className="bg-transparent text-white text-[10px] font-black uppercase tracking-widest focus:outline-none cursor-pointer hover:text-emerald-400 transition-colors"
              >
                <option value="" className="bg-zinc-950">All Types</option>
                <option value="MOVIE" className="bg-zinc-950">Movie</option>
                <option value="SERIES" className="bg-zinc-950">Series</option>
                <option value="ANIMATION" className="bg-zinc-950">Animation</option>
              </select>
            </div>

            
            <div className="flex items-center gap-4 bg-black/20 px-6 py-3 rounded-2xl border border-white/5">
              <span className="text-[10px] font-black text-zinc-500 uppercase hidden lg:block tracking-widest">Sort By</span>
              <select
                value={searchParams.get('sortBy') || 'newest'}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer hover:text-emerald-400 transition-colors"
              >
                <option value="newest" className="bg-zinc-950 text-white">Recently Added</option>
                <option value="priceHigh" className="bg-zinc-950 text-white">Price: High to Low</option>
                <option value="priceLow" className="bg-zinc-950 text-white">Price: Low to High</option>
                <option value="rating" className="bg-zinc-950 text-white">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">
            {movies.map((movie: any) => (
              <Link key={movie.id} href={`/movies/details/${movie.customid}`} className="group hover:cursor-pointer relative flex flex-col bg-zinc-900/20 rounded-[2rem] border border-white/5 overflow-hidden hover:border-emerald-500/30 transition-all duration-500">
                <div>
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <Image
                      fill
                      quality={30}
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {movie.contentType === 'PREMIUM' ? (
                        <span className="bg-amber-500 text-black text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xl">
                          <Crown size={12} fill="currentColor" /> PREMIUM
                        </span>
                      ) : (
                        <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5">
                          FREE
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-emerald-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      ${movie.buyPrice}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play size={24} fill="black" className="text-black ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="text-white font-bold text-base truncate leading-tight group-hover:text-emerald-400 transition-colors">
                      {movie.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {movie.genre?.slice(0, 2).map((g: string) => (
                        <span key={g} className="text-[9px] font-black text-zinc-500 uppercase tracking-tighter">
                          {g}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-white/5">
                      <div className="flex items-center gap-1 text-zinc-500">
                        <Calendar size={12} />
                        <span className="text-[10px] font-bold">{movie.releaseYear}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star size={12} fill="currentColor" />
                        <span className="text-[10px] font-black italic">{movie.ratingAverage}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center space-y-4">
            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto border border-white/5">
              <Film className="text-zinc-700" size={32} />
            </div>
            <p className="text-zinc-600 font-black uppercase tracking-[0.3em] text-sm">No Media Found</p>
          </div>
        )}

        
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5">
          <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
            Showing <span className="text-white">{movies.length}</span> — Page {meta.page} of {meta.totalPage}
          </div>
          <div className="flex items-center gap-3">
            <button
              disabled={meta.page === 1}
              onClick={() => handleFilterChange('page', (meta.page - 1).toString())}
              className="px-6 py-3 bg-zinc-900 border border-white/5 rounded-2xl hover:bg-zinc-800 disabled:opacity-20 transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <div className="hidden sm:flex items-center gap-2">
              {[...Array(meta.totalPage)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleFilterChange('page', (i + 1).toString())}
                  className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${meta.page === i + 1 ? 'bg-emerald-600 text-white' : 'hover:bg-white/5 text-zinc-500'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              disabled={meta.page === meta.totalPage}
              onClick={() => handleFilterChange('page', (meta.page + 1).toString())}
              className="px-6 py-3 bg-zinc-900 border border-white/5 rounded-2xl hover:bg-zinc-800 disabled:opacity-20 transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterButton({ label, active, onClick, icon }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 mx-2 flex items-center gap-2 lg:px-6 px-2 my-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${active
        ? 'bg-emerald-500 text-black/80 shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-105'
        : 'text-zinc-500 hover:text-white hover:bg-white/5'
        }`}
    >
      {icon} {label}
    </button>
  );
}