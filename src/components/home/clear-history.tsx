"use client"
import { Trash2 } from "lucide-react"
import { clearAllHistory } from '@/actions/history.action' // ধরে নিচ্ছি clearAction-টিও আছে
import { toast } from "sonner";

function ClearHistory() {

    const handleClearHistory = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await clearAllHistory();
        if (result.success) {
            // Optionally, you can add a success message or refresh the page to reflect changes
            toast.success("History cleared successfully!");
            // window.location.reload(); // Refresh the page to update the history list
        } else {
            toast.error("Failed to clear history. Please try again.");
        }
    }

    return (
        <div>
            <form onSubmit={(e) => handleClearHistory(e)}>
                <button
                    type="submit"
                    className="flex items-center gap-2 bg-zinc-900 hover:bg-red-950 text-zinc-400 hover:text-red-500 px-4 py-2 rounded-full border border-zinc-800 hover:border-red-900 transition-all duration-300 text-sm font-medium"
                >
                    <Trash2 size={16} />
                    Clear All History
                </button>
            </form>
        </div>
    )
}

export default ClearHistory
