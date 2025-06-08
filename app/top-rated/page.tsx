"use client";
import MovieGrid from "@/components/movie/MovieGrid";
import shuffle from "@/lib/shuffle";
import { tmdbAPi } from "@/lib/tmdb";
import {
  Movie,
  TVShow,
  MovieListResponse,
  TVShowListResponse,
} from "@/types/tmdb";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

const TopRated = () => {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<{
    results: (Movie | TVShow)[];
    page: number;
    total_pages: number;
  }>({
    queryKey: ["top-rated"],
    queryFn: async ({ pageParam = 1 }) => {
      const [movies, tvs]: [MovieListResponse, TVShowListResponse] =
        await Promise.all([
          tmdbAPi.getTopRatedMovies(pageParam as number),
          tmdbAPi.getTopRatedTvShows(pageParam as number),
        ]);

      const results = [...(movies.results ?? []), ...(tvs.results ?? [])];
      return {
        results,
        page: movies.page, // or tvs.page, same shit
        total_pages: Math.max(movies.total_pages, tvs.total_pages),
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const allTopRated = data?.pages.flatMap((page) => page.results) || [];

  const shuffledTopRated = useMemo(() => {
    return shuffle(allTopRated)
  }, [allTopRated]);
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
        data={shuffledTopRated.sort((a, b) => b.popularity - a.popularity)}
        title="Top Rated Movies & TV Shows"
        isLoading={isLoading}
      />
      <div ref={ref} className="text-center mt-10">
        {isFetchingNextPage ? (
          <div className="relative flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TopRated;
