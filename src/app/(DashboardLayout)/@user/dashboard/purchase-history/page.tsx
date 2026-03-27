/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPurchaseHistory } from "@/actions/user.action";
import Countdown from "@/components/user/CountDown";
import { Clock, CreditCard, Film, CheckCircle2, Calendar } from 'lucide-react';
import Image from "next/image";

async function PurchaseHistory() {
  const { success, data } = await getPurchaseHistory();

  if (!success || !data) return <div className="p-10 text-white">No history found.</div>;

  return (
    <div className="min-h-screen bg-black text-zinc-300 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <header className="">

          <h1 className="text-4xl flex items-center gap-2 font-black uppercase tracking-tighter text-white">
            <CreditCard size={35} className="text-emerald-500" />
            Billing & <span className="text-emerald-500">History</span>

          </h1>
          <p className="text-zinc-500 mt-2">Manage your movie purchases and active subscriptions.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left Column: Purchased Movies (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Film className="text-blue-500" size={20} />
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">Movies & Rentals</h2>
            </div>

            <div className="grid gap-4">
              {data.movies.map((item: any) => (
                <div key={item.id} className="bg-zinc-900/40 border border-white/5 p-4 rounded-2xl flex gap-4 hover:border-zinc-700 transition-all group">
                  <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-white/10">
                    <Image width={400} height={700} src={item.movie.posterUrl} alt={item.movie.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-1 right-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${item.type === 'BUY' ? 'bg-green-500 text-black' : 'bg-blue-600 text-white'}`}>
                        {item.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight">{item.movie.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                        <span>{item.movie.releaseYear}</span>
                        <span>•</span>
                        <span>{item.movie.genre[0]}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <CreditCard size={14} className="text-zinc-600" />
                        <span className="text-sm font-bold text-white">${item.amount}</span>
                      </div>

                      {item.type === 'RENT' && item.expiresAt && (
                        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
                          <Clock size={12} className="text-amber-500" />
                          <Countdown expiresAt={item.expiresAt} />
                        </div>
                      )}

                      {item.type === 'BUY' && (
                        <div className="flex items-center gap-1 text-[10px] text-zinc-600 uppercase font-bold tracking-widest">
                          <CheckCircle2 size={12} className="text-green-500" />
                          Lifetime Access
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Subscriptions (1/3 width) */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="text-blue-500" size={20} />
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">Active Plan</h2>
            </div>

            {data.userSubscriptions.map((sub: any) => (
              <div key={sub.id} className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 rounded-[2.5rem] text-white shadow-2xl shadow-blue-900/20 overflow-hidden group">
                <div className="absolute -right-4 -top-4 text-white/10 group-hover:rotate-12 transition-transform duration-700">
                  <CheckCircle2 size={120} />
                </div>

                <div className="relative z-10 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-blue-200 text-xs font-black uppercase tracking-widest">Premium Member</p>
                      <h3 className="text-3xl font-black italic">PRO CLUB</h3>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl">
                      <CreditCard size={20} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-blue-100 text-xs opacity-70">Amount Paid</p>
                    <p className="text-2xl font-bold">${sub.amount} <span className="text-sm font-normal opacity-60">/ {sub.currency}</span></p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    <Calendar size={14} className="opacity-70" />
                    <p className="text-[11px] font-medium italic opacity-80">
                      Started: {new Date(sub.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="bg-black/20 p-3 rounded-2xl">
                    <p className="text-[10px] opacity-50 mb-1 uppercase font-bold tracking-tighter">Transaction ID</p>
                    <p className="text-[10px] font-mono break-all opacity-80">{sub.transactionId}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl space-y-4">
              <h4 className="text-sm font-bold text-white uppercase">Subscription Perks</h4>
              <ul className="space-y-3">
                {['4K Ultra HD Streaming', 'No Advertisements', 'Multi-device Access', 'Early Content Access'].map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-xs text-zinc-500">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    {perk}
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