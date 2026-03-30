/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Loader2, Mail, ArrowLeft, CheckCircle2, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


const emailSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
});

const resetSchema = z.object({
    otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type EmailValues = z.infer<typeof emailSchema>;
type ResetValues = z.infer<typeof resetSchema>;

export default function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    const emailForm = useForm<EmailValues>({ resolver: zodResolver(emailSchema) });
    const resetForm = useForm<ResetValues>({ resolver: zodResolver(resetSchema) });

    const onSendOTP = async (data: EmailValues) => {
        setLoading(true);
        try {
            const res = await fetch(`https://cinemay-server.vercel.app/api/authentication/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: data.email }),
            });
            const response = await res.json();
            console.log(response)
            if (!response.success) {
                toast.error(response.message || "Failed to send OTP.");
                return;
            }
            setUserEmail(data.email);
            setStep(2);
            toast.success(response.message || "OTP sent successfully!");
        } catch (err) {
            toast.error("Failed to send OTP.");
        } finally {
            setLoading(false);
        }
    };

    const onResetPassword = async (data: ResetValues) => {
        setLoading(true);
        try {
            const res = await fetch(`https://cinemay-server.vercel.app/api/authentication/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail, code: Number(data.otp), newPassword: data.password }),
            });
            const response = await res.json();
            if (!response.success) {
                toast.error(response.message || "Invalid code.");
                return;
            }
            setStep(3);
            toast.success("Password reset successfully!");
        } catch (err) {
            toast.error("Error resetting password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        // ১. overflow-hidden এবং h-screen যোগ করা হয়েছে যাতে স্ক্রল না হয়
        <div className="h-screen w-full flex items-center justify-center bg-black px-4 relative overflow-hidden select-none">
            
            {/* Background Glow */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-emerald-500/5 blur-[120px] rounded-full -z-10"></div>

            <div className="max-w-md w-full bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 shadow-2xl backdrop-blur-md z-10">

                {step !== 3 && (
                    <Link href="/login" className="inline-flex items-center text-sm text-zinc-400 hover:text-emerald-500 transition-colors mb-6 group">
                        <ArrowLeft className="mr-2 size-4 group-hover:-translate-x-1 transition-transform" />
                        Back to login
                    </Link>
                )}

                {/* --- STEP 1: Enter Email --- */}
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <h1 className="text-3xl font-bold text-white mb-2">Forgot <span className="text-emerald-500">Password?</span></h1>
                        <p className="text-zinc-400 text-sm mb-8 leading-relaxed">Enter your email and we&apos;ll send you a 6-digit OTP to reset your password.</p>

                        <form onSubmit={emailForm.handleSubmit(onSendOTP)} className="space-y-6">
                            <div className="relative group">
                                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                                <input
                                    {...emailForm.register("email")}
                                    placeholder="name@example.com"
                                    className="w-full bg-zinc-800/30 border border-zinc-700 text-white rounded-xl py-3.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
                                />
                                {emailForm.formState.errors.email && <p className="text-red-500 text-xs mt-1.5 ml-1">{emailForm.formState.errors.email.message}</p>}
                            </div>
                            <Button disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 py-6 text-lg font-bold transition-all active:scale-95">
                                {loading ? <Loader2 className="animate-spin" /> : "Send OTP"}
                            </Button>
                        </form>
                    </div>
                )}

                {/* --- STEP 2: Enter OTP & New Password --- */}
                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <h1 className="text-2xl font-bold text-white mb-1 text-center">Reset <span className="text-emerald-500">Password</span></h1>
                        <p className="text-zinc-400 text-[11px] text-center mb-6">OTP sent to: <span className="text-white">{userEmail}</span></p>

                        <form onSubmit={resetForm.handleSubmit(onResetPassword)} className="space-y-4">
                            {/* OTP Field */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">6-Digit OTP</label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />
                                    <input
                                        {...resetForm.register("otp")}
                                        maxLength={6}
                                        placeholder="000000"
                                        className="w-full bg-zinc-800/30 border border-zinc-700 text-white rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 text-center text-lg tracking-[0.4em] font-mono"
                                    />
                                </div>
                                {resetForm.formState.errors.otp && <p className="text-red-500 text-[10px]">{resetForm.formState.errors.otp.message}</p>}
                            </div>

                            {/* New Password Field */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />
                                    <input
                                        {...resetForm.register("password")}
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-zinc-800/30 border border-zinc-700 text-white rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
                                    />
                                </div>
                                {resetForm.formState.errors.password && <p className="text-red-500 text-[10px]">{resetForm.formState.errors.password.message}</p>}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Confirm</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />
                                    <input
                                        {...resetForm.register("confirmPassword")}
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-zinc-800/30 border border-zinc-700 text-white rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
                                    />
                                </div>
                                {resetForm.formState.errors.confirmPassword && <p className="text-red-500 text-[10px]">{resetForm.formState.errors.confirmPassword.message}</p>}
                            </div>

                            <Button disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 py-6 text-lg font-bold shadow-lg shadow-emerald-900/20 active:scale-95 transition-all">
                                {loading ? <Loader2 className="animate-spin" /> : "Reset Password"}
                            </Button>

                            <button type="button" onClick={() => setStep(1)} className="w-full text-zinc-500 text-[10px] hover:text-emerald-500 transition-colors uppercase tracking-tight">
                                Use different email?
                            </button>
                        </form>
                    </div>
                )}

                {/* --- STEP 3: Success --- */}
                {step === 3 && (
                    <div className="text-center py-4 animate-in zoom-in duration-500">
                        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="size-10 text-emerald-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
                        <p className="text-zinc-400 text-xs mb-8 leading-relaxed">Your password has been updated. Securely redirecting to login...</p>
                        <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-500 py-6 text-lg font-bold">
                            <Link href="/login">Login Now</Link>
                        </Button>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-zinc-800/50 text-center">
                    <p className="text-zinc-600 text-[9px] uppercase tracking-widest font-bold">CinemaY Secure Access</p>
                </div>
            </div>

            {/* Global CSS for Hide Scrollbar */}
            <style jsx global>{`
                body {
                    overflow: hidden !important;
                }
            `}</style>
        </div>
    );
}