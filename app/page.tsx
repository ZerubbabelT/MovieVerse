import Hero from "@/components/layout/Hero";
import TopTenMovies from "@/components/movie/TopTenMovies";
import TrendingMovies from "@/components/movie/TrendingMovies";

export default function Home() {
  return (
    <div className="flext flex-col bg-accent min-h-screen">
      {/* hero section */}
      <Hero />
      <div className="flex flex-col xl:flex-row justify-between gap-8">
        {/* left side */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold my-1.5">Trending Movies</h2>
          {/* <TrendingMovies /> */}
        </div>
        {/* top 10 this week section */}
        <TopTenMovies />
      </div>
    </div>
  );
}
