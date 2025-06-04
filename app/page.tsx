import Hero from "@/components/layout/Hero";

export default function Home() {
  return (
    <div className="flext flex-col bg-accent min-h-screen">
      {/* hero section */}
      <Hero />
      <h2 className="text-2xl font-bold">Trending Movies</h2>

      <h2 className="text-2xl font-bold">Popular Movies</h2>
      {/* PopularMovies component will go here */}

      <h2 className="text-2xl font-bold">Now Playing in Theaters</h2>

      {/* Now Playing in Theaters component will go here */}
    </div>
  );
}
