"use client";
import { Movie } from "@/types/tmdb";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Calendar, Star } from "lucide-react";
import { useRouter } from "next/navigation";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/movies/${movie.id}`);
  };
  return (
    <Card
      key={movie.id}
      className="p-0 m-0 group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 bg-card/50 backdrop-blur-sm"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-lg">
          <div className="aspect-[2/3] relative">
            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/fallback.png"
              }
              alt={movie.title}
              width={148}
              height={222}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          {/* rating position */}
          <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded-md flex items-center space-x-1 backdrop-blur-sm">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs font-semibold">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
        {/* title   */}
        <div className="p-3">
          <h3 className="font-semibold text-sm mb-1">{movie.title}</h3>
          {/* release date */}
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(movie.release_date).getFullYear()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
