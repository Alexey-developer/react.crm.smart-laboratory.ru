import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { TFile } from '@api/models/file/type/TFile'
import {
  FILE_PREVIEW_VARIANTS,
  type TFilePreviewVariant,
} from '@utils/constants/filePreviewVariants'

const isPreviewableImage = (file: TFile): boolean =>
  file.mime_type.startsWith('image/')

type PreviewFetcher = (
  id: number,
  variant: TFilePreviewVariant
) => Promise<Blob>

/**
 * Gallery thumbs (webp derivatives) + originals for lightbox.
 * Sanctum Bearer cannot be sent via <img> src — use object URLs.
 */
export const useAuthenticatedImagePreviewUrls = (
  files: TFile[],
  preview: PreviewFetcher
): {
  thumbUrls: Record<number, string>
  originalUrls: Record<number, string>
  ensureOriginal: (id: number) => void
} => {
  const mediaKey = useMemo(
    () =>
      files
        .filter(isPreviewableImage)
        .map(file => `${file.id}:${file.mime_type}`)
        .sort()
        .join('|'),
    [files]
  )

  const [thumbUrls, setThumbUrls] = useState<Record<number, string>>({})
  const [originalUrls, setOriginalUrls] = useState<Record<number, string>>({})
  const thumbRef = useRef(thumbUrls)
  const originalRef = useRef(originalUrls)
  thumbRef.current = thumbUrls
  originalRef.current = originalUrls

  useEffect(() => {
    let alive = true
    const wantedIds = new Set(
      mediaKey
        ? mediaKey.split('|').map(part => Number(part.split(':')[0]))
        : []
    )

    const nextThumbs: Record<number, string> = { ...thumbRef.current }
    let thumbsChanged = false

    for (const id of Object.keys(nextThumbs).map(Number)) {
      if (!wantedIds.has(id)) {
        URL.revokeObjectURL(nextThumbs[id])
        delete nextThumbs[id]
        thumbsChanged = true
      }
    }

    const nextOriginals: Record<number, string> = { ...originalRef.current }
    let originalsChanged = false
    for (const id of Object.keys(nextOriginals).map(Number)) {
      if (!wantedIds.has(id)) {
        URL.revokeObjectURL(nextOriginals[id])
        delete nextOriginals[id]
        originalsChanged = true
      }
    }

    const missingThumbIds = [...wantedIds].filter(id => !nextThumbs[id])

    if (missingThumbIds.length === 0) {
      if (thumbsChanged) {
        setThumbUrls(nextThumbs)
      }
      if (originalsChanged) {
        setOriginalUrls(nextOriginals)
      }
      return () => {
        alive = false
      }
    }

    void (async () => {
      const created: string[] = []

      await Promise.all(
        missingThumbIds.map(async id => {
          try {
            const blob = await preview(id, FILE_PREVIEW_VARIANTS.THUMB)
            const url = URL.createObjectURL(blob)
            created.push(url)
            nextThumbs[id] = url
            thumbsChanged = true
          } catch {
            // Skip broken / unauthorized thumbs.
          }
        })
      )

      if (alive) {
        if (thumbsChanged) {
          setThumbUrls({ ...nextThumbs })
        }
        if (originalsChanged) {
          setOriginalUrls({ ...nextOriginals })
        }
      } else {
        created.forEach(url => URL.revokeObjectURL(url))
      }
    })()

    return () => {
      alive = false
    }
  }, [mediaKey, preview])

  useEffect(() => {
    return () => {
      Object.values(thumbRef.current).forEach(url => URL.revokeObjectURL(url))
      Object.values(originalRef.current).forEach(url => URL.revokeObjectURL(url))
    }
  }, [])

  const ensureOriginal = useCallback(
    (id: number) => {
      if (originalRef.current[id]) {
        return
      }

      void (async () => {
        try {
          const blob = await preview(id, FILE_PREVIEW_VARIANTS.ORIGINAL)
          const url = URL.createObjectURL(blob)
          setOriginalUrls(prev => {
            if (prev[id]) {
              URL.revokeObjectURL(url)
              return prev
            }
            return { ...prev, [id]: url }
          })
        } catch {
          // Lightbox stays on thumb if original fails.
        }
      })()
    },
    [preview]
  )

  return {
    thumbUrls,
    originalUrls,
    ensureOriginal,
  }
}
