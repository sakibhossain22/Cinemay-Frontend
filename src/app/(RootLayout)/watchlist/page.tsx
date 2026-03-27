import { myWatchList } from "@/actions/user.action";
import WatchListClient from "@/components/user/WatchListClient";
import { FilmIcon } from "lucide-react";

async function WatchList() {
    const response = await myWatchList();
    const list = response?.data || [];

    return (
        <div className="p-2 bg-black min-h-screen">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10 space-y-2">
                    <h1 className="text-3xl flex items-center gap-2 font-black tracking-tighter text-white"><FilmIcon size={32} /> My <span className="text-emerald-500">Watchlist</span></h1>
                    <p className="text-zinc-500 text-sm">Movies youve saved to watch later.</p>
                </header>

                <WatchListClient initialData={list} />
            </div>
        </div>
    );
}

export default WatchList;