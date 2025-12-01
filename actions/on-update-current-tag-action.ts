'use server'

import { updateTag } from "next/cache"

export async function onUpdateCurrentTag() {
    updateTag('current-time')
}