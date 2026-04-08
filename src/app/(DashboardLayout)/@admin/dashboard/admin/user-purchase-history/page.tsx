/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllPaymentHistory } from '@/actions/adminAction';
import React from 'react';
import { 
  CircleDollarSign, 
  CreditCard, 
  Film, 
  TrendingUp, 
  ArrowUpRight, 
  Clock 
} from 'lucide-react';

async function UserPurchaseHistory() {
    const { success, data, error } = await getAllPaymentHistory();

    if (!success || !data) {
        return (
            <div className="p-10 text-zinc-900 dark:text-white bg-transparent min-h-screen">
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500">
                    No purchase history found. {error && <span>Error: {error}</span>}
                </div>
            </div>
        );
    }

    const { payments, stats } = data;
    const subscriptionPayments = payments.filter((p: any) => p.method === "STRIPE_USER_SUBSCRIPTION");
    const moviePayments = payments.filter((p: any) => p.method === "STRIPE");

    return (
        <div className="p-4 md:p-10 bg-transparent min-h-screen text-zinc-600 dark:text-zinc-400 font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-10">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard 
                        title="Total Revenue" 
                        value={`$${stats.totalRevenue}`} 
                        icon={<CircleDollarSign className="text-emerald-600 dark:text-emerald-500" />} 
                        color="emerald"
                    />
                    <StatCard 
                        title="Buy Revenue" 
                        value={`$${stats.buyRevenue}`} 
                        icon={<TrendingUp className="text-blue-600 dark:text-blue-500" />} 
                        color="blue"
                    />
                    <StatCard 
                        title="Rent Revenue" 
                        value={`$${stats.rentRevenue}`} 
                        icon={<Clock className="text-amber-600 dark:text-amber-500" />} 
                        color="amber"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    
                    {/* Subscriptions Section */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-500"><CreditCard size={20} /></div>
                                <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight uppercase italic">Subscriptions</h2>
                            </div>
                            <span className="text-[10px] font-black bg-zinc-100 dark:bg-zinc-900 text-zinc-500 px-3 py-1 rounded-full uppercase tracking-widest">{subscriptionPayments.length} Total</span>
                        </div>

                        <div className="space-y-4">
                            {subscriptionPayments.map((payment: any) => (
                                <div key={payment.id} className="group bg-white dark:bg-zinc-900/30 border border-zinc-100 dark:border-white/5 p-5 rounded-3xl hover:border-blue-500/30 transition-all shadow-sm dark:shadow-none">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black shadow-md">
                                                {payment.user.name[0]}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{payment.user.name}</h4>
                                                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">{payment.user.email}</p>
                                            </div>
                                        </div>
                                        <span className="text-lg font-black text-zinc-900 dark:text-white">${payment.amount}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[9px] uppercase tracking-widest font-black pt-2 border-t border-zinc-50 dark:border-white/5">
                                        <div className="flex items-center gap-2 text-zinc-400">
                                            <Clock size={12} />
                                            {new Date(payment.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="text-blue-600 dark:text-blue-500 flex items-center gap-1">
                                            <ArrowUpRight size={12} /> PRO PLAN
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Movie Payments Table Section */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600 dark:text-emerald-500"><Film size={20} /></div>
                                <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight uppercase italic">Purchases</h2>
                            </div>
                            <span className="text-[10px] font-black bg-zinc-100 dark:bg-zinc-900 text-zinc-500 px-3 py-1 rounded-full uppercase tracking-widest">{moviePayments.length} Total</span>
                        </div>

                        <div className="bg-white dark:bg-zinc-900/20 border border-zinc-200 dark:border-white/5 rounded-[2rem] overflow-hidden shadow-sm dark:shadow-none">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-zinc-50 dark:bg-white/5 text-[10px] uppercase tracking-wider font-black text-zinc-500">
                                    <tr>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
                                    {moviePayments.map((payment: any) => (
                                        <tr key={payment.id} className="hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-bold text-zinc-800 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{payment.user.name}</div>
                                                <div className="text-[10px] text-zinc-400 font-mono mt-0.5">{payment.transactionId.slice(0, 15)}...</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-black text-zinc-900 dark:text-white">${payment.amount}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-500/20">
                                                    {payment.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) {
    const colors: any = {
        emerald: "from-emerald-500/10 dark:from-emerald-500/20 to-transparent border-emerald-200 dark:border-emerald-500/20",
        blue: "from-blue-500/10 dark:from-blue-500/20 to-transparent border-blue-200 dark:border-blue-500/20",
        amber: "from-amber-500/10 dark:from-amber-500/20 to-transparent border-amber-200 dark:border-amber-500/20",
    };

    return (
        <div className={`bg-gradient-to-br ${colors[color]} bg-white dark:bg-zinc-900/20 border p-6 rounded-[2rem] flex items-center justify-between shadow-sm dark:shadow-2xl`}>
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-1">{title}</p>
                <h3 className="text-3xl font-black text-zinc-900 dark:text-white italic tracking-tighter">{value}</h3>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-white/5 shadow-inner">
                {icon}
            </div>
        </div>
    );
}

export default UserPurchaseHistory;