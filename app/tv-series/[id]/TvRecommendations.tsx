"use client";
import MovieGrid from "@/components/movie/MovieGrid";
import { tmdbAPi } from "@/lib/tmdb";
import { TVShowListResponse } from "@/types/tmdb";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const TvRecommendations = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery<TVShowListResponse>({
    queryKey: ["tv-recommendations", id],
    queryFn: () => tmdbAPi.getTvRecommendations(Number(id)),
  });
  console.log("TV Recommendations Data:", data);
  if (error) {
    return (
      error && (
        <>
          <p>Error loading Tvs</p>
          <pre>
            {error instanceof Error ? error.message : JSON.stringify(error)}
          </pre>
        </>
      )
    );
  }
  const recommendedTvs = data?.results.slice(0, 10);
  return (
    <div className="p-15">
      <MovieGrid
        data={recommendedTvs ?? []}
        isLoading={isLoading}
        title="Related Tv"
      />
    </div>
  );
};

export default TvRecommendations;
