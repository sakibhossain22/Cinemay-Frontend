"use client";

import { Play } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full space-y-6">
      <div className="relative flex items-center justify-center">
        
        <div className="w-24 h-24 rounded-full border-t-4 border-b-4 border-emerald-500/20 border-l-4 border-r-4 animate-spin border-t-emerald-500 border-b-emerald-500"></div>
        
        <div className="absolute w-16 h-16 bg-emerald-500/10 rounded-full blur-xl animate-pulse"></div>

        <div className="absolute flex items-center justify-center bg-zinc-900 border border-white/10 w-14 h-14 rounded-full shadow-2xl animate-bounce-slow">
          <Play className="w-6 h-6 text-emerald-500 fill-emerald-500" />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold text-white tracking-widest uppercase">
          Loading<span className="animate-pulse text-emerald-500">...</span>
        </h3>
        <p className="text-gray-500 text-sm font-medium">Preparing your cinema experience</p>
      </div>

      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;