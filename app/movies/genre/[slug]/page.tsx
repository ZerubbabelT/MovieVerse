"use client";
import MovieGrid from "@/components/movie/MovieGrid";
import { movieGenres } from "@/lib/genres";
import { tmdbAPi } from "@/lib/tmdb";
import { Movie } from "@/types/tmdb";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const Genres = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const genre = movieGenres.find((genre) => genre.slug === slug);
  const genreId = genre?.id;

  const { data, error, isLoading } = useQuery<Movie[]>({
    queryKey: ["movies-by-genre", genreId],
    queryFn: async () => {
      const response = await tmdbAPi.getMoviesByGenre(genreId as number);
      return response.results;
    },
  });

  return (
    <div className="p-15">
      {error && (
        <>
          <p>Error loading movies</p>
          <pre>
            {error instanceof Error ? error.message : JSON.stringify(error)}
          </pre>
        </>
      )}
      <MovieGrid
        data={data ?? []}
        isLoading={isLoading}
        title={`${genre?.name} Movies`}
      />
    </div>
  );
};

export default Genres;
