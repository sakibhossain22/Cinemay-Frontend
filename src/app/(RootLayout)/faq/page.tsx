"use client"
import React, { useState } from 'react';
import { 
  LifeBuoy, 
  MessageSquare, 
  Mail, 
  Zap, 
  ChevronDown, 
  Send, 
  Headphones,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

export default function SupportPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API transmission
    setTimeout(() => {
      toast.success("Email sended");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 p-4 md:p-12 font-sans transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-16 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
            <Zap size={14} className="text-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Response Time: &lt; 2 Hours</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Tech <span className="text-emerald-500">Support</span>
          </h1>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 text-sm md:text-base font-medium max-w-xl">
            Our technical team is ready to assist with account issues or protocol errors. Submit your request below for immediate processing.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
              <h2 className="text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3 text-zinc-900 dark:text-white">
                <MessageSquare className="text-emerald-500" /> Open Ticket
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SupportInput label="Account ID" placeholder="UID-2026-XXXX" />
                  <SupportInput label="Issue Category" placeholder="Billing / Technical" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Problem Description</label>
                  <textarea 
                    required
                    rows={5}
                    placeholder="Describe the technical error in detail..."
                    className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/5 rounded-2xl p-5 text-sm font-medium focus:border-emerald-500/50 outline-none transition-all resize-none placeholder:text-zinc-300 dark:placeholder:text-zinc-800"
                  />
                </div>
                <button 
                  disabled={loading}
                  className="w-full md:w-auto px-12 py-4 bg-emerald-600 hover:bg-emerald-500 text-white dark:text-black rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-emerald-500/10"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      Send Request <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Quick Help & FAQ */}
          <div className="space-y-8">
            <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white space-y-6 shadow-xl shadow-emerald-900/20">
              <Headphones size={40} className="opacity-50" />
              <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight">Direct Node Access</h3>
              <div className="space-y-4">
                <ContactLink icon={<Mail size={16} />} label="Email Support" value="support@system.dev" />
                <ContactLink icon={<LifeBuoy size={16} />} label="Discord Base" value="discord.gg/dev-nexus" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-2">Frequent Debugs</h4>
              <FaqItem question="How to reset encrypted credentials?" />
              <FaqItem question="API Gateway timeout solutions" />
              <FaqItem question="Refund settlement timeline" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function SupportInput({ label, placeholder }: { label: string, placeholder: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">{label}</label>
      <input 
        required
        type="text" 
        placeholder={placeholder}
        className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/5 rounded-2xl py-4 px-6 text-sm font-medium focus:border-emerald-500/50 outline-none transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-800"
      />
    </div>
  );
}

function FaqItem({ question }: { question: string }) {
  return (
    <div className="group bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 p-5 rounded-2xl hover:border-emerald-500/30 transition-all cursor-pointer">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300 group-hover:text-emerald-500 transition-colors">{question}</span>
        <ChevronDown size={14} className="text-zinc-500 group-hover:rotate-180 transition-transform duration-300" />
      </div>
    </div>
  );
}

function ContactLink({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-black uppercase tracking-widest opacity-60">{label}</p>
        <p className="text-xs font-bold">{value}</p>
      </div>
    </div>
  );
}