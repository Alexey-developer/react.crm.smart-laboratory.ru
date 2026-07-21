import { useCallback, useRef, useState } from 'react'

import * as tus from 'tus-js-client'

import { constants } from '@utils/constants/constants.json'

export type TusUploadProgress = {
  bytesUploaded: number
  bytesTotal: number
  percentage: number
  status?: 'uploading' | 'success' | 'error'
}

export type TusUploaderOptions = {
  token: string
  onSuccess?: (payload: { uploadKey: string; file: File }) => void
  onError?: (error: Error, file: File) => void
}

const TUS_CHUNK_SIZE_BYTES = constants.TUS_CHUNK_SIZE_BYTES

export const useTusUploader = ({ token, onSuccess, onError }: TusUploaderOptions) => {
  const uploadsRef = useRef<Map<string, tus.Upload>>(new Map())
  const [progressByFile, setProgressByFile] = useState<Record<string, TusUploadProgress>>({})
  const [isUploading, setIsUploading] = useState(false)

  const uploadFiles = useCallback(
    async (
      files: FileList | File[],
      finalize: (uploadKey: string, originalName: string) => Promise<void>
    ) => {
      const list = Array.from(files)
      if (list.length === 0) {
        return
      }

      setIsUploading(true)
      setProgressByFile({})

      await Promise.all(
        list.map(
          file =>
            new Promise<void>((resolve, reject) => {
              const endpoint = `${import.meta.env.VITE_API_URL}/api/v1/tus/files`

              const upload = new tus.Upload(file, {
                endpoint,
                // Keep each PATCH under PHP post_max_size (dev default 8M without ini override).
                chunkSize: TUS_CHUNK_SIZE_BYTES,
                retryDelays: [0, 1000, 3000, 5000],
                metadata: {
                  filename: file.name,
                  filetype: file.type,
                },
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                onError: error => {
                  setProgressByFile(prev => ({
                    ...prev,
                    [file.name]: {
                      ...(prev[file.name] ?? {
                        bytesUploaded: 0,
                        bytesTotal: file.size,
                        percentage: 0,
                      }),
                      status: 'error',
                    },
                  }))
                  onError?.(error, file)
                  reject(error)
                },
                onProgress: (bytesUploaded, bytesTotal) => {
                  setProgressByFile(prev => ({
                    ...prev,
                    [file.name]: {
                      bytesUploaded,
                      bytesTotal,
                      percentage:
                        bytesTotal > 0
                          ? Math.round((bytesUploaded / bytesTotal) * 100)
                          : 0,
                      status: 'uploading',
                    },
                  }))
                },
                onSuccess: async () => {
                  const uploadKey = upload.url?.split('/').pop() ?? ''
                  uploadsRef.current.delete(file.name)

                  try {
                    await finalize(uploadKey, file.name)
                    setProgressByFile(prev => ({
                      ...prev,
                      [file.name]: {
                        ...(prev[file.name] ?? {
                          bytesUploaded: file.size,
                          bytesTotal: file.size,
                          percentage: 100,
                        }),
                        status: 'success',
                      },
                    }))
                    onSuccess?.({ uploadKey, file })
                    resolve()
                  } catch (error) {
                    setProgressByFile(prev => ({
                      ...prev,
                      [file.name]: {
                        ...(prev[file.name] ?? {
                          bytesUploaded: file.size,
                          bytesTotal: file.size,
                          percentage: 100,
                        }),
                        status: 'error',
                      },
                    }))
                    reject(error)
                  }
                },
              })

              uploadsRef.current.set(file.name, upload)
              upload.start()
            })
        )
      )
        .then(() => {
          setProgressByFile({})
        })
        .finally(() => {
          setIsUploading(false)
        })
    },
    [onError, onSuccess, token]
  )

  const cancelAll = useCallback(() => {
    uploadsRef.current.forEach(upload => upload.abort(true))
    uploadsRef.current.clear()
    setProgressByFile({})
    setIsUploading(false)
  }, [])

  return {
    uploadFiles,
    cancelAll,
    progressByFile,
    isUploading,
  }
}
