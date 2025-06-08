import React from "react";

const MovieGridSkeleton = ({ title }: { title: string }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="space-x-3 animate-pulse">
            <div className="w-35 h-45 gap-3 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGridSkeleton;
