"use client";
import MovieGrid from "@/components/movie/MovieGrid";
import { tvGenres } from "@/lib/genres";
import { tmdbAPi } from "@/lib/tmdb";
import { TVShow } from "@/types/tmdb";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const Genres = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const genre = tvGenres.find((genre) => genre.slug === slug);
  const genreId = genre?.id;

  const { data, error, isLoading } = useQuery<TVShow[]>({
    queryKey: ["tvs-by-genre", genreId],
    queryFn: async () => {
      const response = await tmdbAPi.getTVByGenre(genreId as number);
      return response.results;
    },
  });

  return (
    <div className="p-15">
      {error && (
        <>
          <p>Error loading Tvs</p>
          <pre>
            {error instanceof Error ? error.message : JSON.stringify(error)}
          </pre>
        </>
      )}
      <MovieGrid
        data={data ?? []}
        isLoading={isLoading}
        title={`${genre?.name} Tv Serieses`}
      />
    </div>
  );
};

export default Genres;
