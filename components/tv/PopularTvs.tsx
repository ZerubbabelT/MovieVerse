"use client";

import { tmdbAPi } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";
import MovieGrid from "../movie/MovieGrid";
import { TVShow } from "@/types/tmdb";

const PopularTvs = () => {
  const { data, error, isLoading } = useQuery<TVShow[]>({
    queryKey: ["popular-tvs"],
    queryFn: async () => {
      const response = await tmdbAPi.getTopRatedTvShows();
      return response.results
              .sort((a: TVShow, b: TVShow) => b.popularity - a.popularity)
              .slice(0, 18);
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
        isLoading={isLoading}
        title="Popular TvShows"
        data={data ?? []}
      />
    </div>
  );
};

export default PopularTvs;
