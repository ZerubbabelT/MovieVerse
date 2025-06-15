"use client";

import { Button } from "@/components/ui/button";
import { tvGenres } from "@/lib/genres";
import { tmdbAPi } from "@/lib/tmdb";
import type { Genre, TvDetail } from "@/types/tmdb";
import { useQuery } from "@tanstack/react-query";
import { Bookmark, Calendar, Film, PlayIcon, Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import TvRecommendations from "./TvRecommendations";
import TvTrailer from "./TvTrailer";
import { useRef } from "react";

const getGenreNames = (ids: number[]): string[] => {
  return ids
    .map((id) => tvGenres.find((genre: Genre) => genre.id === id)?.name)
    .filter((name): name is string => Boolean(name));
};

const TvDetailPage = () => {
  const trailerRef = useRef<HTMLDivElement>(null);
  const handleScrollToTrailer = () => {
    trailerRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  const { id } = useParams();
  const { data, error, isLoading } = useQuery<TvDetail>({
    queryKey: ["tv-detail", id],
    queryFn: () => tmdbAPi.getTVShowDetails(Number(id)),
  });

  if (isLoading || !data) {
    return (
      <div className="relative h-[70vh] bg-gradient-to-r from-background-900 to-background-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-center text-4xl mt-10 text-muted-foreground">
          Error Loading TV detail
        </p>
        <pre className="text-red text-sm">{error.message}</pre>
      </div>
    );
  }

  return (
    <div className="mb-10">
      {/* backdrop */}
      <div className="relative overflow-hidden h-[60vh]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${data.backdrop_path}')`,
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/100 via-transparent to-transparent" />
        </div>
      </div>
      {/* content */}
      <div className="relative px-20 max-md:px-8 py-6 flex flex-1 max-sm:flex-col justify-center gap-8 -mt-36 max:sm:p-6 z-10">
        <Image
          width={220}
          height={230}
          alt={data.name}
          src={
            data.poster_path
              ? `https://image.tmdb.org/t/p/original${data.poster_path}`
              : "/fallback.png"
          }
          className="object-cover rounded-lg max-sm:mx-auto max-sm:w-[60%] shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
        />
        <div className="flex flex-col gap-3">
          <p className="text-3xl font-semibold flex flex-col gap-1">
            <small className="text-sm text-sky-600 font-mono">
              TV Show | {data.status}
            </small>
            {data.name}
          </p>
          <div className="flex gap-2.5">
            {getGenreNames(data.genres.map((g) => g.id)).map((genre) => (
              <Button
                key={genre}
                variant="outline"
                className="rounded-full cursor-pointer"
              >
                {genre}
              </Button>
            ))}
          </div>
          <p className="w-lg max-lg:w-sm text-lg font-medium">
            {data.overview}
          </p>
          <p className="flex items-center gap-2 font-medium text-md">
            <Star className="fill-current h-6 w-6 text-yellow-500" />
            {data.vote_average.toFixed(1)} | <Calendar className="h-5 w-5" />
            {new Date(data.first_air_date).getFullYear()} |{" "}
            {data.number_of_seasons} seasons, {data.number_of_episodes} episodes
          </p>
          <div className="flex space-x-4 my-2">
            <Button size="lg" className="cursor-pointer" onClick={handleScrollToTrailer}>
              <PlayIcon className="h-5 w-5 mr-2" />
              Watch Trailer
            </Button>
            <Button size="lg" variant="outline" className="cursor-pointer">
              <Bookmark className="h-5 w-5 mr-2" />
              Add to BookMark
            </Button>
          </div>
        </div>
      </div>

      {/* trailers */}
      <div className="flex flex-col mx-30 mt-10 max-md-mx-15 max-sm:mx-5 gap-4" ref={trailerRef}>
        <h1 className="font-bold text-5xl flex gap-2 items-center">
          <Film className="w-10 h-10" />
          Trailers
        </h1>
        <TvTrailer />
      </div>

      {/* recommendations */}
      <TvRecommendations />
    </div>
  );
};

export default TvDetailPage;
