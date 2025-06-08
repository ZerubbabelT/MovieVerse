import { Movie, TVShow } from "@/types/tmdb";
import MovieCard from "./MovieCard";
import MovieGridSkeleton from "../skeleton/MovieGridSkeleton";
import TvCard from "../tv/TvCard";

interface MovieGridProps {
  data: (Movie | TVShow)[];
  title: string;
  isLoading: boolean;
}

const MovieGrid = ({ data, title, isLoading }: MovieGridProps) => {
  if (isLoading) {
    return <MovieGridSkeleton title={title} />;
  }
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">
                {data.map((item) =>
          "title" in item ? (
            <MovieCard key={`movie-${item.id}`} movie={item as Movie} />
          ) : (
            <TvCard key={`tv-${item.id}`} tv={item as TVShow} />
          )
        )}

      </div>
    </div>
  );
};

export default MovieGrid;
