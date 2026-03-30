import { Check, Zap } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "0",
      duration: "forever",
      features: ["Standard Quality", "Contains Ads", "Watch on 1 Device", "Limited Library Access"],
      isPopular: false,
    },
    {
      name: "Monthly",
      price: "199",
      duration: "month",
      features: ["Unlimited HD Streaming", "No Ads", "Watch on 2 Devices", "Cancel Anytime"],
      isPopular: false,
    },
    {
      name: "Yearly",
      price: "1999",
      duration: "year",
      features: ["All Monthly Features", "4K Ultra HD Quality", "Watch on 4 Devices", "Download for Offline", "Save $389/year"],
      isPopular: true,
    },
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-2">Choose Your Plan</h2>
        <p className="text-gray-400">Unlock premium movies and exclusive content today.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative p-8 rounded-2xl border flex flex-col ${
              plan.isPopular 
                ? "border-emerald-500 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)] scale-105 z-10" 
                : "border-white/10 bg-white/5"
            } transition-all hover:border-emerald-500/50`}
          >
            {plan.isPopular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                Best Value
              </span>
            )}
            
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-white mb-4">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-emerald-500">${plan.price}</span>
                <span className="text-gray-400">/{plan.duration}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-300 text-sm">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
                <Link href="/subscriptions">
                    <Button 
                    className={`w-full py-6 text-lg font-bold transition-all ${
                        plan.isPopular 
                        ? "bg-emerald-500 hover:bg-emerald-600 text-black" 
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                    >
                    {plan.price === "0" ? "Start Free" : "Get Started"} 
                    <Zap className="ml-2 w-5 h-5 fill-current" />
                    </Button>
                </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};