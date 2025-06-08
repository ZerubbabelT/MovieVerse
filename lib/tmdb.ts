import axios from "axios";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = TMDB_API_KEY ? `https://api.themoviedb.org/3/` : "";

const fetcher = async (endpoint: string) => {
  if (!TMDB_API_KEY) throw new Error("TMDB_API_KEY is not set");
  try {
    const url = `${BASE_URL}${endpoint}${
      endpoint.includes("?") ? "&" : "?"
    }api_key=${TMDB_API_KEY}&language=en-US&adult=false`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from TMDB:", error);
    throw error;
  }
};

export const tmdbAPi = {
  getMovieDetails: (id: number) => fetcher(`movie/${id}`),
  getPopularMovies: (pageNumber: number = 1) => fetcher(`movie/popular?page=${pageNumber}`),
  getTrendingMovies: () => fetcher("trending/movie/day"),
  getTrendingWeeklyMovies: () => fetcher("trending/movie/week"),
  getNowPlayingMovies: () => fetcher("movie/now_playing"),
  getUpcomingMovies: () => fetcher(`movie/changes?page=1`),
  getTopRatedMovies: (pageNumber:number = 1) => fetcher(`movie/top_rated?page=${pageNumber}`),

  getTVShowDetails: (id: number) => fetcher(`tv/${id}`),
  getPopularTVShows: () => fetcher("tv/popular"),
  getTrendingTVShows: (pageNumber: number = 1) => fetcher(`trending/tv/day?page=${pageNumber}`),
  getAiringTodayTvShows: () => fetcher("tv/airing_today"),
  getTopRatedTvShows: (pageNumber:number = 1) => fetcher(`tv/top_rated?page=${pageNumber}`),

  getSearchMovies: (query: string) =>
    fetcher(`search/movie?query=${encodeURIComponent(query)}`),
  getSearchTvShows: (query: string) =>
    fetcher(`search/tv?query=${encodeURIComponent(query)}`),
};
