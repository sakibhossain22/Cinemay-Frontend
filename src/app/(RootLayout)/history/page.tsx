/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play, Clock } from 'lucide-react'
import { getUserHistory } from '@/actions/history.action' 
import ClearHistory from '@/components/home/clear-history'

async function History() {
    const response = await getUserHistory()
    const historyData = response?.data || []
    return (
        <div className="min-h-screen bg-black text-white py-2 px-4 sm:px-10">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Clock className="text-emerald-500 w-8 h-8" />
                        Watch History
                    </h1>
                    <p className="text-zinc-500 mt-2 text-sm">Movies and series you have recently watched</p>
                </div>

                {historyData.length > 0 && (
                    <ClearHistory />
                )}
            </div>

            
            {historyData.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {historyData.map((item: any) => (
                        <div key={item.id} className="flex flex-col gap-2">
                            
                            <Link
                                href={`/movies/details/${item.media.customid}`}
                                className="group relative aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 transition-all duration-300 hover:border-emerald-500/50"
                            >
                                <Image
                                    src={item.media.posterUrl}
                                    alt={item.media.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-40"
                                />

                                
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="bg-emerald-500 p-3 rounded-full shadow-lg shadow-emerald-500/40 transform scale-50 group-hover:scale-100 transition-transform">
                                        <Play className="w-6 h-6 text-black fill-current" />
                                    </div>
                                </div>

                                
                                <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[10px] text-zinc-300 border border-zinc-700">
                                    {new Date(item.viewedAt).toLocaleDateString()}
                                </div>
                            </Link>

                            
                            <div className="px-1">
                                <h3 className="text-sm font-medium truncate text-zinc-200 hover:text-emerald-400 transition-colors">
                                    {item.media.title}
                                </h3>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-[11px] text-zinc-500 uppercase tracking-tighter">
                                        {item.media.type}
                                    </span>
                                    <span className="text-[11px] text-emerald-500 font-bold">
                                        ⭐ {item.media.ratingAverage}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                    <div className="bg-zinc-900 p-6 rounded-full mb-4">
                        <Clock size={48} className="text-zinc-700" />
                    </div>
                    <h2 className="text-xl font-semibold text-zinc-300">Your history is empty</h2>
                    <p className="text-zinc-500 mt-2 max-w-xs">Looks like you havent watched anything yet. Start exploring now!</p>
                    <Link
                        href="/movies"
                        className="mt-6 bg-emerald-600 hover:bg-emerald-500 text-black px-6 py-2 rounded-full font-bold transition-all"
                    >
                        Browse Movies
                    </Link>
                </div>
            )}
        </div>
    )
}

export default History