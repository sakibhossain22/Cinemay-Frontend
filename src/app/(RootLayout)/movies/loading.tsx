import React from 'react';

const SkeletonCard = () => (
  <div className="flex flex-col bg-white dark:bg-zinc-900/20 rounded-[2rem] border border-zinc-200 dark:border-white/5 overflow-hidden animate-pulse">
    {/* Image Skeleton */}
    <div className="relative aspect-[2/3] bg-zinc-200 dark:bg-zinc-800" />
    
    <div className="p-5 space-y-4">
      {/* Title Skeleton */}
      <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-3/4" />
      
      {/* Genre Skeleton */}
      <div className="flex gap-2">
        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-12" />
        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-12" />
      </div>
      
      {/* Footer Skeleton */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-white/5">
        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-16" />
        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-10" />
      </div>
    </div>
  </div>
);

export default function MediaLibrarySkeleton() {
  return (
    <div className="lg:p-4 p-0 md:p-8 bg-zinc-50 dark:bg-[#020617] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Skeleton */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 animate-pulse">
          <div className="space-y-3">
            <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-64" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-40" />
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
            <div className="h-14 bg-zinc-200 dark:bg-zinc-800 rounded-2xl flex-1 lg:w-80" />
            <div className="h-14 bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-32" />
          </div>
        </div>

        {/* Filters Bar Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-white/[0.02] p-4 rounded-[2.5rem] border border-zinc-200 dark:border-white/5 gap-4 animate-pulse">
          <div className="flex gap-4 w-full sm:w-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-24" />
            ))}
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-32" />
            <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-40" />
          </div>
        </div>

        {/* Media Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-zinc-200 dark:border-white/5 animate-pulse">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-40" />
          <div className="flex gap-3">
            <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-24" />
            <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}