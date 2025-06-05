import { Movie } from "@/types/tmdb";
import MovieCard from "./MovieCard";
import MovieGridSkeleton from "../skeleton/MovieGridSkeleton";

interface MovieGridProps {
  movieData: Movie[];
  title: string;
  isLoading: boolean;
}

const MovieGrid = ({ movieData, title, isLoading }: MovieGridProps) => {
  if (isLoading) {
    return <MovieGridSkeleton title={title}/>
  }
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">
        {movieData.map((movie: Movie) => (
          <MovieCard movie={movie} key={movie.id}/>
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
