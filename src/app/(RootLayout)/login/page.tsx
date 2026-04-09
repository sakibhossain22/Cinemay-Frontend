/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, Lock, ShieldCheck, UserCircle } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/authClient";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue, // Added to programmatically set field values
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });


  const handleGoogleLogin = async () => {
    const res = await authClient.signIn.social({
      provider: "google",
      callbackURL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    });
    console.log("Google login response:", res);

  };
  // Demo Login Handler
  const handleDemoLogin = (role: 'admin' | 'user') => {
    if (role === 'admin') {
      setValue("email", "admin@admin.com");
      setValue("password", "admin1234");
      toast.info("Admin credentials loaded");
    } else {
      setValue("email", "user@user.com");
      setValue("password", "user1234");
      toast.info("User credentials loaded");
    }
  };

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/authentication/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.success) {
        toast.success(res.message || "Login successful!");
        router.push("/dashboard");
      } else {
        toast.error(res.error || "Login failed");
        setError(res.error || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4 relative transition-colors duration-300">

      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-md w-full bg-zinc-50/50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl backdrop-blur-md">
        {/* Demo Login Buttons */}

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Welcome Back</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">Sign in to continue to CinemaY</p>
        </div>
        {/* Social Login Buttons */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 whitespace-nowrap">Quick Login</span>
            <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="flex items-center justify-center gap-2 p-2.5 text-xs font-bold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 hover:border-emerald-500/50 hover:text-emerald-500 transition-all active:scale-95"
            >
              <ShieldCheck size={14} /> Admin Access
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('user')}
              className="flex items-center justify-center gap-2 p-2.5 text-xs font-bold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 hover:border-emerald-500/50 hover:text-emerald-500 transition-all active:scale-95"
            >
              <UserCircle size={14} /> User Access
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-2 mb-5 active:scale-[0.98] shadow-lg shadow-gray-800/20"
          >
            <Image src="/google.png" alt="Google" width={16} height={16} className="h-4 w-4" />
            Sign in with Google
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-zinc-400 dark:text-zinc-500 group-focus-within:text-emerald-600 dark:group-focus-within:text-emerald-500 transition-colors" />
              <input
                {...register("email")}
                type="email"
                placeholder="name@example.com"
                className={`w-full bg-white dark:bg-zinc-800/50 border ${errors.email ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"
                  } text-zinc-900 dark:text-white rounded-lg py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-600 dark:focus:border-emerald-500 transition-all`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
              <Link href="/forgot-password" title="Reset Password" className="text-xs text-emerald-600 dark:text-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400 hover:underline font-medium">
                Forgot password?
              </Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-400 dark:text-zinc-500 group-focus-within:text-emerald-600 dark:group-focus-within:text-emerald-500 transition-colors" />
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className={`w-full bg-white dark:bg-zinc-800/50 border ${errors.password ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"
                  } text-zinc-900 dark:text-white rounded-lg py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-600 dark:focus:border-emerald-500 transition-all`}
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-lg">
              <p className="text-red-500 text-sm text-center font-medium">{error}</p>
            </div>
          )}

          <button
            disabled={loading || googleLoading}
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 disabled:bg-emerald-800/50 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-lg shadow-emerald-600/20"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
          </button>


        </form>

        <div className="mt-8 text-center">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-emerald-600 dark:text-emerald-500 font-bold hover:text-emerald-500 dark:hover:text-emerald-400 hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;