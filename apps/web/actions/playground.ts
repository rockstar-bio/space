'use server'

import * as storageActions from '@/actions/storage'

const actions = storageActions as Record<string, (...args: unknown[]) => Promise<unknown>>

export type PlaygroundActionName = keyof typeof storageActions

function serializeResult(value: unknown, seen = new WeakSet<object>()): unknown {
  if (value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'undefined') return null
  if (typeof value === 'function') return `[Function ${value.name || 'anonymous'}]`
  if (typeof value !== 'object') return String(value)
  if (seen.has(value)) return '[Circular]'

  seen.add(value)

  if (Array.isArray(value)) {
    return value.map((item) => serializeResult(item, seen))
  }

  const prototype = Object.getPrototypeOf(value)
  if (prototype !== Object.prototype && prototype !== null) {
    return {
      type: value.constructor?.name || 'Object',
      keys: Object.keys(value),
    }
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !/token|secret|authorization/i.test(key))
      .map(([key, entry]) => [key, serializeResult(entry, seen)]),
  )
}

export async function runPlaygroundAction(
  actionName: PlaygroundActionName,
  input: string,
) {
  const startedAt = performance.now()

  try {
    const action = actions[actionName]

    if (typeof action !== 'function') {
      throw new Error(`Export ${actionName} is not callable`)
    }

    const parsed = JSON.parse(input || '[]') as unknown
    const args = Array.isArray(parsed) ? parsed : [parsed]
    const data = serializeResult(await action(...args))

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
