import React from 'react'

import { Image } from 'antd'

import type { TFile } from '@api/models/file/type/TFile'
import { formatFileSize } from '@utils/formatFileSize'

import styles from './index.module.scss'

export type MediaGalleryProps = {
  files: TFile[]
  thumbUrl: (id: number) => string | undefined
  originalUrl: (id: number) => string | undefined
  ensureOriginal: (id: number) => void
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({
  files,
  thumbUrl,
  originalUrl,
  ensureOriginal,
}) => {
  const images = files.filter(
    file => file.mime_type.startsWith('image/') && Boolean(thumbUrl(file.id))
  )

  if (images.length === 0) {
    return null
  }

  return (
    <div className={styles.gallery}>
      <Image.PreviewGroup>
        {images.map(file => {
          const thumb = thumbUrl(file.id)
          const original = originalUrl(file.id) ?? thumb

          return (
            <Image
              key={file.id}
              width={120}
              height={120}
              className={styles.thumb}
              src={thumb}
              alt={file.original_name}
              title={`${file.original_name} (${formatFileSize(file.size_bytes)})`}
              preview={{
                src: original,
                onVisibleChange: visible => {
                  if (visible) {
                    ensureOriginal(file.id)
                  }
                },
              }}
            />
          )
        })}
      </Image.PreviewGroup>
    </div>
  )
}
