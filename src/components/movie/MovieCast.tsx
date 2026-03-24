/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMovieCast } from '@/services/getMovieCast'
import Image from 'next/image'
import React from 'react'

async function HomePage() {
    // TMDB এর ক্ষেত্রে সাধারণত শুধু আইডি (যেমন: 19995) লাগে, স্লাগ লাগে না
    const cast = await getMovieCast("19995")

    return (
        <div className="p-6 bg-black min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-8 border-l-4 border-emerald-500 pl-4">
                Movie Cast Details
            </h1>

            {/* কাস্ট গ্রিড লেআউট */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {cast && cast.slice(0, 12).map((member: any) => (
                    <div
                        key={member.id}
                        className="group bg-zinc-900 rounded-xl overflow-hidden border border-white/5 hover:border-emerald-500/50 transition-all duration-300 shadow-lg"
                    >
                        {/* অভিনেতা/অভিনেত্রীর ছবি */}
                        <div className="relative aspect-[2/3] h-auto w-auto bg-zinc-800">
                            {member.profile_path ? (
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                                    alt={member.name}
                                    width={768}
                                    height={432}
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-zinc-500 text-xs">
                                    No Image
                                </div>
                            )}
                        </div>

                        {/* টেক্সট ডিটেইলস */}
                        <div className="p-3">
                            <h2 className="font-bold text-sm text-white truncate">
                                {member.name}
                            </h2>
                            <p className="text-xs text-zinc-400 mt-1 truncate">
                                as {member.character}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {cast?.length === 0 && (
                <p className="text-zinc-500">No cast information found.</p>
            )}
        </div>
    )
}

export default HomePage