"use client";

import { Smartphone, Apple, Play } from "lucide-react";
import { Button } from "../ui/button";

export const AppDownloadBanner = () => {
  return (
    <section className="py-12 my-8 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600/20 via-black to-black border border-emerald-500/10 relative">
      
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>

      <div className="container mx-auto px-8 lg:px-16 flex flex-col lg:flex-row items-center gap-12">
        
        <div className="flex-1 text-center lg:text-left space-y-6 z-10 lg:pr-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-medium">
            <Smartphone className="w-4 h-4" />
            <span>Mobile App coming soon</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Take Your Movies <br /> 
            <span className="text-emerald-500">Everywhere You Go</span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0">
            Download the Cinemay app to stream your favorite movies and series offline, 
            get personalized notifications, and enjoy a seamless mobile experience.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            <Button className="bg-white hover:bg-gray-100 text-black px-6 py-7 rounded-xl flex items-center gap-3 transition-transform hover:scale-105">
              <Play className="w-8 h-8 fill-black" />
              <div className="text-left">
                <p className="text-[10px] uppercase leading-none">Get it on</p>
                <p className="text-xl font-bold leading-none">Google Play</p>
              </div>
            </Button>

            <Button className="bg-transparent border border-white/20 hover:bg-white/5 text-white px-6 py-7 rounded-xl flex items-center gap-3 transition-transform hover:scale-105">
              <Apple className="w-8 h-8 fill-current" />
              <div className="text-left">
                <p className="text-[10px] uppercase leading-none">Download on the</p>
                <p className="text-xl font-bold leading-none">App Store</p>
              </div>
            </Button>
          </div>
        </div>

        <div className="flex-1 relative w-full flex justify-center lg:justify-end items-center z-10 lg:translate-x-10">
          
          <div className="relative w-[300px] h-[600px] bg-zinc-900 border-[10px] border-zinc-800 rounded-[3.5rem] shadow-[0_0_60px_rgba(16,185,129,0.15)] overflow-hidden transform rotate-6 hover:rotate-0 transition-transform duration-500 animate-float">
             
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-zinc-800 rounded-b-2xl z-20 flex items-center justify-center">
                <div className="w-10 h-1 bg-zinc-700 rounded-full"></div>
             </div>

             <div className="w-full h-full bg-gradient-to-b from-emerald-900/50 to-black p-5 flex flex-col gap-5 pt-16">
                <div className="w-full h-40 bg-emerald-500/10 rounded-2xl animate-pulse flex items-center justify-center border border-emerald-500/20">
                    <span className="text-emerald-500 font-bold text-3xl">C</span>
                </div>
                <div className="space-y-3">
                    <div className="w-full h-5 bg-white/10 rounded-full"></div>
                    <div className="w-2/3 h-5 bg-white/5 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-4">
                    <div className="w-full h-32 bg-white/5 rounded-2xl animate-pulse"></div>
                    <div className="w-full h-32 bg-white/5 rounded-2xl animate-pulse"></div>
                </div>
                <div className="w-full h-12 bg-emerald-500/20 rounded-xl mt-auto"></div>
             </div>
          </div>
          
          <div className="absolute w-[280px] h-[580px] bg-zinc-900 border-[10px] border-zinc-800 rounded-[3.5rem] shadow-2xl overflow-hidden -translate-x-32 translate-y-16 -rotate-12 hidden xl:block opacity-30 blur-[1px]">
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(6deg);
          }
          50% {
            transform: translateY(-20px) rotate(8deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};