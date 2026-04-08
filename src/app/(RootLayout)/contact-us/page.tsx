"use client"
import React, { useState } from 'react';
import { 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Github, 
  Twitter,
  Linkedin,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API transmission
    setTimeout(() => {
      toast.success("Email sended");
      setIsSubmitting(false);
      // Optional: reset form here
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 p-6 md:p-12 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-20 text-center md:text-left relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6">
            <Globe size={12} /> Global Connectivity
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
            Get In <span className="text-emerald-500 text-stroke">Touch</span>
          </h1>
          <p className="mt-6 text-zinc-500 dark:text-zinc-400 text-sm md:text-lg font-medium max-w-2xl leading-relaxed">
            Have a project in mind or a question about our services? Reach out directly. Our team will respond within 24 hours.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          
          {/* Info Cards */}
          <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <ContactCard 
                icon={<Mail className="text-emerald-500" />} 
                label="General Inquiries" 
                value="sakib01181@gmail.com" 
              />
              <ContactCard 
                icon={<Phone className="text-emerald-500" />} 
                label="Direct Line" 
                value="+880 1996818622" 
              />
              <ContactCard 
                icon={<MapPin className="text-emerald-500" />} 
                label="HQ Location" 
                value="Sherpur, Bangladesh" 
              />
            </div>

            {/* Social Nodes */}
            <div className="p-8 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 rounded-[2.5rem] space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Social Nodes</h4>
              <div className="flex gap-4">
                <SocialIcon icon={<Github size={20} />} href="#" />
                <SocialIcon icon={<Twitter size={20} />} href="#" />
                <SocialIcon icon={<Linkedin size={20} />} href="#" />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-emerald-500/5">
              <form onSubmit={handleSendMessage} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2 group-focus-within:text-emerald-500 transition-colors">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Your Name"
                      className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/5 rounded-2xl py-4 px-6 text-sm font-bold focus:border-emerald-500/50 outline-none transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-800"
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2 group-focus-within:text-emerald-500 transition-colors">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="email@example.com"
                      className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/5 rounded-2xl py-4 px-6 text-sm font-bold focus:border-emerald-500/50 outline-none transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-800"
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2 group-focus-within:text-emerald-500 transition-colors">Project Brief</label>
                  <textarea 
                    required
                    rows={6}
                    placeholder="Describe your requirements..."
                    className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/5 rounded-3xl p-6 text-sm font-bold focus:border-emerald-500/50 outline-none transition-all resize-none placeholder:text-zinc-300 dark:placeholder:text-zinc-800"
                  />
                </div>

                <button 
                  disabled={isSubmitting}
                  className="group w-full md:w-auto px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white dark:text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-emerald-500/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      Initiate Send
                      <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="group p-8 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 rounded-[2.5rem] hover:border-emerald-500/30 transition-all">
      <div className="w-12 h-12 bg-white dark:bg-black rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-zinc-100 dark:border-white/5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">{label}</p>
      <p className="text-sm font-black text-zinc-900 dark:text-white">{value}</p>
    </div>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <a 
      href={href} 
      className="w-12 h-12 bg-white dark:bg-black border border-zinc-200 dark:border-white/5 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-emerald-500 hover:border-emerald-500/50 transition-all active:scale-90 shadow-sm"
    >
      {icon}
    </a>
  );
}