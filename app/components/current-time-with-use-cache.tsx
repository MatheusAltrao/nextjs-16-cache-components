import { fetchCurrentTimeWithUseCache } from "../http/fetch-current-time";
import CardCurrentTime from "./card-current-time";

export async function CurrentTimeWithUseCache() {
    const currentTimeWithUseCache = await fetchCurrentTimeWithUseCache();
    return <CardCurrentTime title="currentTimeWithUseCache" value={currentTimeWithUseCache} />;
}
