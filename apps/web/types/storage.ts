export type StorageItem = {
  id: string
  name: string
  kind: 'file' | 'folder'
  size?: number
  mimeType?: string
  lastModifiedAt?: string
  parentId?: string
  thumbnailUrl?: string
  downloadUrl?: string
}

export type StoragePage = {
  items: StorageItem[]
  cursor: string | null
  hasMore: boolean
}

export type StorageSearch = {
  query?: string
  parentId?: string
  cursor?: string
  limit?: number
}

export type MigrationCheckpoint = {
  sourceKey: string
  destinationKey?: string
  bytesCopied: number
  checksum?: string
}

export interface StorageProvider {
  list(input?: StorageSearch): Promise<StoragePage>
  getMetadata(id: string): Promise<StorageItem | null>
  search(input: StorageSearch): Promise<StoragePage>
  getDownloadUrl(id: string): Promise<string | null>
  getThumbnailUrl(id: string): Promise<string | null>
  saveMigrationCheckpoint(checkpoint: MigrationCheckpoint): Promise<void>
  verifyIntegrity(id: string, checksum: string): Promise<boolean>
}
