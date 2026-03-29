/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllPaymentHistory } from '@/actions/adminAction';
import React from 'react';
import { 
  CircleDollarSign, 
  Users, 
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
            <div className="p-10 text-white bg-black min-h-screen">
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
        <div className="p-6 md:p-10 bg-black min-h-screen text-zinc-400 font-sans">
            <div className="max-w-7xl mx-auto space-y-10">
                
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard 
                        title="Total Revenue" 
                        value={`$${stats.totalRevenue}`} 
                        icon={<CircleDollarSign className="text-emerald-500" />} 
                        color="emerald"
                    />
                    <StatCard 
                        title="Buy Revenue" 
                        value={`$${stats.buyRevenue}`} 
                        icon={<TrendingUp className="text-blue-500" />} 
                        color="blue"
                    />
                    <StatCard 
                        title="Rent Revenue" 
                        value={`$${stats.rentRevenue}`} 
                        icon={<Clock className="text-amber-500" />} 
                        color="amber"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    
                    
                    <section className="space-y-6">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><CreditCard size={20} /></div>
                                <h2 className="text-xl font-bold text-white tracking-tight">User Subscriptions</h2>
                            </div>
                            <span className="text-xs font-mono bg-zinc-900 px-3 py-1 rounded-full">{subscriptionPayments.length} Total</span>
                        </div>

                        <div className="space-y-4">
                            {subscriptionPayments.map((payment: any) => (
                                <div key={payment.id} className="group bg-zinc-900/30 border border-white/5 p-5 rounded-3xl hover:bg-zinc-900/50 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                                                {payment.user.name[0]}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{payment.user.name}</h4>
                                                <p className="text-[11px] text-zinc-500">{payment.user.email}</p>
                                            </div>
                                        </div>
                                        <span className="text-lg font-black text-white">${payment.amount}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold">
                                        <div className="flex items-center gap-2 text-zinc-500">
                                            <Calendar size={12} />
                                            {new Date(payment.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="text-blue-500 flex items-center gap-1">
                                            <ArrowUpRight size={12} /> PRO PLAN
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    
                    <section className="space-y-6">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><Film size={20} /></div>
                                <h2 className="text-xl font-bold text-white tracking-tight">Movie Payments</h2>
                            </div>
                            <span className="text-xs font-mono bg-zinc-900 px-3 py-1 rounded-full">{moviePayments.length} Total</span>
                        </div>

                        <div className="bg-zinc-900/20 border border-white/5 rounded-[2rem] overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-white/5 text-[10px] uppercase tracking-wider font-black text-zinc-500">
                                    <tr>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {moviePayments.map((payment: any) => (
                                        <tr key={payment.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">{payment.user.name}</div>
                                                <div className="text-[10px] text-zinc-600 font-mono mt-0.5">{payment.transactionId.slice(0, 15)}...</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-bold text-white">${payment.amount}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
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
        emerald: "from-emerald-500/20 to-transparent border-emerald-500/20",
        blue: "from-blue-500/20 to-transparent border-blue-500/20",
        amber: "from-amber-500/20 to-transparent border-amber-500/20",
    };

    return (
        <div className={`bg-gradient-to-br ${colors[color]} bg-zinc-900/20 border p-6 rounded-[2rem] flex items-center justify-between shadow-2xl shadow-black`}>
            <div>
                <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">{title}</p>
                <h3 className="text-3xl font-black text-white italic">{value}</h3>
            </div>
            <div className="bg-zinc-900 p-4 rounded-2xl border border-white/5 shadow-inner">
                {icon}
            </div>
        </div>
    );
}

function Calendar({ size }: { size: number }) {
    return <Clock size={size} />;
}

export default UserPurchaseHistory;