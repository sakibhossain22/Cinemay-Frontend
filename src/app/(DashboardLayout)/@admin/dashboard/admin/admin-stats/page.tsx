/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { adminStatistics } from '@/actions/adminAction';
import React from 'react';
import {
  Users, Film, DollarSign, TrendingUp, TrendingDown,
  MessageSquare, PlayCircle, Star, Smartphone, 
  ArrowUpRight, Clock, ShieldCheck, Globe
} from 'lucide-react';

async function AdminStats() {
  const response = await adminStatistics();
  const stats = response?.data?.data;

  if (!stats) return (
    <div className="flex h-screen items-center justify-center bg-black text-emerald-500 font-mono animate-pulse">
      [LOADING_SYSTEM_DATA...]
    </div>
  );

  const { summary, contentInsights, engagement, recentActivities, technical } = stats;

  return (
    <div className="p-4 md:p-8 space-y-8 bg-[#050505] min-h-screen text-zinc-300 selection:bg-emerald-500/30">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase ">
            Admin <span className="text-emerald-500"> Statistics</span>
          </h1>
          <p className="text-zinc-500 text-sm font-medium">Cinemay : <span className="text-emerald-400">All Stats</span></p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-zinc-900 border border-white/5 rounded-full text-xs font-bold flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            Live Revenue: ${summary.totalRevenue}
          </div>
        </div>
      </header>

      {/* --- TOP SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value={`$${summary.totalRevenue}`}
          subValue={summary.revenueGrowth}
          icon={<DollarSign className="text-emerald-400" />}
          trend={summary.revenueGrowth.includes('-') ? 'down' : 'up'}
        />
        <StatCard
          title="Platform Users"
          value={summary.totalUsers}
          subValue={`${summary.premiumUsers} Premium Members`}
          icon={<Users className="text-blue-400" />}
          trend="up"
        />
        <StatCard
          title="Library Size"
          value={summary.totalMovies}
          subValue={`${contentInsights.distribution[0]?.count} Movies Live`}
          icon={<Film className="text-purple-400" />}
        />
        <StatCard
          title="User Interaction"
          value={engagement.totalReviews + summary.totalComments}
          subValue={`${engagement.totalReviews} Reviews / ${summary.totalComments} Comments`}
          icon={<MessageSquare className="text-amber-400" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- CONTENT DISTRIBUTION (LHS) --- */}
        <div className="lg:col-span-1 bg-zinc-900/30 border border-white/5 rounded-[2rem] p-6 backdrop-blur-xl">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <PlayCircle size={20} className="text-emerald-500" /> Content Mix
          </h2>
          <div className="space-y-5">
            {contentInsights.distribution.map((item: any, i: number) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                  <span>{item.type}</span>
                  <span className="text-white">{item.count}</span>
                </div>
                <div className="w-full bg-zinc-800/50 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${i === 0 ? 'bg-emerald-500' : i === 1 ? 'bg-blue-500' : 'bg-purple-500'}`} 
                    style={{ width: `${(item.count / summary.totalMovies) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
             <div className="flex items-center gap-3">
                <Globe size={20} className="text-emerald-500" />
                <div>
                   <p className="text-xs font-bold text-emerald-500 uppercase">Traffic Source</p>
                   <p className="text-sm text-zinc-400">{technical.deviceUsage[1]?.browser || "Unknown Browser"}</p>
                </div>
             </div>
          </div>
        </div>

        {/* --- TOP PERFORMING MOVIES (CENTER) --- */}
        <div className="lg:col-span-2 bg-zinc-900/30 border border-white/5 rounded-[2rem] p-6">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Star size={20} className="text-amber-500" /> Top Performing Media
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contentInsights.topPerforming.map((movie: any) => (
              <div key={movie.id} className="flex gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all">
                <img src={movie.poster} alt={movie.title} className="w-16 h-24 rounded-lg object-cover shadow-2xl" />
                <div className="flex flex-col justify-center">
                  <h3 className="text-sm font-bold text-white line-clamp-1">{movie.title}</h3>
                  <p className="text-xs text-zinc-500 mb-2">{movie.totalSales} Sales</p>
                  <p className="text-emerald-400 font-black tracking-tighter">${movie.totalRevenue}</p>
                </div>
              </div>
            ))}
          </div>

          {/* --- RECENT TRANSACTIONS TABLE --- */}
          <div className="mt-8">
            <h3 className="text-xs font-black uppercase text-zinc-600 tracking-[0.2em] mb-4">Recent Ledger</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase text-zinc-500 border-b border-white/5">
                    <th className="pb-3 font-bold">User</th>
                    <th className="pb-3 font-bold">Method</th>
                    <th className="pb-3 font-bold">Amount</th>
                    <th className="pb-3 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentActivities.payments.slice(0, 4).map((pay: any) => (
                    <tr key={pay.id} className="group">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <img src={pay.user.image || "https://avatar.iran.liara.run/public"} className="w-6 h-6 rounded-full border border-white/10" alt="" />
                          <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">{pay.user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-[10px] font-mono text-zinc-500">{pay.method}</td>
                      <td className="py-3 text-xs font-black text-white">${pay.amount}</td>
                      <td className="py-3 text-right">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          {pay.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{/* --- MINI COMPONENTS --- */}

function StatCard({ title, value, icon, subValue, trend }: any) {
  return (
    <div className="relative overflow-hidden bg-zinc-900/30 border border-white/5 p-6 rounded-[2rem] hover:border-emerald-500/30 transition-all group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {React.cloneElement(icon, { size: 80 })}
      </div>
      <div className="relative z-10">
        <div className="mb-4 inline-flex p-3 bg-zinc-900 rounded-2xl border border-white/5 group-hover:scale-110 group-hover:border-emerald-500/50 transition-all">
          {icon}
        </div>
        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-black text-white tracking-tighter">{value}</h3>
          {trend && (
            <span className={`flex items-center text-[10px] font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
              {trend === 'up' ? <ArrowUpRight size={12} /> : <TrendingDown size={12} />}
              {subValue}
            </span>
          )}
        </div>
        {!trend && <p className="text-[10px] font-bold text-zinc-600 uppercase mt-1">{subValue}</p>}
      </div>
    </div>
  );
}

export default AdminStats;