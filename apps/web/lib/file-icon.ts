import type { StorageItem } from '@/types/storage'

const extensionIcons: Record<string, string> = {
    '7z': 'archive',
    ace: 'archive',
    arc: 'archive',
    arj: 'archive',
    dmg: 'archive',
    gz: 'archive',
    iso: 'archive',
    lzh: 'archive',
    pkg: 'archive',
    rar: 'archive',
    sit: 'archive',
    tar: 'archive',
    tgz: 'archive',
    zip: 'archive',
    csv: 'csv',
    doc: 'docx',
    docm: 'docx',
    docx: 'docx',
    pdf: 'pdf',
    ppt: 'pptx',
    pptm: 'pptx',
    pptx: 'pptx',
    md: 'md',
    markdown: 'md',
    one: 'one',
    onetoc: 'onetoc',
    rtf: 'rtf',
    txt: 'txt',
    html: 'html',
    htm: 'html',
    exe: 'exe',
    xls: 'xlsx',
    xlsm: 'xlsx',
    xlsx: 'xlsx',
    xltx: 'xltx',
    xml: 'xml',
    vsd: 'vsdx',
    vsdx: 'vsdx',
}

const mimeIcons: Record<string, string> = {
    'application/pdf': 'pdf',
    'application/zip': 'archive',
    'application/x-7z-compressed': 'archive',
    'application/x-rar-compressed': 'archive',
    'application/msword': 'docx',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
    'text/csv': 'csv',
    'text/html': 'html',
    'text/plain': 'txt',
    'text/markdown': 'md',
    'application/xml': 'xml',
    'text/xml': 'xml',
}

export function fileIconUrl(item: Pick<StorageItem, 'kind' | 'name' | 'mimeType'>): string {
    if (item.kind === 'folder') return '/icons/file/archive.svg'

    const mimeType = item.mimeType?.toLowerCase()
    const extension = item.name.split('.').pop()?.toLowerCase() || ''
    const iconName = (mimeType ? mimeIcons[mimeType] : undefined) || extensionIcons[extension]

    if (iconName) return `/icons/file/${iconName}.svg`
    if (mimeType?.startsWith('video/')) return '/icons/file/video.svg'
    if (mimeType?.startsWith('audio/')) return '/icons/file/audio.svg'
    if (mimeType?.startsWith('image/')) return '/icons/file/photo.svg'
    if (mimeType?.startsWith('text/')) return '/icons/file/txt.svg'

    return '/icons/file/txt.svg'
}
