"use client";
import { useQuery } from "@tanstack/react-query";
import { tmdbAPi } from "@/lib/tmdb";
import Image from "next/image";
import { Movie, MovieListResponse } from "@/types/tmdb";

const TrendingMovies = () => {
  const { data, error, isLoading } = useQuery<MovieListResponse>({
    queryKey: ["trending-movies"],
    queryFn: () => tmdbAPi.getTrendingMovies(),
  });

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && (
        <>
          <p>Error loading trending movies</p>
          <pre>
            {error instanceof Error ? error.message : JSON.stringify(error)}
          </pre>
        </>
      )}
      {data && data.results && data.results.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 rounded shadow w-full">
          {data.results.map((movie: Movie) => (
            <li key={movie.id}>
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "<h1>Loading...</h1>"
                }
                alt={movie.title}
                width={200}
                height={250}
              />
              <h3>{movie.title}</h3>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && !error && <p>No trending movies found</p>
      )}
    </div>
  );
};

export default TrendingMovies;
