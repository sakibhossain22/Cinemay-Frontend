const API_KEY = "ce2a7837d2f4c072f0976a85f1d3a08a"; // আপনার TMDB API কী এখানে দিন


export async function getMovieCast(movieId: string, type: string) {
    const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${movieId}/credits?api_key=${API_KEY}`
    );
    const data = await res.json();
    return data.cast;
}
export async function getMovieTrailers(movieId: string) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
    ); const data = await res.json();
    return data.results;
}


export async function getMovieBackDrop(movieId: string, type: string = "movie") {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/${type}/${movieId}?api_key=${API_KEY}`,
            { next: { revalidate: 3600 } }
        );

        if (!res.ok) throw new Error("Failed to fetch backdrop data");

        const data = await res.json();

        if (data.backdrop_path) {
            return `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`;
        }
        return null;
    } catch (error) {
        console.error("Error fetching backdrop:", error);
        return null;
    }
}
