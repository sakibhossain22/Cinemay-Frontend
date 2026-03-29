/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { KeySquare, Play, X } from "lucide-react"
import { toast } from "sonner"
import { buyMovie } from "@/actions/user.action"
import { useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import MovieCheckout from "../payment/MovieCheckOut"

const MovieDetailsAction = ({ movie, hasPurchased, userId }: { movie: any, hasPurchased: boolean, userId: string | null }) => {
    const stripePromise = loadStripe('pk_test_51OIDPJHroIJBMQjzF1Jel9pubaQSdu9G8kcSvS6R5MLEfNIret24NUn0b2Xg7bOENutA7VGDIeshxQhIv4rCpRsx00ChMVNbAi');

    const [paymentSecret, setPaymentSecret] = useState<string | null>(null);
    const [transactionId, setTransactionId] = useState<string | null>(null);
    const [type, setType] = useState<'BUY' | 'RENT' | null>(null);

    const handleAction = async (type: 'BUY' | 'RENT') => {
        try {
            if (!userId) {
                toast.error(`You must be logged in to ${type.toLowerCase()} this movie.`);
                return;
            }
            setType(type);
            const { success, ok, clientSecret, transactionId } = await buyMovie(movie.id, type);
            if (success && ok) {
                setPaymentSecret(clientSecret);
                setTransactionId(transactionId);
                toast.success(`Redirecting to ${type.toLowerCase()} payment...`);
            }
        } catch (error: any) {
            toast.error(error.message || "Action failed");
        }
    }

    return (
        <div className="w-full">
            {/* Action Buttons Container */}
            <div className="flex flex-row flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 mb-6">
                {
                    hasPurchased ? (
                        <Link href={`/movies/details/${movie.customid}/play`} className="w-full sm:w-auto">
                            <Button className="w-full bg-emerald-500 text-sm sm:text-md cursor-pointer hover:bg-emerald-600 text-black font-bold h-11 sm:h-12 px-6 sm:px-8 rounded-md transition-transform active:scale-95">
                                <Play className="mr-2 fill-current" size={20} /> Watch Online
                            </Button>
                        </Link>
                    ) : (
                        <>
                            {/* Buy & Rent: Small screen এ পাশাপাশি থাকবে (flex-1) */}
                            <div className="flex flex-row gap-3 w-full md:w-auto">
                                <Button
                                    onClick={() => handleAction('BUY')}
                                    className="flex-1 md:flex-none bg-emerald-500 text-[13px] sm:text-md cursor-pointer hover:bg-emerald-600 text-black font-bold h-11 sm:h-12 md:px-8 rounded-md transition-transform active:scale-95"
                                >
                                    <Play className="mr-1 sm:mr-2 fill-current shrink-0" size={18} /> Buy ${movie.buyPrice}
                                </Button>

                                <Button
                                    onClick={() => handleAction('RENT')}
                                    className="flex-1 md:flex-none bg-zinc-800 text-[13px] sm:text-md cursor-pointer hover:bg-zinc-700 text-white font-bold h-11 sm:h-12 md:px-8 rounded-md transition-transform active:scale-95 border border-zinc-700"
                                >
                                    <KeySquare className="mr-1 sm:mr-2 fill-current text-emerald-500 shrink-0" size={18} /> Rent ${movie.rentPrice}
                                </Button>
                            </div>
                        </>
                    )
                }

                {/* Trailer: Small screen এ নিচে চলে আসবে (w-full) */}
                <Link href={`/movies/details/${movie.customid}/trailer`} className="w-full md:w-auto">
                    <Button variant="secondary" className="w-full md:w-auto bg-zinc-900/50 text-sm sm:text-md cursor-pointer hover:bg-zinc-800 text-zinc-400 h-11 sm:h-12 px-6 md:px-8 rounded-md border border-zinc-800">
                        <Play className="mr-2 fill-current" size={18} /> Watch Trailer
                    </Button>
                </Link>
            </div>

            {/* Payment Modal remains same */}
            {paymentSecret && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-3 sm:p-4">
                    <div className="w-[95%] max-w-md bg-zinc-950 border border-white/10 rounded-[1.5rem] sm:rounded-[2.5rem] p-5 sm:p-8 shadow-2xl relative overflow-y-auto max-h-[90vh]">
                        <button
                            onClick={() => setPaymentSecret(null)}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-zinc-500 hover:text-white transition-colors z-[110]"
                        >
                            <X size={24} />
                        </button>

                        <div className="mt-4">
                            <Elements
                                stripe={stripePromise}
                                options={{
                                    clientSecret: paymentSecret,
                                    appearance: { 
                                        theme: 'night', 
                                        variables: { colorPrimary: '#10b981' }
                                    }
                                }}
                            >
                                <MovieCheckout type={type || "BUY"} customid={movie.customid} transactionId={transactionId!} />
                            </Elements>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MovieDetailsAction