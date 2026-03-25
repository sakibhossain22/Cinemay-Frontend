import EditMovieForm from "@/components/admin/EditMovieForm";
import { getMovieDetails } from "@/services/movieService";

async function UpdateMovie({ params }: { params: { id: string } }) {
    const { id } = await params;
    const movieResponse = await getMovieDetails(id);
    const movie = movieResponse;

    if (!movie) {
        return <div className="p-10 text-white">Movie not found!</div>;
    }

    return (
        <div className="min-h-screen bg-black p-4 md:p-10">
            <div className="max-w-4xl mx-auto mb-10 text-center">
                <h1 className="text-4xl font-black text-white tracking-tighter">
                    EDIT <span className="text-emerald-500">MOVIE</span>
                </h1>
                <p className="text-zinc-500 font-bold mt-2">Update information for: {movie.title}</p>
            </div>

            <EditMovieForm initialData={movie} />
        </div>
    );
}

export default UpdateMovie;