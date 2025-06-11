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
