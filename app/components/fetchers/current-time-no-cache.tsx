import { fetchCurrentTimeNoCache, fetchCurrentTimeWithUseCache, fetchCurrentTimeWithUseCacheAndCacheLife, fetchCurrentTimeWithUseCacheAndCacheTag } from "../../http/fetch-current-time";
import CardCurrentTime from "../ui/card-current-time";

export async function CurrentTimeNoCache() {
    const currentTimeNoCache = await fetchCurrentTimeNoCache();
    return <CardCurrentTime title="NoCache" value={currentTimeNoCache} />;
}

export async function CurrentTimeWithUseCache() {
    const currentTimeWithUseCache = await fetchCurrentTimeWithUseCache();
    return <CardCurrentTime title="UseCache" value={currentTimeWithUseCache} />;
}

export async function CurrentTimeWithUseCacheAndCacheLife() {
    const currentTimeWithUseCacheAndCacheLife = await fetchCurrentTimeWithUseCacheAndCacheLife();
    return <CardCurrentTime title="UseCacheAndCacheLife seconds" value={currentTimeWithUseCacheAndCacheLife} />;
}

export async function CurrentTimeWithUseCacheAndCacheTag() {
    const currentTimeWithUseCacheAndCacheTag = await fetchCurrentTimeWithUseCacheAndCacheTag();
    return <CardCurrentTime title="CacheTag" value={currentTimeWithUseCacheAndCacheTag} />;
}


