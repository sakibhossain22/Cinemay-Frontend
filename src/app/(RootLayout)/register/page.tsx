/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, Lock, User, Phone } from "lucide-react";
import { toast } from "sonner";

// ১. Zod Schema: নাম, ইমেইল, ফোন এবং পাসওয়ার্ডের জন্য ভ্যালিডেশন
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`https://cinemay-server.vercel.app/api/authentication/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const res = await response.json()
      if (res.success) {
        toast.success(res.message || "Registration successful!");
        router.push("/login");
      } else {
        toast.error(res.error || "Registration failed");
        setError(res.error || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12">
      
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-lg w-full bg-zinc-900/40 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Join CinemaY</h1>
          <p className="text-zinc-400 mt-3 text-lg">Create an account to start streaming</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          <div className="group">
            <label className="block text-sm font-medium text-zinc-400 mb-2 group-focus-within:text-emerald-500 transition-colors">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                {...register("name")}
                type="text"
                placeholder="Shakib Hossain"
                className={`w-full bg-zinc-800/30 border ${errors.name ? 'border-red-500' : 'border-zinc-700'} text-white rounded-xl py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all placeholder:text-zinc-600`}
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.name.message}</p>}
          </div>

          
          <div className="group">
            <label className="block text-sm font-medium text-zinc-400 mb-2 group-focus-within:text-emerald-500 transition-colors">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                {...register("email")}
                type="email"
                placeholder="example@mail.com"
                className={`w-full bg-zinc-800/30 border ${errors.email ? 'border-red-500' : 'border-zinc-700'} text-white rounded-xl py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all placeholder:text-zinc-600`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.email.message}</p>}
          </div>

          
          <div className="group">
            <label className="block text-sm font-medium text-zinc-400 mb-2 group-focus-within:text-emerald-500 transition-colors">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                {...register("phone")}
                type="text"
                placeholder="+880 1XXX XXXXXX"
                className={`w-full bg-zinc-800/30 border ${errors.phone ? 'border-red-500' : 'border-zinc-700'} text-white rounded-xl py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all placeholder:text-zinc-600`}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.phone.message}</p>}
          </div>

          
          <div className="group">
            <label className="block text-sm font-medium text-zinc-400 mb-2 group-focus-within:text-emerald-500 transition-colors">Create Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className={`w-full bg-zinc-800/30 border ${errors.password ? 'border-red-500' : 'border-zinc-700'} text-white rounded-xl py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all placeholder:text-zinc-600`}
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.password.message}</p>}
          </div>

          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl">
              <p className="text-red-500 text-sm text-center font-medium">{error}</p>
            </div>
          )}

          
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-95"
          >
            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : (
              <span className="text-lg">Create Account</span>
            )}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-zinc-800 pt-6">
          <p className="text-zinc-400">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-500 font-bold hover:text-emerald-400 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;