/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, Sparkles, ArrowRight, MoveUpIcon } from 'lucide-react';
import confetti from 'canvas-confetti'; // এটি ইন্সটল করতে হবে: npm install canvas-confetti
import { useSearchParams } from 'next/navigation';
import { confirmPayment } from '@/actions/subcscription.action';
import { toast } from 'sonner';

export default function PaymentSuccess() {
    const searchParams = useSearchParams();
    const paymentIntentId = searchParams.get('payment_intent');
    const status = searchParams.get('redirect_status');


    useEffect(() => {
        // পেমেন্ট সফল হওয়ার আনন্দ উদযাপনের জন্য কনফেটি এনিমেশন

        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        const verifyPayment = async () => {
            if (status === 'succeeded' && paymentIntentId) {
                try {
                    const result = await confirmPayment(paymentIntentId);
                    if (result.success) {
                        toast.success("Payment verified! Subscription activated.");
                    } else {
                        toast.error(result.message || "Confirmation failed");
                    }
                } catch (error) {
                    toast.error("An error occurred during verification");
                }
            }
        };

        verifyPayment();
    }, [paymentIntentId, status]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white font-sans">
            <div className="max-w-2xl w-full text-center space-y-8">

                
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-blue-600 blur-3xl opacity-20 animate-pulse"></div>
                    <CheckCircle2 size={100} className="text-blue-500 relative z-10 mx-auto" strokeWidth={1.5} />
                </div>

                
                <div className="space-y-4">
                    <h1 className="text-5xl font-black uppercase tracking-tighter italic">
                        Welcome to the <span className="text-blue-500">Pro Club!</span>
                    </h1>
                    <p className="text-zinc-500 text-lg max-w-md mx-auto leading-relaxed">
                        Your subscription is now active. Get ready to experience movies in 4K with no limits.
                    </p>
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
                    <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-3xl text-left space-y-2">
                        <Sparkles className="text-amber-400" size={24} />
                        <h3 className="font-bold">Premium Unlocked</h3>
                        <p className="text-zinc-500 text-sm">Access to all exclusive 4K content and early releases.</p>
                    </div>
                    <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-3xl text-left space-y-2">
                        <MoveUpIcon className="text-blue-400" size={24} />
                        <h3 className="font-bold">Ad-Free Experience</h3>
                        <p className="text-zinc-500 text-sm">No interruptions. Just you and your favorite cinema.</p>
                    </div>
                </div>

                
                <div className="pt-10 flex flex-col md:flex-row items-center justify-center gap-4">
                    <Link
                        href="/dashboard"
                        className="w-full md:w-auto px-10 py-4 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group"
                    >
                        Go to Dashboard
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/movies"
                        className="w-full md:w-auto px-10 py-4 bg-zinc-900 text-white font-black uppercase tracking-widest rounded-2xl border border-white/5 hover:bg-zinc-800 transition-all"
                    >
                        Start Watching
                    </Link>
                </div>

                <p className="text-zinc-700 text-xs pt-8">
                    A confirmation email has been sent to your registered address.
                </p>
            </div>
        </div>
    );
}