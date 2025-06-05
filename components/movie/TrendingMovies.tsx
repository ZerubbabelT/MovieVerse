"use client";
import { useQuery } from "@tanstack/react-query";
import { tmdbAPi } from "@/lib/tmdb";
import { Movie } from "@/types/tmdb";
import MovieGrid from "./MovieGrid";
import MovieGridSkeleton from "../skeleton/MovieGridSkeleton";

const TrendingMovies = () => {
  const { data, error, isLoading } = useQuery<Movie[]>({
    queryKey: ["trending-movies"],
    queryFn: async () => {
      const response = await tmdbAPi.getTrendingMovies();
      return response.results;
    },
  });

  return (
    <div>
      {isLoading && <MovieGridSkeleton title="Trending Movies"/>}
      {error && (
        <>
          <p>Error loading trending movies</p>
          <pre>
            {error instanceof Error ? error.message : JSON.stringify(error)}
          </pre>
        </>
      )}
      <MovieGrid
        movieData={data ?? []}
        isLoading={isLoading}
        title="Trending Movies"
      />
    </div>
  );
};

export default TrendingMovies;
