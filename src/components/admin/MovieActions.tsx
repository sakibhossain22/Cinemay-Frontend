"use client";

import { deleteMovie } from "@/actions/adminAction";
import { Edit, Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface MovieActionsProps {
    movieId: string;
    movieTitle: string;
    customid: string;
}

export default function MovieActions({ movieId, customid, movieTitle }: MovieActionsProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${movieTitle}"?`)) return;

        setIsDeleting(true);
        try {
            const res = await deleteMovie(movieId);
            if (!res.success) {
                toast.error(res.message || "Failed to delete movie");
                return;
            }
            toast.success("Movie deleted successfully");
            router.refresh();
        } catch (error) {
            toast.error("Failed to delete movie");
        } finally {
            setIsDeleting(false);
        }
    };

    const btnBase = "p-2.5 rounded-xl border transition-all duration-300 group shadow-sm dark:shadow-none";

    return (
        <div className="flex justify-end gap-3 transition-colors duration-300">
            {/* Edit Button */}
            <button
                onClick={() => router.push(`/dashboard/admin/manage-movies/${customid}`)}
                className={`${btnBase} bg-white dark:bg-zinc-800 border-zinc-200 dark:border-white/5 text-zinc-500 dark:text-zinc-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/20 hover:text-emerald-600 dark:hover:text-emerald-500 hover:border-emerald-200 dark:hover:border-emerald-500/20`}
                title="Edit Movie"
            >
                <Edit size={18} className="group-hover:scale-110 transition-transform" />
            </button>

            {/* Delete Button */}
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`${btnBase} bg-white dark:bg-zinc-800 border-zinc-200 dark:border-white/5 text-zinc-500 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-500/20 hover:text-red-600 dark:hover:text-red-500 hover:border-red-200 dark:hover:border-red-500/20`}
                title="Delete Movie"
            >
                {isDeleting ? (
                    <Loader2 size={18} className="animate-spin text-emerald-500" />
                ) : (
                    <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                )}
            </button>
        </div>
    );
}