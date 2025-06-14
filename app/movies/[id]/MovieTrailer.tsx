import { tmdbAPi } from "@/lib/tmdb";
import { Video, VideoListResponse } from "@/types/tmdb";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const MovieTrailer = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery<VideoListResponse>({
    queryKey: ["movie-trailer", id],
    queryFn: () => tmdbAPi.getMovieVideos(Number(id)),
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
          Error Loading movie detail
        </p>
        <pre className="text-red text-sm">{error.message}</pre>
      </div>
    );
  }
  const trailer = data?.results?.find(
    (vid: Video) => vid.type === "Trailer" && vid.site === "YouTube"
  );
  return (
    <div className="relative w-[70%] aspect-video mx-auto my-10">
      {trailer ? (
        <iframe
          src={`https://www.youtube.com/embed/${trailer?.key}`}
          title="Movie Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg shadow-lg"
        />
      ) : (
        <p className="text-center text-muted-foreground my-10">
          No trailer available!
        </p>
      )}
    </div>
  );
};

export default MovieTrailer;
