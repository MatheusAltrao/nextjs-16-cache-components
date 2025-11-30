import { BASE_URL } from "../const/base-url";

export async function fetchCurrentTimeNoCache() {
    const response = await fetch(BASE_URL)
    const data = await response.json();
    return data.time;
}

export async function fetchCurrentTimeWithUseCache() {
    "use cache"

    const response = await fetch(BASE_URL)
    const data = await response.json();
    return data.time;
}