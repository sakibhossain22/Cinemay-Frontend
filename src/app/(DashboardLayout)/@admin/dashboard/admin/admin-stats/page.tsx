/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { adminStatistics } from '@/actions/adminAction';
import React, { useEffect, useState } from 'react';
import {
  Users, Film, DollarSign, TrendingDown,
  MessageSquare, PlayCircle, Star,
  ArrowUpRight, Globe
} from 'lucide-react';
import {
  XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid
} from 'recharts';

function AdminStats() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function fetchStats() {
      const response = await adminStatistics();
      setStats(response?.data?.data);
    }
    fetchStats();
  }, []);

  if (!stats) return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-black text-emerald-500 font-mono animate-pulse">
      [LOADING_SYSTEM_DATA....]
    </div>
  );

  const { summary, contentInsights, engagement, recentActivities, technical } = stats;

  // --- Process Data for Dual Line Chart ---
  const processedChartData = recentActivities?.payments?.reduce((acc: any[], curr: any) => {
    const date = new Date(curr.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const existing = acc.find(item => item.name === date);
    if (existing) {
      existing.revenue += curr.amount;
      existing.sales += 1; // প্রতিদিনের মোট সেল সংখ্যা
    } else {
      acc.push({ name: date, revenue: curr.amount, sales: 1 });
    }
    return acc;
  }, []) || [];

  const finalChartData = processedChartData.sort((a:any, b:any) => new Date(a.name).getTime() - new Date(b.name).getTime());

  return (
    <div className="p-4 md:p-8 space-y-8 bg-zinc-50 dark:bg-[#050505] min-h-screen text-zinc-600 dark:text-zinc-300 selection:bg-emerald-500/30 transition-colors duration-300">

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase ">
            Admin <span className="text-emerald-500"> Statistics</span>
          </h1>
          <p className="text-zinc-500 text-sm font-medium">Cinemay : <span className="text-emerald-400">Live Statistics</span></p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm dark:shadow-none">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-zinc-900 dark:text-zinc-100">Live Revenue: ${summary?.totalRevenue?.toFixed(2)}</span>
          </div>
        </div>
      </header>

      {/* --- ২ টি লাইন সহ চার্ট সেকশন (Revenue & Sales) --- */}
      <div className="w-full bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 rounded-[2.5rem] p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">Performance Matrix</h2>
            <p className="text-2xl font-black text-zinc-900 dark:text-white tracking-tighter">Revenue vs Total Sales</p>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-emerald-500 rounded-full" />
              <span className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">Revenue ($)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-blue-500 rounded-full" />
              <span className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">Sales (Count)</span>
            </div>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={finalChartData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" opacity={0.1} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#71717a', fontSize: 10, fontWeight: 'bold' }}
                dy={10}
              />
              <YAxis hide />
              <Tooltip
                cursor={{ stroke: '#27272a', strokeWidth: 1 }}
                contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '16px', fontSize: '12px' }}
                itemStyle={{ fontWeight: 'bold' }}
              />
              {/* Line 1: Revenue */}
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#10b981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRev)"
              />
              {/* Line 2: Sales Count */}
              <Area
                type="monotone"
                dataKey="sales"
                name="Total Sales"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* StatCards and rest of the code remains same as per your design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value={`$${summary?.totalRevenue?.toFixed(2)}`}
          subValue={summary.revenueGrowth}
          icon={<DollarSign className="text-emerald-500 dark:text-emerald-400" />}
          trend={summary.revenueGrowth.includes('-') ? 'down' : 'up'}
        />
        <StatCard
          title="Platform Users"
          value={summary.totalUsers}
          subValue={`${summary.premiumUsers} Premium Members`}
          icon={<Users className="text-blue-600 dark:text-blue-400" />}
          trend="up"
        />
        <StatCard
          title="Library Size"
          value={summary.totalMovies}
          subValue={`${contentInsights.distribution[0]?.count} Movies Live`}
          icon={<Film className="text-purple-600 dark:text-purple-400" />}
        />
        <StatCard
          title="User Interaction"
          value={engagement.totalReviews + summary.totalComments}
          subValue={`${engagement.totalReviews} Reviews / ${summary.totalComments} Comments`}
          icon={<MessageSquare className="text-amber-600 dark:text-amber-400" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 rounded-[2rem] p-6 backdrop-blur-xl shadow-sm dark:shadow-none">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
            <PlayCircle size={20} className="text-emerald-500" /> Content Mix
          </h2>
          <div className="space-y-5">
            {contentInsights.distribution.map((item: any, i: number) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  <span>{item.type}</span>
                  <span className="text-zinc-900 dark:text-white">{item.count}</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800/50 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${i === 0 ? 'bg-emerald-500' : i === 1 ? 'bg-blue-500' : 'bg-purple-500'}`}
                    style={{ width: `${(item.count / summary.totalMovies) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-4 bg-emerald-500/5 dark:bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
            <div className="flex items-center gap-3">
              <Globe size={20} className="text-emerald-500" />
              <div>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase">Traffic Source</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{technical.deviceUsage[1]?.browser || "Unknown Browser"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 rounded-[2rem] p-6 shadow-sm dark:shadow-none">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
            <Star size={20} className="text-amber-500" /> Top Performing Media
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contentInsights.topPerforming.map((movie: any) => (
              <div key={movie.id} className="flex gap-4 p-3 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-100 dark:border-white/5 hover:bg-zinc-100 dark:hover:bg-white/[0.05] transition-all">
                <img src={movie.poster} alt={movie.title} className="w-16 h-24 rounded-lg object-cover shadow-lg dark:shadow-2xl" />
                <div className="flex flex-col justify-center">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-1">{movie.title}</h3>
                  <p className="text-xs text-zinc-500 mb-2">{movie.totalSales} Sales</p>
                  <p className="text-emerald-600 dark:text-emerald-400 font-black tracking-tighter">${movie.totalRevenue}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xs font-black uppercase text-zinc-400 dark:text-zinc-600 tracking-[0.2em] mb-4">Recent Ledger</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-white/5">
                    <th className="pb-3 font-bold">User</th>
                    <th className="pb-3 font-bold">Method</th>
                    <th className="pb-3 font-bold">Amount</th>
                    <th className="pb-3 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
                  {recentActivities.payments.slice(0, 4).map((pay: any) => (
                    <tr key={pay.id} className="group">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          {pay?.user?.image ? (
                            <img
                              src={pay.user.image}
                              className="w-6 h-6 rounded-full border border-zinc-200 dark:border-white/10 object-cover"
                              alt={pay.user.name}
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                              <Users size={12} className="text-zinc-400" />
                            </div>
                          )}
                          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                            {pay?.user?.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-[10px] font-mono text-zinc-400 dark:text-zinc-500">{pay.method}</td>
                      <td className="py-3 text-xs font-black text-zinc-900 dark:text-white">${pay.amount}</td>
                      <td className="py-3 text-right">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-500/20">
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

function StatCard({ title, value, icon, subValue, trend }: any) {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 p-6 rounded-[2rem] hover:border-emerald-500/30 transition-all group shadow-sm dark:shadow-none">
      <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
        {React.cloneElement(icon, { size: 80 })}
      </div>
      <div className="relative z-10">
        <div className="mb-4 inline-flex p-3 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-white/5 group-hover:scale-110 group-hover:border-emerald-500/50 transition-all">
          {icon}
        </div>
        <p className="text-zinc-400 dark:text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter">{value}</h3>
          {trend && (
            <span className={`flex items-center text-[10px] font-bold ${trend === 'up' ? 'text-emerald-600 dark:text-emerald-500' : 'text-rose-600 dark:text-rose-500'}`}>
              {trend === 'up' ? <ArrowUpRight size={12} /> : <TrendingDown size={12} />}
              {subValue}
            </span>
          )}
        </div>
        {!trend && <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase mt-1">{subValue}</p>}
      </div>
    </div>
  );
}

export default AdminStats;