import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

 const TopTenSkeleton = () => (
    <div className="xl:w-90 xl:flex-shrink-0 m-3 mt-15">
      <div className="sticky top-20">
        <Card className="w-full bg-white dark:bg-zinc-900">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-red-500" />
              <span className="text-xl font-semibold text-zinc-900 dark:text-white">
                Top 10 This Week
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="flex space-x-3">
                  <Skeleton className="w-12 h-16 rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                    <Skeleton className="h-3 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  export default TopTenSkeleton;