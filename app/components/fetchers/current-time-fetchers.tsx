import { cookies } from 'next/headers'
import {
  fetchCurrentTimeNoCache,
  fetchCurrentTimeWithUseCache,
  fetchCurrentTimeWithUseCacheAndCacheLife,
  fetchCurrentTimeWithUseCacheAndCacheTag,
} from '../../http/fetch-current-time'
import CardCurrentTime from '../ui/card-current-time'

export async function CurrentTimeNoCache() {
  const currentTimeNoCache = await fetchCurrentTimeNoCache()
  return <CardCurrentTime title="NoCache" value={currentTimeNoCache} />
}

export async function CurrentTimeWithUseCache() {
  const currentTimeWithUseCache = await fetchCurrentTimeWithUseCache()
  return <CardCurrentTime title="UseCache" value={currentTimeWithUseCache} />
}

export async function CurrentTimeWithUseCacheAndCacheLife() {
  const currentTimeWithUseCacheAndCacheLife = await fetchCurrentTimeWithUseCacheAndCacheLife()
  return <CardCurrentTime title="UseCacheAndCacheLife Days" value={currentTimeWithUseCacheAndCacheLife} />
}

export async function CurrentTimeWithUseCacheAndCacheTag() {
  const currentTimeWithUseCacheAndCacheTag = await fetchCurrentTimeWithUseCacheAndCacheTag()
  return <CardCurrentTime title="CacheTag" value={currentTimeWithUseCacheAndCacheTag} />
}

export async function GetUserCookies() {
  'use cache: private'
  const data = await cookies()
  const dateCookie = data.get('date')
  const formatCookies = JSON.stringify(dateCookie, null, 2)
  return <CardCurrentTime title="Get cookies" value={formatCookies} />
}

export async function onUpdateUserCookies() {}
