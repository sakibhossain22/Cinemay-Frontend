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
    <section className="py-4 bg-white/5 rounded-3xl px-8 my-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <HelpCircle className="text-emerald-500 w-8 h-8" /> Need Help?
          </h2>
          <p className="text-gray-400 mb-8">
            Have questions about payments, streaming quality, or your account? Were here to help you 24/7.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-white/5 hover:border-emerald-500/50 transition-colors cursor-pointer">
              <div className="bg-emerald-500/20 p-3 rounded-lg">
                <Mail className="text-emerald-500 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-medium">Email Support</h4>
                <p className="text-xs text-gray-500">support@cinemay.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-white/5 hover:border-emerald-500/50 transition-colors cursor-pointer">
              <div className="bg-emerald-500/20 p-3 rounded-lg">
                <MessageCircle className="text-emerald-500 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-medium">Live Chat</h4>
                <p className="text-xs text-gray-500">Available 10 AM - 10 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h3>
          {faqs.map((faq, index) => (
            <div key={index} className="p-5 bg-black/20 rounded-xl border border-white/5">
              <h4 className="text-emerald-500 font-medium mb-2">{faq.q}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};