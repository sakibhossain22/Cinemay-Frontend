/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPurchaseHistory } from "@/actions/user.action";
import Countdown from "@/components/user/CountDown";
import { Clock, CreditCard, Film, CheckCircle2, Calendar } from 'lucide-react';
import Image from "next/image";

async function PurchaseHistory() {
  const { success, data } = await getPurchaseHistory();

  if (!success || !data) return <div className="p-10 text-white text-center font-black uppercase tracking-widest">No history found.</div>;

  return (
    <div className="min-h-screen bg-black text-zinc-300 p-4 sm:p-6 md:p-12 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">

        <header className="text-left">
          <h1 className="lg:text-4xl text-2xl md:text-3xl flex items-center gap-3 font-black uppercase tracking-tighter text-white">
            <CreditCard size={35} className="text-emerald-500 flex-shrink-0" />
            <span className="truncate">Billing & <span className="text-emerald-500">History</span></span>
          </h1>
          <p className="text-zinc-500 text-[10px] sm:text-xs lg:text-base mt-2 max-w-md">
            Manage your movie purchases and active subscriptions.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">

          {/* Left Column: Movies & Rentals */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 mb-4 border-l-2 border-blue-500 pl-4">
              <Film className="text-blue-500 flex-shrink-0" size={20} />
              <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight">Movies & Rentals</h2>
            </div>

            <div className="grid gap-4">
              {data.movies.map((item: any) => (
                <div key={item.id} className="bg-zinc-900/40 border border-white/5 p-3 sm:p-4 rounded-2xl flex flex-col sm:flex-row gap-4 hover:border-zinc-700 transition-all group relative">
                  
                  {/* Poster Section */}
                  <div className="relative h-48 sm:h-32 w-full sm:w-24 flex-shrink-0 overflow-hidden rounded-xl border border-white/10">
                    <Image 
                      width={400} 
                      height={700} 
                      src={item.movie.posterUrl} 
                      alt={item.movie.title} 
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute top-2 right-2 sm:top-1 sm:right-1">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase shadow-xl ${item.type === 'BUY' ? 'bg-green-500 text-black' : 'bg-blue-600 text-white'}`}>
                        {item.type}
                      </span>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight mb-1">{item.movie.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
                        <span>{item.movie.releaseYear}</span>
                        <span className="text-zinc-800">•</span>
                        <span className="truncate">{item.movie.genre[0]}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 mt-4 sm:mt-0">
                      <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg">
                        <CreditCard size={14} className="text-zinc-600" />
                        <span className="text-sm font-black text-white">${item.amount}</span>
                      </div>

                      {item.type === 'RENT' && item.expiresAt && (
                        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg w-full sm:w-auto justify-center sm:justify-start">
                          <Clock size={12} className="text-amber-500 flex-shrink-0" />
                          <div className="text-xs font-bold text-amber-200">
                             <Countdown expiresAt={item.expiresAt} />
                          </div>
                        </div>
                      )}

                      {item.type === 'BUY' && (
                        <div className="flex items-center gap-1 text-[10px] text-emerald-500 uppercase font-black tracking-widest">
                          <CheckCircle2 size={12} className="flex-shrink-0" />
                          Lifetime Access
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Active Plan */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4 border-l-2 border-emerald-500 pl-4">
              <CreditCard className="text-emerald-500 flex-shrink-0" size={20} />
              <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight">Active Plan</h2>
            </div>

            {data.userSubscriptions.map((sub: any) => (
              <div key={sub.id} className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 sm:p-8 rounded-[2rem] text-white shadow-2xl shadow-emerald-900/20 overflow-hidden group">
                <div className="absolute -right-4 -top-4 text-white/10 group-hover:rotate-12 transition-transform duration-700 select-none">
                  <CheckCircle2 size={120} />
                </div>

                <div className="relative z-10 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-emerald-100 text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Premium Member</p>
                      <h3 className="text-2xl sm:text-3xl font-black italic tracking-tighter">PRO CLUB</h3>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                      <CreditCard size={20} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-emerald-100 text-[10px] uppercase font-bold opacity-60">Amount Paid</p>
                    <p className="text-3xl font-black tabular-nums">${sub.amount} <span className="text-xs font-normal opacity-60 tracking-normal uppercase">/ {sub.currency}</span></p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    <Calendar size={14} className="opacity-70 flex-shrink-0" />
                    <p className="text-[11px] font-bold italic opacity-90 uppercase tracking-tighter">
                      Activated: {new Date(sub.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="bg-black/30 p-4 rounded-2xl border border-white/5 group-hover:bg-black/40 transition-colors">
                    <p className="text-[9px] opacity-40 mb-1 uppercase font-black tracking-widest">Digital Transaction ID</p>
                    <p className="text-[10px] font-mono break-all opacity-70 leading-relaxed tracking-tighter">{sub.transactionId}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-[2rem] space-y-4 backdrop-blur-sm">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1 h-3 bg-emerald-500 rounded-full" />
                Subscription Perks
              </h4>
              <ul className="space-y-4">
                {['4K Ultra HD Streaming', 'No Advertisements', 'Multi-device Access', 'Early Content Access'].map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-xs text-zinc-400 font-bold group">
                    <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-zinc-200 transition-colors">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PurchaseHistory;