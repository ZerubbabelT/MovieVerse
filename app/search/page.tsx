"use client";
import MovieGrid from "@/components/movie/MovieGrid";
import MovieGridSkeleton from "@/components/skeleton/MovieGridSkeleton";
import { Input } from "@/components/ui/input";
import { tmdbAPi } from "@/lib/tmdb";
import { MovieListResponse, TVShowListResponse } from "@/types/tmdb";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(query || "");

  useEffect(() => {
    setSearchQuery(query ?? "");
  }, [query]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!query) {
        throw new Error("No search query provided");
      }
      const [movieRes, tvRes]: [MovieListResponse, TVShowListResponse] =
        await Promise.all([
          tmdbAPi.getSearchMovies(query),
          tmdbAPi.getSearchTvShows(query),
        ]);
      return {
        movies: movieRes.results,
        tvShows: tvRes.results,
      };
    },
    enabled: !!query,
  });

  const searchResults = [...(data?.movies || []), ...(data?.tvShows || [])]
    .sort((a, b) => b.popularity - a.popularity)
    .filter((item) => item.popularity > 10);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  return (
    <div className="p-15">
      <div className="flex items-center justify-center mb-12">
        <form
          onSubmit={handleSearch}
          className="relative w-xl md:w-3xl lg:w-3xl"
        >
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search movies & Tv ..."
            type="search"
            autoComplete="off"
            className="pl-8 w-full h-10 border-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
      {searchResults.length > 0 ? (
        <MovieGrid
          isLoading={isLoading}
          data={searchResults}
          title={`Search results for "${query}"`}
        />
      ) : (
        <div className="text-center text-muted-foreground">
          {isLoading ? (
            <MovieGridSkeleton title="Searching movies & Tvs ...." />
          ) : error ? (
            <p className='text-center text-3xl text-red-500'>Error fetching search results</p>
          ) : !query ? (
            <div className="flex flex-col gap-4 items-center h-64 mt-15">
              <Search className="w-20 h-20" />
              <p className="text-2xl dark:text-white text-black">
                Search Movies & TV Shows
              </p>
              <p className="text-base">
                Enter a search term to find your favorite content
              </p>
            </div>
          ) : (
            <p className="text-center text-4xl mt-10 text-muted-foreground">
              :( No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
