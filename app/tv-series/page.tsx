"use client";
import MovieGrid from "@/components/movie/MovieGrid";
import { Button } from "@/components/ui/button";
import { tvGenres } from "@/lib/genres";
import { tmdbAPi } from "@/lib/tmdb";
import { Genre, TVShowListResponse } from "@/types/tmdb";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

const Tvs = () => {
  const { ref, inView } = useInView();
  const route = useRouter();
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

  const allTvs = useMemo(() => {
    return (
      data?.pages
        .flatMap((page) => page.results)
        .filter(
          (tv, index, self) => self.findIndex((t) => t.id === tv.id) === index
        ) || []
    );
  }, [data]);
  return (
    <div className="p-15">
      <div className="my-3">
        {tvGenres.map((genre: Genre) => (
          <Button
            onClick={() => route.push(genre.src)}
            key={genre.id}
            className="text-sm px-3 py-1 bg-sky-500 rounded-lg cursor-pointer hover:bg-sky-300 transition mx-1 my-1"
          >
            {genre.name}
          </Button>
        ))}
      </div>
      {error && (
        <>
          <p>Error loading tvshows</p>
          <pre>
            {error instanceof Error ? error.message : JSON.stringify(error)}
          </pre>
        </>
      )}
      <MovieGrid data={allTvs} isLoading={isLoading} title="Tv Series" />
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

export default Tvs;
