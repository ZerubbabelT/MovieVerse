import Hero from "@/components/layout/Hero";
import NowPlayingInTheaters from "@/components/movie/NowPlayingInTheaters";
import PopularMovies from "@/components/movie/PopularMovies";
import TopTenMovies from "@/components/movie/TopTenMovies";
import TrendingMovies from "@/components/movie/TrendingMovies";
import PopularTvs from "@/components/tv/PopularTvs";
import TrendingTvs from "@/components/tv/TrendingTvs";

export default function Home() {
  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* hero section */}
      <Hero />
      <div className="flex flex-col xl:flex-row justify-between gap-8 p-3 xl:p-7">
        {/* left side */}
        <div className="flex flex-col">
          {/* movies */}
          <TrendingMovies />
          <PopularMovies />
          <NowPlayingInTheaters />
          {/* tvs  */}
          <TrendingTvs />
          <PopularTvs />
        </div>
        {/* top 10 this week section */}
        <TopTenMovies />
      </div>
    </div>
  );
}
