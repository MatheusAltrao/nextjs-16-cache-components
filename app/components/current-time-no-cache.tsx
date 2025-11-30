import { fetchCurrentTimeNoCache } from "../http/fetch-current-time";
import CardCurrentTime from "./card-current-time";

export async function CurrentTimeNoCache() {
    const currentTimeNoCache = await fetchCurrentTimeNoCache();
    return <CardCurrentTime title="currentTimeNoCache" value={currentTimeNoCache} />;
}
