import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505]">
      <div className="max-w-[1600px] mx-auto">
        
        {/* ১. টপ ব্যাক বাটন সেকশন */}
        <div className="p-4 lg:px-6">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-24 animate-pulse" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-6 pb-10">
          
          {/* ২. লেফট সাইড: ভিডিও এবং মেইন কন্টেন্ট */}
          <div className="flex-1 space-y-6">
            
            {/* ভিডিও প্লেয়ার স্কেলিটন (High Visibility) */}
            <div className="relative w-full aspect-video rounded-2xl bg-zinc-200 dark:bg-zinc-800/80 animate-pulse flex items-center justify-center border border-zinc-300 dark:border-zinc-700 shadow-xl overflow-hidden">
              {/* প্লে আইকন সিম্বল */}
              <div className="w-16 h-16 rounded-full bg-zinc-300/50 dark:bg-zinc-700/50" />
            </div>

            {/* টাইটেল এবং মেটা ডাটা */}
            <div className="border-b border-zinc-200 dark:border-zinc-800/50 pb-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-20 animate-pulse" />
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-16 animate-pulse" />
              </div>
              <div className="h-10 bg-zinc-300 dark:bg-zinc-800/60 rounded-xl w-3/4 animate-pulse" />
            </div>

            {/* সিনোপসিস বক্স */}
            <div className="bg-zinc-100/80 dark:bg-zinc-900/40 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-zinc-300 dark:bg-zinc-800 rounded-full animate-pulse" />
                <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded w-32 animate-pulse" />
              </div>
              
              <div className="space-y-3">
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800/80 rounded w-full animate-pulse" />
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800/80 rounded w-11/12 animate-pulse" />
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800/80 rounded w-4/5 animate-pulse" />
              </div>

              {/* জনরা ব্যাজ */}
              <div className="flex flex-wrap gap-2 mt-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-7 bg-zinc-300 dark:bg-zinc-800 rounded-full w-20 animate-pulse shadow-sm" />
                ))}
              </div>
            </div>
          </div>

          {/* ৩. রাইট সাইড: সাইডবার (Related & Info) */}
          <div className="flex flex-col gap-6 w-full lg:w-[350px]">
            
            {/* Related Movies Sidebar */}
            <div className="bg-zinc-50 dark:bg-zinc-900/30 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded w-28 mb-6 animate-pulse" />
              <div className="flex flex-col gap-5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-16 h-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl shrink-0 animate-pulse" />
                    <div className="flex-1 space-y-3 pt-2">
                      <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-full animate-pulse" />
                      <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Movie Info Card */}
            <div className="bg-zinc-50 dark:bg-zinc-900/30 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-6">
              <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded w-24 mb-2 animate-pulse" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-16 animate-pulse" />
                  <div className="h-3 bg-zinc-300 dark:bg-zinc-800 rounded w-32 ml-4 animate-pulse" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}