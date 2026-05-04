import React from 'react';

const PlayMovieSkeleton = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] animate-pulse">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Main Player Section Skeleton */}
          <div className="flex-1 lg:pl-4">
            {/* Player Area */}
            <div className="w-full aspect-video bg-zinc-200 dark:bg-zinc-900 shadow-2xl" />

            <div className="p-4 lg:px-0 mt-4 space-y-4">
              {/* Title */}
              <div className="h-8 bg-zinc-200 dark:bg-zinc-900 rounded-lg w-1/3" />
              
              {/* Stats/Badges */}
              <div className="flex gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800/50">
                <div className="h-7 bg-zinc-200 dark:bg-zinc-900 rounded-full w-20" />
                <div className="h-7 bg-zinc-200 dark:bg-zinc-900 rounded-lg w-16" />
                <div className="ml-auto h-9 bg-zinc-200 dark:bg-zinc-900 rounded-full w-32" />
              </div>

              {/* Synopsis Box */}
              <div className="mt-6 bg-zinc-50 dark:bg-zinc-900/30 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/50 space-y-3">
                <div className="h-3 bg-zinc-200 dark:bg-zinc-900 rounded w-full" />
                <div className="h-3 bg-zinc-200 dark:bg-zinc-900 rounded w-5/6" />
                <div className="h-3 bg-zinc-200 dark:bg-zinc-900 rounded w-4/6" />
              </div>
            </div>
          </div>

          {/* Sidebar Section Skeleton */}
          <div className="w-full lg:w-[400px] p-4 lg:pr-6 space-y-6">
            
            {/* Playlist/Related List Container */}
            <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/80">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-24" />
              </div>

              <div className="p-2 space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex gap-3 p-3 border-b border-zinc-200 dark:border-zinc-800/30">
                    <div className="w-24 aspect-video rounded-lg bg-zinc-200 dark:bg-zinc-800 shrink-0" />
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
                      <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Info Items */}
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 p-4 rounded-xl flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-12" />
                    <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlayMovieSkeleton;