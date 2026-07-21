export const FILE_PREVIEW_VARIANTS = {
  THUMB: 'thumb',
  COMPRESSED: 'compressed',
  ORIGINAL: 'original',
} as const

export type TFilePreviewVariant =
  (typeof FILE_PREVIEW_VARIANTS)[keyof typeof FILE_PREVIEW_VARIANTS]
