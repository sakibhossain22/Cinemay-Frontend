export interface IMovie {
    data: [
        {
            id: string;
            tmdb_id: string;
            title: string;
            customId?: string;
            type: "MOVIE" | "SERIES";
            synopsis: string;
            posterUrl?: string | null;
            genre: string[];
            releaseYear: number;
            director: string;
            category?: string[];
            cast: string[];
            streamingLink?: string | null;
            downloadLink?: string | null;
            episodeLinks?: string[];
            contentType: "FREE" | "PREMIUM";
            ratingAverage: number;
            buyPrice?: number | null;
            rentPrice?: number | null;
            rentDuration?: number | null;
        }
    ],
    meta: {
        limit: number;
        page: number;
        total: number;
        totalPage: number;
    }

}

export interface IMovieDetail {
    id: string;
    tmdb_id: string;
    title: string;
    customid?: string;
    type: "MOVIE" | "SERIES";
    synopsis: string;
    posterUrl?: string | null;
    genre: string[];
    releaseYear: number;
    director: string;
    category?: string[];
    cast: string[];
    streamingLink?: string | null;
    downloadLink?: string | null;
    episodeLinks?: string[];
    contentType: "FREE" | "PREMIUM";
    ratingAverage: number;
    buyPrice?: number | null;
    rentPrice?: number | null;
    rentDuration?: number | null;
}