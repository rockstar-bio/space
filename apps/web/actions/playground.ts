'use server'

import { getChildren } from '@/actions/drive/children'

type PlaygroundInput = {
  slug?: string
  pageParam?: string
  top?: number
}

const actions = {
  getChildren,
} as const

export type PlaygroundActionName = keyof typeof actions

export async function runPlaygroundAction(
  actionName: PlaygroundActionName,
  input: string,
) {
  const startedAt = performance.now()

  try {
    if (!(actionName in actions)) {
      throw new Error(`Unknown server action: ${actionName}`)
    }

    const parsed = JSON.parse(input || '{}') as PlaygroundInput
    const slug = typeof parsed.slug === 'string' ? parsed.slug : ''
    const pageParam = typeof parsed.pageParam === 'string' && parsed.pageParam
      ? parsed.pageParam
      : undefined
    const top = typeof parsed.top === 'number' && Number.isFinite(parsed.top)
      ? Math.min(Math.max(Math.floor(parsed.top), 1), 200)
      : 50

    const data = await actions[actionName](slug, pageParam, top)

    return {
      ok: true,
      status: 200,
      elapsedMs: Math.round(performance.now() - startedAt),
      data,
    }
  } catch (error) {
    return {
      ok: false,
      status: 500,
      elapsedMs: Math.round(performance.now() - startedAt),
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
