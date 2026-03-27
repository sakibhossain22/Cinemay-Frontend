/* eslint-disable @typescript-eslint/no-explicit-any */
import { adminStatistics } from '@/actions/adminAction';
import React from 'react';
import {
  Users,
  Film,
  DollarSign,
  TrendingUp,
  MessageSquare,
  PlayCircle,
  Star,
  Smartphone
} from 'lucide-react';

async function AdminStats() {
  const response = await adminStatistics();

  // API response structure অনুযায়ী ডাটা এক্সট্রাক্ট করা
  const stats = response?.data?.data;

  if (!stats) return <div className="p-10 text-white">Loading stats...</div>;

  const { summary, contentInsights, engagement, technical } = stats;

  return (
    <div className="p-6 space-y-8 bg-black min-h-screen text-white">
      <header className='flex items-center gap-3'>
        <TrendingUp className="text-emerald-500 mb-4" size={40} />
        <div>
          <h1 className="text-3xl uppercase font-black uppercase tracking-tight">
            Dashboard Overview</h1>
          <p className="text-zinc-500 text-sm">Real-time platform performance and insights.</p>
        </div>
      </header>

      {/* 1. Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={summary.totalUsers}
          subValue={`${summary.premiumUsers} Premium`}
          icon={<Users className="text-blue-500" />}
        />
        <StatCard
          title="Total Revenue"
          value={`$${summary.totalRevenue}`}
          subValue={`${summary.revenueGrowth} Growth`}
          icon={<DollarSign className="text-emerald-500" />}
          isTrend={true}
        />
        <StatCard
          title="Total Movies"
          value={summary.totalMovies}
          subValue={contentInsights.distribution[0]?.type || "Content"}
          icon={<Film className="text-purple-500" />}
        />
        <StatCard
          title="Active Rentals"
          value={summary.activeRentals}
          subValue="Current streams"
          icon={<PlayCircle className="text-rose-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Engagement Stats */}
        <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-3xl space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">User Engagement</h2>
          <div className="space-y-4">
            <EngagementItem
              label="Watchlist Items"
              value={engagement.totalWatchlistItems}
              icon={<Star size={16} />}
            />
            <EngagementItem
              label="Total Reviews"
              value={engagement.totalReviews}
              icon={<MessageSquare size={16} />}
            />
            <EngagementItem
              label="Total Comments"
              value={summary.totalComments}
              icon={<MessageSquare size={16} />}
            />
          </div>
        </div>

        {/* 3. Technical/Device Usage */}
        <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-3xl space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Device Traffic</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-zinc-800 rounded-2xl">
                <Smartphone size={24} className="text-zinc-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-bold uppercase">Main Source</p>
                <p className="text-lg font-black">{technical.deviceUsage[0]?.count || 0} Sessions</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[70%]" />
          </div>
        </div>

        {/* 4. Quick Actions/Status */}
        <div className="bg-gradient-to-br from-emerald-600/20 to-transparent border border-emerald-500/10 p-6 rounded-3xl flex flex-col justify-center items-center text-center">
          <TrendingUp className="text-emerald-500 mb-4" size={40} />
          <h3 className="font-bold text-lg">System Health</h3>
          <p className="text-zinc-500 text-xs px-4">All services are running smoothly. Database synchronized.</p>
          <button className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase hover:bg-emerald-500 transition-all">
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function StatCard({ title, value, icon, subValue, isTrend = false }: any) {
  return (
    <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-3xl hover:bg-white/[0.02] transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-zinc-900 rounded-xl border border-white/5 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-3xl font-black text-white mb-1">{value}</h3>
      <p className={`text-[10px] font-bold uppercase ${isTrend ? 'text-emerald-500' : 'text-zinc-600'}`}>
        {subValue}
      </p>
    </div>
  );
}

function EngagementItem({ label, value, icon }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
      <div className="flex items-center gap-3">
        <span className="text-zinc-500">{icon}</span>
        <span className="text-xs font-bold text-zinc-300">{label}</span>
      </div>
      <span className="text-sm font-black text-white">{value}</span>
    </div>
  );
}

export default AdminStats;