/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, Lock } from "lucide-react";
import { authClient } from "@/lib/authClient";
import Image from "next/image";
import { toast } from "sonner";
// আপনার auth-client টি ইম্পোর্ট করুন

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
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // ইমেইল/পাসওয়ার্ড লগইন
  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:5000/api/authentication/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const res = await response.json()
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

  // Google Login ফাংশন
  // Google Login ফাংশন
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000/dashboard", // সরাসরি রিলেটিভ পাথ দিন যদি ফ্রন্টএন্ড ৩০০০ এ হয়
        errorCallbackURL: "/login",
        fetchOptions: {
          onSuccess: () => {
            // অনেক সময় অটো রিডাইরেক্ট না হলে এটি ম্যানুয়ালি পুশ করবে
            router.push("http://localhost:3000/dashboard");
            router.refresh();
          },
          onError: (ctx) => {
            setError(ctx.error.message || "Google login failed");
            setGoogleLoading(false);
          }
        }
      });
    } catch (err) {
      console.error(err);
      setError("Google login failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-md w-full bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="text-zinc-400 mt-2">Sign in to continue to CinemaY</p>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="w-full mb-6 flex items-center justify-center gap-3 bg-white hover:bg-zinc-200 text-black font-bold py-2.5 rounded-lg transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {googleLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Image
                width={400}
                height={400}
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </>
          )}
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0c0c0e] px-2 text-zinc-500 font-bold tracking-widest">Or continue with</span>
          </div>
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
                className={`w-full bg-zinc-800/50 border ${errors.email ? "border-red-500" : "border-zinc-700"
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
                className={`w-full bg-zinc-800/50 border ${errors.password ? "border-red-500" : "border-zinc-700"
                  } text-white rounded-lg py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all`}
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
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800/50 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
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