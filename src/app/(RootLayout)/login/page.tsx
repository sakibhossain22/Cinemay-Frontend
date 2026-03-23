/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, Lock } from "lucide-react";

// ১. Zod Schema তৈরি
const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ২. React Hook Form-এ Zod রিজলভার সেট করা
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError("");

    try {
      // Better Auth-এর সেশন ম্যানেজমেন্টের জন্য সাধারণত authClient.signIn ব্যবহার করা ভালো
      // তবে আপনি যেহেতু সরাসরি fetch ব্যবহার করছেন:
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      {/* Background Glow Effect */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-md w-full bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="text-zinc-400 mt-2">Sign in to continue to CinemaY</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                {...register("email")}
                type="email"
                placeholder="name@example.com"
                className={`w-full bg-zinc-800/50 border ${
                  errors.email ? "border-red-500" : "border-zinc-700"
                } text-white rounded-lg py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="block text-sm font-medium text-zinc-300">Password</label>
              <Link href="/forgot-password" title="Reset Password" className="text-xs text-emerald-500 hover:text-emerald-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className={`w-full bg-zinc-800/50 border ${
                  errors.password ? "border-red-500" : "border-zinc-700"
                } text-white rounded-lg py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all`}
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Error Message from Server */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-lg animate-in fade-in duration-300">
              <p className="text-red-500 text-sm text-center font-medium">{error}</p>
            </div>
          )}

          {/* Submit Button (Green Theme) */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800/50 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-zinc-400 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-emerald-500 font-semibold hover:text-emerald-400 hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;