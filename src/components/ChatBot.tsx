"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, X, Loader2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // টেক্সট থেকে সব লিঙ্ক খুঁজে বের করে আলাদা বাটন লিস্ট তৈরি করার ফাংশন
  const renderMessageWithLinks = (text: string) => {
    const combinedRegex = /(https?:\/\/[^\s]+|\/movies\/details\/[^\s\n\r`"']+)/g;

    // টেক্সটকে ভাগ করা যাতে শুধু কথাগুলো দেখানো যায়
    const textParts = text.split(combinedRegex);
    // সব লিঙ্কগুলো একটি অ্যারেতে নেওয়া
    const links = text.match(combinedRegex);

    return (
      <div className="flex flex-col gap-3">
        {/* মেইন মেসেজ টেক্সট */}
        <div className="leading-relaxed">
          {textParts.map((part, index) =>
            part.match(combinedRegex) ? null : <span key={index}>{part}</span>
          )}
        </div>

        {/* যদি এক বা একাধিক লিঙ্ক থাকে তবে বাটন লিস্ট */}
        {links && (
          <div className="flex flex-wrap gap-2 mt-1">
            {links.map((link, index) => {
              const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
              const fullLink = link.startsWith('/') ? `${baseUrl}${link}` : link;

              // লিঙ্ক থেকে মুভির স্লাগ নিয়ে সুন্দর নাম বানানো (যেমন: loki-2021 -> Loki 2021)
              const slug = link.split('/').pop()?.split('?')[0] || "Details";
              const displayName = slug.replace(/-/g, ' ');

              return (
                <Link
                  key={index}
                  href={fullLink}
                  target="_blank"
                  className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/40 px-3 py-2 rounded-xl text-[11px] font-bold text-emerald-700 dark:text-emerald-400 transition-all shadow-sm group"
                >
                  <span className="capitalize">View: {displayName}</span>
                  <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiUrl = 'https://cinemay-server.vercel.app/api';
      // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      console.log(apiUrl)
      const res = await fetch(`${apiUrl}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(msg => ({
            role: msg.role === 'model' ? 'assistant' : 'user',
            content: msg.text
          }))
        }),
      });

      const result = await res.json();

      if (result.success && result.data) {
        setMessages((prev) => [...prev, { role: 'model', text: result.data }]);
      } else {
        setMessages((prev) => [...prev, { role: 'model', text: "I couldn't find any information on that. Could you try a different movie name?" }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [...prev, { role: 'model', text: "Connection failed. Please ensure the backend server is running." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 group"
        >
          <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="bg-white dark:bg-slate-900 w-80 sm:w-[420px] h-[580px] rounded-[2rem] shadow-2xl border border-gray-100 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">

          {/* Header */}
          <div className="bg-emerald-600 dark:bg-emerald-700 p-5 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center font-black italic text-xl">C</div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-emerald-600 rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-widest uppercase">Cinemay AI</h3>
                <p className="text-[10px] opacity-70 font-medium">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-black/10 p-2 rounded-xl transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Messages Container */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/40"
          >
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center px-8 space-y-4 opacity-50">
                <div className="p-5 bg-emerald-100 dark:bg-emerald-900/20 rounded-3xl text-emerald-600">
                  <MessageCircle size={40} />
                </div>
                <p className="text-sm font-semibold dark:text-slate-300">
                  Ask me for movie links, details, or suggestions!
                </p>
                <p className='text-sm font-bold dark:text-slate-300'>Remember Ai will respone in every 10 second </p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] p-4 rounded-2xl text-[13px] shadow-sm whitespace-pre-wrap ${msg.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                  }`}>
                  {msg.role === 'model' ? renderMessageWithLinks(msg.text) : msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                  <Loader2 size={18} className="animate-spin text-emerald-500" />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What movie are you looking for?"
              className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-none focus:ring-2 focus:ring-emerald-500 rounded-2xl px-5 py-3.5 text-sm outline-none transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-2xl disabled:opacity-40 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}