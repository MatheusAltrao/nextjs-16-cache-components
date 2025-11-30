import { cacheLife, cacheTag } from "next/cache";
import { BASE_URL } from "../const/base-url";

export async function fetchCurrentTimeNoCache() {
    const response = await fetch(BASE_URL)
    const data = await response.json();
    return data.time;
}

export async function fetchCurrentTimeWithUseCache() {
    "use cache" // 15 minutes by default

    const response = await fetch(BASE_URL)
    const data = await response.json();
    return data.time;
}

export async function fetchCurrentTimeWithUseCacheAndCacheLife() {
    "use cache"
    cacheLife("days")

    const response = await fetch(BASE_URL)
    const data = await response.json();
    return data.time;
}

export async function fetchCurrentTimeWithUseCacheAndCacheTag() {
    "use cache"
    cacheTag('current-time')

    const response = await fetch(BASE_URL)
    const data = await response.json();
    return data.time;
}