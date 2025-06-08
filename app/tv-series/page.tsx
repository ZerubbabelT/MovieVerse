"use client";
import MovieGrid from "@/components/movie/MovieGrid";
import { tmdbAPi } from "@/lib/tmdb";
import { TVShowListResponse } from "@/types/tmdb";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Tvs = () => {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery<TVShowListResponse>({
    queryKey: ["tvs"],
    queryFn: async ({ pageParam = 1 }: { pageParam?: unknown }) =>
      await tmdbAPi.getTrendingTVShows(
        typeof pageParam === "number" ? pageParam : 1
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
      return undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, inView]);

  const allTvs =
    data?.pages
      .flatMap((page) => page.results)
      .filter(
        (tv, index, self) => self.findIndex((t) => t.id === tv.id) === index
      ) || [];
  return (
    <div className="p-15">
      {error && (
        <>
          <p>Error loading tvshows</p>
          <pre>
            {error instanceof Error ? error.message : JSON.stringify(error)}
          </pre>
        </>
      )}
      <MovieGrid
        media="tv"
        data={allTvs}
        isLoading={isLoading}
        title="Tv Series"
      />
      <div ref={ref} className="flex justify-center">
        {isFetchingNextPage ? (
          <div className="relative flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Tvs;
