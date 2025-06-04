"use client";
import { useQuery } from "@tanstack/react-query";
import { tmdbAPi } from "@/lib/tmdb";
import {
  Movie,
  MovieListResponse,
  TVShow,
  TVShowListResponse,
} from "@/types/tmdb";
import HeroContent from "./HeroContent";

const Hero = () => {
  // get trending movies and tvs of the day, choose one randomly and display it as a hero section
  const { data, error, isLoading } = useQuery<Movie | TVShow>({
    queryKey: ["trending"],
    queryFn: async () => {
      const [trendingMovies, trendingTVs]: [
        MovieListResponse,
        TVShowListResponse
      ] = await Promise.all([
        tmdbAPi.getTrendingMovies(),
        tmdbAPi.getTrendingTVShows(),
      ]);
      const allTrending = [
        ...(trendingMovies.results || []),
        ...(trendingTVs.results || []),
      ];
      if (allTrending.length === 0) {
        throw new Error("No trending movies or TV shows found");
      }
      const featured =
        allTrending[Math.floor(Math.random() * allTrending.length)];
      if (!featured) {
        throw new Error("No featured movie or TV show found");
      }
      return featured;
    },
  });

  if (isLoading || !data) {
    return (
      <div className="relative h-[70vh] bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="relative h-[70vh] bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center">
        <p className="text-white text-lg">Error loading featured content</p>
      </div>
    );
  }
  const imagePath = data?.backdrop_path || data?.poster_path || "/fallback.jpg";
  const isMovie = (item: Movie | TVShow): item is Movie => "title" in item;
  let releaseYear = "";
  if (isMovie(data) && data.release_date) {
    releaseYear = new Date(data.release_date).getFullYear().toString();
  } else if (!isMovie(data) && data.first_air_date) {
    releaseYear = new Date(data.first_air_date).getFullYear().toString();
  } else {
    releaseYear = "N/A";
  }
  return (
    <HeroContent data={data} isMovie={isMovie} releaseYear={releaseYear} imagePath={imagePath}/>
  );
};

export default Hero;
