"use client";
import { tmdbAPi } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";
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
        data={data ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PopularMovies;
