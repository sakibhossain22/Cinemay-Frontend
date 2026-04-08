import { myWatchList } from "@/actions/user.action";
import WatchListClient from "@/components/user/WatchListClient";
import { getSession } from "@/services/userService";
import { FilmIcon } from "lucide-react";

async function WatchList() {
    const session  = await getSession();
    const response = await myWatchList();
    const list = response?.data || [];

    return (
        <div className="p-2 min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10 space-y-2">
                    <h1 className="text-3xl flex items-center gap-2 font-black tracking-tighter text-zinc-900 dark:text-white">
                        <FilmIcon size={32} className="text-zinc-900 dark:text-white" /> 
                        My <span className="text-emerald-600 dark:text-emerald-500">Watchlist</span>
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">Movies youve saved to watch later.</p>
                </header>

                <WatchListClient initialData={list} />
            </div>
        </div>
    );
}

export default WatchList;