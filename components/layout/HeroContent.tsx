import { Movie, TVShow } from '@/types/tmdb';
import { Star, Play, Info } from "lucide-react";
import { Button } from "../ui/button";

interface HeroContentProps {
    data: Movie | TVShow;
    releaseYear: string;
    imagePath: string;
    isMovie: (data: Movie | TVShow) => boolean;
}

const HeroContent = ({data, releaseYear, imagePath, isMovie}: HeroContentProps) => {
  return (
        <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original${imagePath}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {"title" in data ? data.title : data.name}
          </h1>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-lg font-semibold">
                {data?.vote_average.toFixed(1)}
              </span>
            </div>
            <span className="text-lg">{releaseYear}</span>
            <span className="px-2 py-1 bg-red-600 text-sm font-semibold rounded">
              {isMovie(data) ? "Movie" : "TV Show"}
            </span>
          </div>

          <p className="text-lg mb-8 leading-relaxed opacity-90 line-clamp-3">
            {data?.overview}
          </p>

          <div className="flex space-x-4">
            <Button
              size="lg"
              className="bg-gray-200 text-black hover:bg-red-200 cursor-pointer"
            >
              <Play className="h-5 w-5 mr-2" />
              Watch Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="dark:bg-gray-200 text-black hover:bg-red-200 cursor-pointer"
            >
              <Info className="h-5 w-5 mr-2" />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroContent