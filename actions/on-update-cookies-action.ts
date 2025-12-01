'use server'

import { cookies } from 'next/headers'

export async function onUpdateCookies() {
  const cookiesStorage = await cookies()
  cookiesStorage.set('date', new Date().toISOString())
}
