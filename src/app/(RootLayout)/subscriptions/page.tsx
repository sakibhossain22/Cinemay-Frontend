/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import { Check, Zap, Crown, Rocket, Star, X } from 'lucide-react';
import { toast } from 'sonner';
import { subscribeToPlan } from '@/actions/subcscription.action';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/payment/CheckoutForm';
import { getSession } from '@/services/userService';

// ১. এটি কম্পোনেন্টের বাইরে রাখুন
const stripePromise = loadStripe('pk_test_51OIDPJHroIJBMQjzF1Jel9pubaQSdu9G8kcSvS6R5MLEfNIret24NUn0b2Xg7bOENutA7VGDIeshxQhIv4rCpRsx00ChMVNbAi');

function Subscriptions() {
    const [paymentSecret, setPaymentSecret] = useState<string | null>(null);
    const [transactionId, setTransactionId] = useState<string | null>(null);
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

    const handleSubscription = async (planType: string) => {

        const user = await getSession();
        if (!user?.user?.id) {
            toast.error("You must be logged in to subscribe to a plan.");
            return;
        }

        if (planType === "Free") return;

        try {
            setLoadingPlan(planType);
            const loadingToast = toast.loading(`Initiating ${planType} plan...`);

            const response = await subscribeToPlan(planType.toLocaleUpperCase());
            toast.dismiss(loadingToast);

            // ২. এরর হ্যান্ডেলিং এবং এক্সিস্টিং পেমেন্ট চেক
            if (!response.success) {
                if (response.clientSecret) {
                    toast.error(response.message || "Complete your existing payment");
                    setPaymentSecret(response.clientSecret);
                    setTransactionId(response.transactionId);
                } else {
                    toast.error(response.message || "Failed to initiate plan");
                }
                return;
            }

            // ৩. সাকসেসফুলি সিক্রেট পেলে মডাল ওপেন
            if (response.clientSecret) {
                setPaymentSecret(response.clientSecret);
                setTransactionId(response.transactionId);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoadingPlan(null);
        }
    };

    return (
        <div className="p-6 bg-black min-h-screen text-white relative font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-16 space-y-4">
                    <h1 className="text-5xl font-black uppercase tracking-tighter bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent italic">
                        Choose Your Plan
                    </h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <PricingCard
                        title="Free" price="0" description="Perfect for getting started"
                        icon={<Rocket className="text-zinc-400" size={24} />}
                        features={["720p Quality", "Contains Ads", "1 Device"]}
                        buttonText="Current Plan" isCurrent={true}
                        onSelect={() => handleSubscription("Free")}
                    />

                    <PricingCard
                        title="Monthly" price="19" description="Best for enthusiasts"
                        icon={<Zap className="text-blue-500" size={24} />}
                        features={["4K Streaming", "Ad-Free", "2 Devices"]}
                        buttonText={loadingPlan === "Monthly" ? "Loading..." : "Upgrade to Monthly"}
                        highlighted={true} badge="Popular"
                        onSelect={() => handleSubscription("Monthly")}
                    />

                    <PricingCard
                        title="Yearly" price="199" description="Save big annually"
                        icon={<Crown className="text-amber-400" size={24} />}
                        features={["Everything in Monthly", "Family Sharing", "4 Devices"]}
                        buttonText={loadingPlan === "Yearly" ? "Loading..." : "Get Yearly Pro"}
                        badge="Best Value" yearly={true}
                        onSelect={() => handleSubscription("Yearly")}
                    />
                </div>
            </div>

            
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
                            <CheckoutForm clientSecret={paymentSecret} transactionId={transactionId!} />
                        </Elements>
                    </div>
                </div>
            )}
        </div>
    );
}

// PricingCard কম্পোনেন্ট আগের মতোই থাকবে
function PricingCard({ title, price, description, icon, features, buttonText, highlighted = false, isCurrent = false, badge, yearly = false, onSelect }: any) {
    return (
        <div className={`relative p-8 rounded-[2.5rem] border transition-all duration-500 flex flex-col ${highlighted
            ? 'bg-zinc-900/50 border-blue-600/50 shadow-2xl shadow-blue-600/10 scale-105 z-10'
            : 'bg-zinc-900/20 border-white/5 hover:border-zinc-700'
            }`}>
            {badge && (
                <span className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${highlighted ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'}`}>
                    {badge}
                </span>
            )}
            <div className="mb-8">
                <div className="mb-4">{icon}</div>
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{description}</p>
            </div>
            <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-black">${price}</span>
                <span className="text-zinc-500 text-sm font-medium">/{yearly ? 'year' : 'month'}</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
                {features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-zinc-300">
                        <Check size={14} className={highlighted ? 'text-blue-500' : 'text-zinc-500'} />
                        {feature}
                    </li>
                ))}
            </ul>
            <button
                disabled={isCurrent}
                onClick={onSelect}
                className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${isCurrent
                    ? 'bg-zinc-800 text-zinc-500 cursor-default'
                    : highlighted
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
                        : 'bg-white text-black hover:bg-zinc-200'
                    }`}
            >
                {buttonText}
            </button>
        </div>
    );
}

export default Subscriptions;