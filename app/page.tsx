import { Suspense } from "react";
import { CurrentTimeNoCache, CurrentTimeWithUseCache, CurrentTimeWithUseCacheAndCacheLife } from "./components/fetchers/current-time-no-cache";

export default function Home() {
  return (
    <div className="p-6 w-full max-w-[800px] mx-auto space-y-4" >
      <Suspense fallback={<div>Loading no cache...</div>}>
        <CurrentTimeNoCache />
      </Suspense>

      <Suspense fallback={<div>Loading useCache...</div>}>
        <CurrentTimeWithUseCache />
      </Suspense>

      <Suspense fallback={<div>Loading CacheLife Seconds...</div>}>
        <CurrentTimeWithUseCacheAndCacheLife />
      </Suspense>
    </div>
  );
}
