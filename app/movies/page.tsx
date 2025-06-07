"use client";
import MovieGrid from "@/components/movie/MovieGrid";
import { tmdbAPi } from "@/lib/tmdb";
import { MovieListResponse } from "@/types/tmdb";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Movies = () => {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<MovieListResponse>({
    queryKey: ["movies"],
    queryFn: ({ pageParam = 1 }: { pageParam?: unknown }) =>
      tmdbAPi.getPopularMovies(typeof pageParam === "number" ? pageParam : 1),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  const allMovies =
    data?.pages
      .flatMap((page) => page.results)
      .filter(
        (movie, index, self) =>
          self.findIndex((m) => m.id === movie.id) === index
      ) || [];
  return (
    <div className="p-15">
      {error && (
        <>
          <p>Error loading trending movies</p>
          <pre>
            {error instanceof Error ? error.message : JSON.stringify(error)}
          </pre>
        </>
      )}
      <MovieGrid
        data={allMovies}
        isLoading={isLoading}
        title="Movies"
        media="movie"
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

export default Movies;
