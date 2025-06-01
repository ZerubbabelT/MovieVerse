import axios  from 'axios';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = TMDB_API_KEY
    ? `https://api.themoviedb.org/3/?api_key=${TMDB_API_KEY}&language=en-US`
    : '';

const fetcher = async (url: string) => {
    try {
        const response = await axios.get(`${BASE_URL}${url}`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching data from TMDB:', error);
        throw error;
    }
}

export const tmdbAPi = {
        getMovieDetails: (id:number) => fetcher(`movie/${id}`),
        getPopularMovies: () => fetcher('movie/popular'),
        getTrendingMovies: () => fetcher('trending/movie/day'),
        getTrendingWeeklyMovies: () => fetcher('trending/movie/week'),
        getNowPlayingMovies: () => fetcher('movie/now_playing'),
        getUpcomingMovies: () => fetcher('movie/upcoming'),
        getTopRatedMovies: () => fetcher('movie/top_rated'),
        
        getTVShowDetails: (id:number) => fetcher(`tv/${id}`),
        getPopularTVShows: () => fetcher('tv/popular'),
        getTrendingTVShows: () => fetcher('trending/tv/day'),
        getAiringTodayTvShows: () => fetcher('tv/airing_today'),

        getSearchMovies: (query: string) => fetcher(`search/movie?query=${encodeURIComponent(query)}`),
        getSearchTvShows: (query: string) => fetcher(`search/tv?query=${encodeURIComponent(query)}`),
}
