"use client"
import { useState, useEffect } from 'react';

export default function Countdown({ expiresAt }: { expiresAt: string }) {
    const [timeLeft, setTimeLeft] = useState("Calculating...");

    useEffect(() => {
        // ১. সরাসরি টার্গেট টাইমকে মিলিসেকেন্ডে নিয়ে নিন
        const targetDate = new Date(expiresAt).getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            // ২. যদি সময় শেষ হয়ে যায়
            if (distance <= 0) {
                setTimeLeft("Expired");
                clearInterval(timer);
                return;
            }

            // ৩. ক্যালকুলেশন (Math.floor ব্যবহার করে নিখুঁত মান বের করা)
            const totalSeconds = Math.floor(distance / 1000);
            const totalMinutes = Math.floor(totalSeconds / 60);
            const totalHours = Math.floor(totalMinutes / 60);
            const days = Math.floor(totalHours / 24);

            // আমরা যদি দিন না দেখিয়ে সরাসরি মোট ঘণ্টা দেখাতে চাই:
            const displayHours = totalHours; // এটি ৪২ বা ৪৮ যাই হোক সরাসরি দেখাবে
            const displayMinutes = totalMinutes % 60;
            const displaySeconds = totalSeconds % 60;

            // ফরম্যাটিং (01h 05m 09s এর মতো দেখানোর জন্য)
            const format = (num: number) => num < 10 ? `0${num}` : num;

            setTimeLeft(`${format(displayHours)}h ${format(displayMinutes)}m ${format(displaySeconds)}s`);
        }, 1000);

        return () => clearInterval(timer);
    }, [expiresAt]);

    return (
        <span className="text-amber-500 font-mono text-xs font-bold bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
            {timeLeft}
        </span>
    );
}