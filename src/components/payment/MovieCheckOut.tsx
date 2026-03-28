"use client"
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { toast } from 'sonner';

export default function MovieCheckout({ type, transactionId, customid }: { type: string; transactionId: string; customid: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/movies/details/${customid}?transactionId=${transactionId}&type=${type}&paymentStatus=success`,
      },
    });

    if (error) {
      toast.error(error.message || "Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-zinc-900 rounded-[2rem] border border-white/5 space-y-6">
      <h2 className="text-xl font-bold text-white italic tracking-tight">Enter Card Details</h2>

      <div className="bg-white p-4 rounded-xl">
        <PaymentElement options={{ layout: "accordion" }} />
      </div>

      <button
        disabled={loading || !stripe}
        className="w-full py-4 bg-blue-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-blue-500 transition-all disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}