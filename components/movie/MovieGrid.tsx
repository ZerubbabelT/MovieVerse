import { Movie, TVShow } from "@/types/tmdb";
import MovieCard from "./MovieCard";
import MovieGridSkeleton from "../skeleton/MovieGridSkeleton";
import TvCard from "../tv/TvCard";

interface MovieGridProps {
  data: Movie[] | TVShow[];
  title: string;
  isLoading: boolean;
  media: "movie" | "tv"
}

const MovieGrid = ({ data, title, isLoading, media }: MovieGridProps) => {
  if (isLoading) {
    return <MovieGridSkeleton title={title} />;
  }
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">
        {media == "movie"
          ? (data as Movie[]).map((movie: Movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))
          : (data as TVShow[]).map((tv: TVShow) => (
              <TvCard tv={tv} key={tv.id} />
            ))}
      </div>
    </div>
  );
};

export default MovieGrid;
