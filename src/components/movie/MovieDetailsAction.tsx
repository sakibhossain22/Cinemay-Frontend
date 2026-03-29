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
            const { success, message, ok, amount, clientSecret, error, transactionId } = await buyMovie(movie.id, type);
            if (success && ok) {
                setPaymentSecret(clientSecret);
                setTransactionId(transactionId);
            }
            toast.success(`Redirecting to ${type.toLowerCase()} payment...`);

        } catch (error: any) {
            toast.error(error.message || "Action failed");
        }
    }

    return (
        <div>
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                {
                    hasPurchased ? (
                        <Link href={`/movies/details/${movie.customid}/play`}>
                            <Button className="bg-emerald-500 text-md cursor-pointer hover:bg-emerald-600 text-black font-bold h-12 px-8 rounded-md transition-transform active:scale-95">
                                <Play className="mr-2 fill-current " size={25} /> Watch Online
                            </Button>
                        </Link>
                    ) : (
                        <div className="flex flex-wrap items-center gap-2">
                            {/* Buy Button */}
                            <Button
                                onClick={() => handleAction('BUY')}
                                className="bg-emerald-500 text-md cursor-pointer hover:bg-emerald-600 text-black font-bold h-12 px-8 rounded-md transition-transform active:scale-95"
                            >
                                <Play className="mr-2 fill-current " size={25} /> Buy Movie
                                <span className="ml-1">${movie.buyPrice}</span>
                            </Button>

                            {/* Rent Button */}
                            <Button
                                onClick={() => handleAction('RENT')}
                                className="bg-zinc-800 text-md cursor-pointer hover:bg-zinc-700 text-white font-bold h-12 px-8 rounded-md transition-transform active:scale-95 border border-zinc-700"
                            >
                                <KeySquare className="mr-2 fill-current text-emerald-500" size={25} /> Rent Movie
                                <span className="ml-1">${movie.rentPrice}</span>
                            </Button>
                        </div>
                    )
                }

                <Link href={`/movies/details/${movie.customid}/trailer`}>
                    <Button variant="secondary" className="bg-zinc-900/50 text-md cursor-pointer hover:bg-zinc-800 text-zinc-400 h-12 px-8 rounded-md border border-zinc-800">
                        <Play className="mr-2 fill-current " size={20} /> Watch Trailer
                    </Button>
                </Link>
            </div>

            {/* --- STRIPE PAYMENT MODAL --- */}
            {paymentSecret && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                    <div className="max-w-md w-full bg-zinc-950 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative">
                        <button
                            onClick={() => setPaymentSecret(null)}
                            className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <Elements
                            stripe={stripePromise}
                            options={{
                                clientSecret: paymentSecret,
                                appearance: { theme: 'night', variables: { colorPrimary: '#2563eb' } }
                            }}
                        >
                            <MovieCheckout type={type || "BUY"} customid={movie.customid} transactionId={transactionId!} />
                        </Elements>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MovieDetailsAction