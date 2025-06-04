import Image from "next/image";
import { Movie } from "@/types/tmdb";
import { Star } from "lucide-react";

const MovieListItem = ({ movie, index }: { movie: Movie; index: number }) => (
  <div className="flex space-x-3 group cursor-pointer hover:bg-accent/50 rounded p-2 transition-colors">
    <div className="relative">
      <Image
        width={48}
        height={64}
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
            : "/fallback.jpg"
        }
        alt={movie.title}
        className="w-12 h-16 object-cover rounded"
      />
      <div className="absolute -top-1 -left-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
        {index + 1}
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
        {movie.title}
      </h4>
      <div className="flex items-center space-x-1 mt-1">
        <Star className="h-3 w-3 text-yellow-400 fill-current" />
        <span className="text-xs text-muted-foreground">
          {movie.vote_average.toFixed(2)}
        </span>
      </div>
    </div>
  </div>
);
export default MovieListItem;
