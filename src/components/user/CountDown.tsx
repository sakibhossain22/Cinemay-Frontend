"use client"
import { useState, useEffect } from 'react';

export default function Countdown({ expiresAt }: { expiresAt: string }) {
    const [timeLeft, setTimeLeft] = useState("Calculating...");

    useEffect(() => {
        const targetDate = new Date(expiresAt).getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                setTimeLeft("Expired");
                clearInterval(timer);
                return;
            }

            const totalSeconds = Math.floor(distance / 1000);
            const totalMinutes = Math.floor(totalSeconds / 60);
            const totalHours = Math.floor(totalMinutes / 60);
            const days = Math.floor(totalHours / 24);

            const displayHours = totalHours; 
            const displayMinutes = totalMinutes % 60;
            const displaySeconds = totalSeconds % 60;

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