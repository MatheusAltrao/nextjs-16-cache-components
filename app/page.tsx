import { Suspense } from "react";
import { onUpdateCurrentTag } from "./actions/on-update-current-tag-action";
import { CurrentTimeNoCache, CurrentTimeWithUseCache, CurrentTimeWithUseCacheAndCacheLife, CurrentTimeWithUseCacheAndCacheTag } from "./components/fetchers/current-time-no-cache";
import UpdateCurrentTimeButton from "./components/update/update-current-time-button";

export default function Home() {

  return (
    <div className="p-6 w-full max-w-[800px] mx-auto space-y-4" >
      <Suspense fallback={<div>Loading no cache...</div>}>
        <CurrentTimeNoCache />
      </Suspense>

      <CurrentTimeWithUseCache />

      <CurrentTimeWithUseCacheAndCacheLife />

      <div className="bg-zinc-900 rounded-md" >
        <CurrentTimeWithUseCacheAndCacheTag />
        <UpdateCurrentTimeButton onUpdate={onUpdateCurrentTag} />
      </div>
    </div>
  );
}
