import React from "react";

const MovieGridSkeleton = ({ title }: { title: string }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="w-full aspect-[2/3] bg-gray-400 dark:bg-gray-800 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGridSkeleton;
