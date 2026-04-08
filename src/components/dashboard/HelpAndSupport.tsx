import { HelpCircle, MessageCircle, Mail } from "lucide-react";

export const HelpSupportSection = () => {
  const faqs = [
    {
      q: "How can I watch my purchased movies?",
      a: "Once purchased, go to your 'Library' or 'My Purchases' page to start streaming immediately."
    },
    {
      q: "Can I cancel my subscription anytime?",
      a: "Yes! You can cancel your subscription from your profile settings at any time without extra fees."
    },
    {
      q: "What payment methods do you accept?",
      a: "We currently accept all major credit cards and digital payments securely via Stripe."
    }
  ];

  return (
    <section className="py-16 px-6 lg:px-12 my-10 max-w-7xl mx-auto transition-colors duration-300">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Contact Support Side */}
        <div className="space-y-8">
          <div className="border-l-4 border-emerald-500 pl-5">
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-3 flex items-center gap-3 uppercase tracking-tighter">
              <HelpCircle className="text-emerald-600 dark:text-emerald-500 w-8 h-8" /> Need Help?
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">
              Have questions about payments, streaming quality, or your account? Were here to help you 24/7.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {/* Email Support Card */}
            <div className="flex items-center gap-5 p-6 bg-white dark:bg-zinc-900/20 rounded-[2rem] border border-zinc-200 dark:border-white/5 hover:border-emerald-500/50 transition-all cursor-pointer shadow-sm group">
              <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl group-hover:bg-emerald-500/10 transition-colors">
                <Mail className="text-emerald-600 dark:text-emerald-500 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-zinc-900 dark:text-white font-black uppercase text-sm tracking-tight">Email Support</h4>
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-500 mt-1">support@cinemay.com</p>
              </div>
            </div>
            
            {/* Live Chat Card */}
            <div className="flex items-center gap-5 p-6 bg-white dark:bg-zinc-900/20 rounded-[2rem] border border-zinc-200 dark:border-white/5 hover:border-emerald-500/50 transition-all cursor-pointer shadow-sm group">
              <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl group-hover:bg-emerald-500/10 transition-colors">
                <MessageCircle className="text-emerald-600 dark:text-emerald-500 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-zinc-900 dark:text-white font-black uppercase text-sm tracking-tight">Live Chat</h4>
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-500 mt-1">Available 10 AM - 10 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Side */}
        <div className="space-y-6">
          <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight pl-2">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 bg-white dark:bg-zinc-900/10 rounded-[2rem] border border-zinc-200 dark:border-white/5 transition-all shadow-sm">
                <h4 className="text-emerald-600 dark:text-emerald-400 font-black text-sm uppercase mb-3 tracking-tight">
                  {faq.q}
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};