"use client";

import { tmdbAPi } from "@/lib/tmdb";
import { TVShow } from "@/types/tmdb";
import { useQuery } from "@tanstack/react-query";
import MovieGrid from "../movie/MovieGrid";

const TrendingTvs = () => {
  const { data, error, isLoading } = useQuery<TVShow[]>({
    queryKey: ["trending-tvs"],
    queryFn: async () => {
      const response = await tmdbAPi.getTrendingTVShows();
      return response.results
        .sort((a: TVShow, b: TVShow) => b.popularity - a.popularity)
        .slice(0, 12);
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
        data={data ?? []}
        title="Trending Tv shows"
        media="tv"
      />
    </div>
  );
};

export default TrendingTvs;
