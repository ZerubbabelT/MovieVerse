"use client";
import MovieGrid from "@/components/movie/MovieGrid";
import { Button } from "@/components/ui/button";
import { movieGenres } from "@/lib/genres";
import { tmdbAPi } from "@/lib/tmdb";
import { Genre, MovieListResponse } from "@/types/tmdb";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

const Movies = () => {
  const { ref, inView } = useInView();
  const route = useRouter();
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
    getNextPageParam: (lastPage) => {
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

  const allMovies = useMemo(() => {
    return (
      data?.pages
        .flatMap((page) => page.results)
        .filter(
          (movie, index, self) =>
            self.findIndex((m) => m.id === movie.id) === index
        ) || []
    );
  }, [data]);
  return (
    <div className="p-15">
      <div className="my-3">
        {movieGenres.map((genre: Genre) => (
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
          <p>Error loading movies</p>
          <pre>
            {error instanceof Error ? error.message : JSON.stringify(error)}
          </pre>
        </>
      )}
      <MovieGrid data={allMovies} isLoading={isLoading} title="Movies" />
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
