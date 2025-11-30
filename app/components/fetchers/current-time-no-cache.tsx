import { fetchCurrentTimeNoCache, fetchCurrentTimeWithUseCache, fetchCurrentTimeWithUseCacheAndCacheLife } from "../../http/fetch-current-time";
import CardCurrentTime from "../card-current-time";

export async function CurrentTimeNoCache() {
    const currentTimeNoCache = await fetchCurrentTimeNoCache();
    return <CardCurrentTime title="currentTimeNoCache" value={currentTimeNoCache} />;
}

export async function CurrentTimeWithUseCache() {
    const currentTimeWithUseCache = await fetchCurrentTimeWithUseCache();
    return <CardCurrentTime title="currentTimeWithUseCache" value={currentTimeWithUseCache} />;
}

export async function CurrentTimeWithUseCacheAndCacheLife() {
    const CurrentTimeWithUseCacheAndCacheLife = await fetchCurrentTimeWithUseCacheAndCacheLife();
    return <CardCurrentTime title="currentTimeWithUseCache" value={CurrentTimeWithUseCacheAndCacheLife} />;
}

