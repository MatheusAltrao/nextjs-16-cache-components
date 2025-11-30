import { Suspense } from 'react'
import {
  CurrentTimeNoCache,
  CurrentTimeWithUseCache,
  CurrentTimeWithUseCacheAndCacheLife,
  CurrentTimeWithUseCacheAndCacheTag,
  GetUserCookies,
} from './components/fetchers/current-time-fetchers'
import UpdateCookies from './components/ui/update-cookies-button'
import UpdateCurrentTimeButton from './components/ui/update-current-time-button'

export default function Home() {
  return (
    <div className="p-6 w-full max-w-[800px] mx-auto space-y-4">
      <Suspense fallback={<div>Loading no cache...</div>}>
        <CurrentTimeNoCache />
      </Suspense>

      <CurrentTimeWithUseCache />

      <Suspense fallback={<div>Loading cache seconds...</div>}>
        <CurrentTimeWithUseCacheAndCacheLife />
      </Suspense>

      <div className="bg-zinc-900 rounded-md">
        <CurrentTimeWithUseCacheAndCacheTag />
        <UpdateCurrentTimeButton />
      </div>

      <Suspense fallback={<div>Loading cookies...</div>}>
        <GetUserCookies />
        <UpdateCookies />
      </Suspense>
    </div>
  )
}
