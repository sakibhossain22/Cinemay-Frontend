import { Separator } from "@/components/ui/separator";

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-6 md:p-12 space-y-10 animate-pulse">

            {/* --- Hero Banner Skeleton --- */}
            <div className="relative w-full h-[400px] bg-zinc-900/50 rounded-3xl border border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 space-y-4 w-full max-w-lg">
                    <div className="h-10 bg-zinc-800 rounded-lg w-3/4" />
                    <div className="h-4 bg-zinc-800 rounded-md w-1/2" />
                    <div className="flex gap-3">
                        <div className="h-12 w-32 bg-emerald-500/20 rounded-full" />
                        <div className="h-12 w-32 bg-zinc-800 rounded-full" />
                    </div>
                </div>
            </div>

            {/* --- Section Title Skeleton --- */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="h-8 bg-zinc-900 rounded-md w-48" />
                    <div className="h-8 bg-zinc-900 rounded-md w-20" />
                </div>
                <Separator className="bg-zinc-800" />

                {/* --- Grid Items Skeleton (5 Columns for Desktop) --- */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="space-y-3">
                            <div className="aspect-[2/3] w-full bg-zinc-900 rounded-xl border border-white/5" />
                            <div className="space-y-2">
                                <div className="h-4 bg-zinc-900 rounded w-full" />
                                <div className="h-3 bg-zinc-900 rounded w-2/3" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Cast/Slider Skeleton --- */}
            <div className="space-y-6">
                <div className="h-8 bg-zinc-900 rounded-md w-40" />
                <div className="flex gap-4 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="shrink-0 w-32 space-y-2">
                            <div className="aspect-square bg-zinc-900 rounded-full border border-white/5" />
                            <div className="h-3 bg-zinc-900 rounded w-full mx-auto" />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}