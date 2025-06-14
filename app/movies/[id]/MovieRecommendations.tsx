"use client";
import MovieGrid from "@/components/movie/MovieGrid";
import { tmdbAPi } from "@/lib/tmdb";
import { MovieListResponse } from "@/types/tmdb";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const MovieRecommendations = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery<MovieListResponse>({
    queryKey: ["movie-recommedations", id],
    queryFn: () => tmdbAPi.getMovieRecommendations(Number(id)),
  });
  if (error) {
    return (
      error && (
        <>
          <p>Error loading movies</p>
          <pre>
            {error instanceof Error ? error.message : JSON.stringify(error)}
          </pre>
        </>
      )
    );
  }
  const recommendedMovies = data?.results.slice(0, 10);
  return (
    <div className="p-15">
      <MovieGrid
        data={recommendedMovies ?? []}
        isLoading={isLoading}
        title="Related Movies"
      />
    </div>
  );
};

export default MovieRecommendations;
