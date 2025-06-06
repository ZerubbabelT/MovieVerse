"use client";
import { tmdbAPi } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";
import MovieGridSkeleton from "../skeleton/MovieGridSkeleton";
import MovieGrid from "./MovieGrid";
import { Movie } from "@/types/tmdb";

const PopularMovies = () => {
  const { data, error, isLoading } = useQuery<Movie[]>({
    queryKey: ["popular-movies"],
    queryFn: async () => {
      const response = await tmdbAPi.getPopularMovies();
      return response.results.slice(0, 18);
    },
  });

  return (
    <div>
      {error && (
        <>
          <p>Error loading trending movies</p>
          <pre>
            {error instanceof Error ? error.message : JSON.stringify(error)}
          </pre>
        </>
      )}
      <MovieGrid
        title="Popular Movies"
        movieData={data ?? []}
        isLoading={isLoading}
        media="movie"
      />
    </div>
  );
};

export default PopularMovies;
