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

    return (
        <div className="flex justify-end gap-3">
            <button
                onClick={() => router.push(`/dashboard/admin/manage-movies/${customid}`)}
                className="p-2.5 bg-zinc-800 hover:bg-emerald-500/20 text-zinc-400 hover:text-emerald-500 rounded-xl border border-white/5 transition-all duration-300 group"
                title="Edit Movie"
            >
                <Edit size={18} className="group-hover:scale-110 transition-transform" />
            </button>

            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2.5 bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-500 rounded-xl border border-white/5 transition-all duration-300 group"
                title="Delete Movie"
            >
                {isDeleting ? (
                    <Loader2 size={18} className="animate-spin" />
                ) : (
                    <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                )}
            </button>
        </div>
    );
}