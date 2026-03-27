const API_KEY = "ce2a7837d2f4c072f0976a85f1d3a08a"; // আপনার TMDB API কী এখানে দিন


export async function getMovieCast(movieId: string, type: string) {
    console.log(type)
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