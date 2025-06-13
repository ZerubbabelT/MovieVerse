interface BaseMedia {
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  popularity: number;
  genre_ids: number[];
  media_type?: "movie" | "tv"; // optional
}

export interface Movie extends BaseMedia {
  title: string;
  release_date: string;
  media_type: "movie";
}

export interface Genre {
  id: number;
  name: string;
  src: string;
}

export interface TVShow extends BaseMedia {
  name: string;
  first_air_date: string;
  media_type: "tv";
}

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  popularity: number;
  release_date: string;
  genres: Genre[];
  media_type?: "movie";
  runtime: number;
  status: string;
}

export interface Video {
  id: string;
  key: string; // YouTube video key
  name: string;
  site: "YouTube" | string;
  size: number;
  type: "Trailer" | "Teaser" | "Clip" | string;
  official: boolean;
  published_at: string;
}

export interface VideoListResponse {
  id: number;
  results: Video[];
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface TVShowListResponse {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}
