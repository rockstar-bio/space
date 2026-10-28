import type { StorageItem, StoragePage, StorageProvider, StorageSearch } from '@/types/storage'

const items: StorageItem[] = [
  { id: 'repair-resources', name: 'Repair resources', kind: 'folder' },
  { id: 'firmware', name: 'Firmware', kind: 'folder' },
  { id: 'tools', name: 'Technical tools', kind: 'folder' },
  { id: 'documentation', name: 'Documentation', kind: 'folder' },
]

const page = (results: StorageItem[]): StoragePage => ({
  items: results,
  cursor: null,
  hasMore: false,
})

export const mockStorage: StorageProvider = {
  async list(input: StorageSearch = {}) {
    const query = input.query?.trim().toLowerCase()
    return page(query ? items.filter((item) => item.name.toLowerCase().includes(query)) : items)
  },
  async getMetadata(id) {
    return items.find((item) => item.id === id) ?? null
  },
  async search(input) {
    return this.list(input)
  },
  async getDownloadUrl() {
    return null
  },
  async getThumbnailUrl() {
    return null
  },
  async saveMigrationCheckpoint() {
    // Migration is intentionally not active in the mock provider.
  },
  async verifyIntegrity() {
    return false
  },
}
