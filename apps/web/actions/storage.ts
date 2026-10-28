'use server'

import { mockStorage } from '@/lib/mock-storage'
import type { StorageSearch } from '@/types/storage'

export async function listStorageItems(input: StorageSearch = {}) {
  return mockStorage.list(input)
}

export async function searchStorageItems(input: StorageSearch) {
  return mockStorage.search(input)
}

export async function getStorageMetadata(id: string) {
  return mockStorage.getMetadata(id)
}
