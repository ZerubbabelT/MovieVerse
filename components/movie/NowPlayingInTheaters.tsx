"use client";
import { tmdbAPi } from "@/lib/tmdb";
import { Movie } from "@/types/tmdb";
import { useQuery } from "@tanstack/react-query";
import MovieGrid from "./MovieGrid";

const NowPlayingInTheaters = () => {
  const { data, error, isLoading } = useQuery<Movie[]>({
    queryKey: ["nowPlayingInTheaters"],
    queryFn: async () => {
      const response = await tmdbAPi.getNowPlayingMovies();
      return response.results
        .sort((a: Movie, b: Movie) => b.popularity - a.popularity)
        .slice(0, 10);
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
        title="Now Playing in Theaters"
        isLoading={isLoading}
        data={data ?? []}
      />
    </div>
  );
};

export default NowPlayingInTheaters;
