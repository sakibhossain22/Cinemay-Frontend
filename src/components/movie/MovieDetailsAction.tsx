/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"
import { Button } from "../ui/button"
import { Play } from "lucide-react"

async function MovieDetailsAction({ movie, hasPurchased }: { movie: any, hasPurchased: boolean }) {
    return (
        <div>
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                {
                    hasPurchased ? <Link href={`/movies/details/${movie.customid}/play`}>
                        <Button className="bg-emerald-500 cursor-pointer hover:bg-emerald-600 text-black font-bold h-12 px-8 rounded-md transition-transform active:scale-95">
                            <Play className="mr-2 fill-current " size={20} /> Watch Online
                        </Button>
                    </Link>
                        :
                        <Button className="bg-emerald-500 cursor-pointer hover:bg-emerald-600 text-black font-bold h-12 px-8 rounded-md transition-transform active:scale-95">
                            <Play className="mr-2 fill-current " size={20} /> Buy Movie
                        </Button>
                }
                <Link href={`/movies/details/${movie.customid}/trailer`}>
                    <Button variant="secondary" className="bg-zinc-800 cursor-pointer hover:bg-zinc-700 text-white h-12 px-8 rounded-md">
                        <Play className="mr-2 fill-current " size={20} /> Watch Trailer
                    </Button>
                </Link>

            </div>
        </div>
    )
}

export default MovieDetailsAction
