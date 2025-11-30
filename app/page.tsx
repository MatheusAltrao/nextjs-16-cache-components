import { Suspense } from "react";
import { CurrentTimeNoCache } from "./components/current-time-no-cache";
import { CurrentTimeWithUseCache } from "./components/current-time-with-use-cache";

export default function Home() {
  return (
    <div className="p-6 w-full max-w-[800px] mx-auto" >
      <Suspense fallback={<div>Loading currentTimeNoCache...</div>}>
        <CurrentTimeNoCache />
      </Suspense>

      <Suspense fallback={<div>Loading currentTimeWithUseCache...</div>}>
        <CurrentTimeWithUseCache />
      </Suspense>

    </div>
  );
}
