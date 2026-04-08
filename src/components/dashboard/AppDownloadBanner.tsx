"use client";

import { Smartphone, Apple, Play } from "lucide-react";
import { Button } from "../ui/button";

export const AppDownloadBanner = () => {
  return (
    <section className="py-12 my-8 overflow-hidden rounded-[2.5rem] bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-emerald-500/10 relative transition-colors duration-300">
      
      {/* Background Gradients adjusted for light/dark */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent dark:from-emerald-600/20 dark:via-black dark:to-black -z-10"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>

      <div className="container mx-auto px-8 lg:px-16 flex flex-col lg:flex-row items-center gap-12">
        
        <div className="flex-1 text-center lg:text-left space-y-6 z-10 lg:pr-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-500 text-xs font-black uppercase tracking-widest">
            <Smartphone className="w-4 h-4" />
            <span>Mobile App coming soon</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white leading-[1.1] tracking-tighter uppercase">
            Take Your Movies <br /> 
            <span className="text-emerald-600 dark:text-emerald-500">Everywhere You Go</span>
          </h2>
          
          <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium max-w-xl mx-auto lg:mx-0">
            Download the Cinemay app to stream your favorite movies and series offline, 
            get personalized notifications, and enjoy a seamless mobile experience.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            <Button className="bg-zinc-900 dark:bg-white hover:bg-black dark:hover:bg-zinc-100 text-white dark:text-black px-6 py-8 rounded-2xl flex items-center gap-3 transition-transform hover:scale-105 shadow-xl">
              <Play className="w-8 h-8 fill-current" />
              <div className="text-left">
                <p className="text-[10px] font-black uppercase leading-none opacity-70">Get it on</p>
                <p className="text-xl font-black leading-none uppercase tracking-tighter">Google Play</p>
              </div>
            </Button>

            <Button className="bg-white dark:bg-transparent border border-zinc-200 dark:border-white/20 hover:bg-zinc-50 dark:hover:bg-white/5 text-zinc-900 dark:text-white px-6 py-8 rounded-2xl flex items-center gap-3 transition-transform hover:scale-105 shadow-lg dark:shadow-none">
              <Apple className="w-8 h-8 fill-current" />
              <div className="text-left">
                <p className="text-[10px] font-black uppercase leading-none opacity-70">Download on the</p>
                <p className="text-xl font-black leading-none uppercase tracking-tighter">App Store</p>
              </div>
            </Button>
          </div>
        </div>

        {/* Phone Mockup Section */}
        <div className="flex-1 relative w-full flex justify-center lg:justify-end items-center z-10 lg:translate-x-10">
          <div className="relative w-[280px] h-[560px] bg-zinc-900 border-[8px] border-zinc-800 dark:border-zinc-800 rounded-[3rem] shadow-2xl overflow-hidden transform rotate-6 hover:rotate-0 transition-transform duration-500 animate-float">
             
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl z-20"></div>

             <div className="w-full h-full bg-gradient-to-b from-emerald-900/40 to-black p-5 flex flex-col gap-5 pt-16">
                <div className="w-full h-32 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                    <span className="text-emerald-500 font-black text-4xl">C</span>
                </div>
                <div className="space-y-3">
                    <div className="w-full h-4 bg-white/10 rounded-full"></div>
                    <div className="w-2/3 h-4 bg-white/5 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-4">
                    <div className="w-full h-28 bg-white/5 rounded-2xl"></div>
                    <div className="w-full h-28 bg-white/5 rounded-2xl"></div>
                </div>
                <div className="w-full h-10 bg-emerald-500/20 rounded-xl mt-auto"></div>
             </div>
          </div>
          
          <div className="absolute w-[260px] h-[540px] bg-zinc-900 border-[8px] border-zinc-800 rounded-[3rem] shadow-2xl overflow-hidden -translate-x-32 translate-y-16 -rotate-12 hidden xl:block opacity-20 blur-[1px]">
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