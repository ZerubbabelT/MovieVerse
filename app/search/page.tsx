import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xl">Loading...</div>}>
      <SearchPageClient />
    </Suspense>
  );
}
