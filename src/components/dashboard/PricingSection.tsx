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
    <section className="py-16 transition-colors duration-300">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-2 uppercase tracking-tighter">
          Choose Your <span className="text-emerald-600 dark:text-emerald-500">Plan</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 font-medium">Unlock premium movies and exclusive content today.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative p-8 rounded-[2rem] border flex flex-col transition-all duration-500 ${
              plan.isPopular 
                ? "border-emerald-500 bg-white dark:bg-emerald-500/5 shadow-xl dark:shadow-[0_0_20px_rgba(16,185,129,0.1)] scale-105 z-10" 
                : "border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/20 shadow-sm dark:shadow-none"
            } hover:border-emerald-500/50 group`}
          >
            {plan.isPopular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                Best Value
              </span>
            )}
            
            <div className="flex-grow">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-4 uppercase tracking-tight">
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-emerald-600 dark:text-emerald-500">${plan.price}</span>
                <span className="text-zinc-500 dark:text-zinc-400 text-sm font-bold uppercase">/{plan.duration}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300 text-sm font-medium">
                    <div className="p-1 bg-emerald-500/10 rounded-lg">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-500 shrink-0" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
                <Link href="/subscriptions">
                    <Button 
                    className={`w-full py-7 text-sm font-black uppercase tracking-widest transition-all rounded-2xl ${
                        plan.isPopular 
                        ? "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-black" 
                        : "bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200"
                    }`}
                    >
                    {plan.price === "0" ? "Start Free" : "Get Started"} 
                    <Zap className="ml-2 w-4 h-4 fill-current" />
                    </Button>
                </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};