import React from 'react';

const MovieDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] animate-pulse">
      
      {/* 1. Hero Section Skeleton */}
      <div className="relative w-full h-[450px] bg-zinc-200 dark:bg-zinc-900/50 overflow-hidden">
        <div className="relative z-10 max-w-8xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            
            {/* Poster Skeleton (Matching your MovieCard style) */}
            <div className="w-36 md:w-44 lg:w-48 aspect-[2/3] bg-zinc-300 dark:bg-zinc-800 rounded-2xl shrink-0 self-center md:self-start shadow-2xl border border-white/5" />

            {/* Info Skeleton */}
            <div className="flex-1 space-y-6 w-full pt-4">
              <div className="h-10 md:h-12 bg-zinc-300 dark:bg-zinc-800 rounded-xl w-3/4 mx-auto md:mx-0" />
              
              <div className="flex items-center justify-center md:justify-start gap-4">
                <div className="h-5 bg-zinc-300 dark:bg-zinc-800 rounded-lg w-20" />
                <div className="h-5 bg-zinc-300 dark:bg-zinc-800 rounded-lg w-16" />
                <div className="h-5 bg-zinc-300 dark:bg-zinc-800 rounded-lg w-32" />
              </div>

              <div className="space-y-3 max-w-2xl">
                <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded w-full" />
                <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded w-5/6" />
              </div>

              <div className="h-14 bg-zinc-300 dark:bg-zinc-800 rounded-2xl w-48 mx-auto md:mx-0" />
            </div>

            {/* Rating Skeleton */}
            <div className="hidden lg:flex flex-col items-end pt-2 space-y-2">
              <div className="h-12 bg-zinc-300 dark:bg-zinc-800 rounded-xl w-24" />
              <div className="h-3 bg-zinc-300 dark:bg-zinc-800 rounded w-20" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="max-w-8xl mx-auto px-6 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          
          <div className="lg:col-span-3 space-y-16">
            
            {/* Cast Slider Skeleton (Matching your CastSlider design) */}
            <section className="py-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-32" />
                <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800" />
              </div>
              <div className="flex gap-5 overflow-hidden">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="min-w-[150px] flex-1">
                    <div className="bg-zinc-900/40 rounded-2xl border border-white/5 overflow-hidden">
                      <div className="aspect-[3/4] bg-zinc-200 dark:bg-zinc-800 w-full" />
                      <div className="p-4 space-y-2 text-center">
                        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 mx-auto" />
                        <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2 mx-auto" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Interaction Box */}
            <div className="h-24 bg-zinc-50 dark:bg-zinc-900/20 rounded-[2.5rem] border border-zinc-100 dark:border-white/5" />

            {/* Review Skeleton */}
            <div className="space-y-6">
              <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-40" />
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="h-32 bg-zinc-50 dark:bg-zinc-900/20 rounded-3xl" />
                ))}
              </div>
            </div>
          </div>

          {/* 3. Sidebar (Similar Content) Skeleton (Matching your MovieCard) */}
          <aside className="space-y-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-24" />
              <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800" />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col bg-white dark:bg-zinc-900/20 rounded-[2rem] border border-zinc-200 dark:border-white/5 overflow-hidden">
                  <div className="aspect-[2/3] bg-zinc-200 dark:bg-zinc-800" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default MovieDetailsSkeleton;