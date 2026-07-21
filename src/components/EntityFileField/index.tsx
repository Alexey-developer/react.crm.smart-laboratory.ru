import React, { useCallback, useMemo } from 'react'

import { Button, Progress, Upload } from 'antd'
import type { UploadProps } from 'antd'
import { useReactive } from 'ahooks'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { FileGroup } from '@api/models/file/queryGroup'
import { setNotification } from '@redux/HeaderNotification/slice'
import { selectAuthToken } from '@redux/CurrentUser/selectors'
import { useTusUploader } from '@hooks/useTusUploader'
import type { TFileableType } from '@utils/constants/fileableTypes'
import { formatFileSize } from '@utils/formatFileSize'
import { getIcon } from '@utils/getIcon'

import styles from './index.module.scss'

export type EntityFileFieldProps = {
  fileableType?: TFileableType
  fileableId?: number
  ownerProfileType?: string
  ownerProfileId?: number
  accept?: string
  multiple?: boolean
  onUploaded?: () => void
}

type PendingFile = {
  uid: string
  file: File
}

const fileUid = (file: File): string =>
  `${file.name}:${file.size}:${file.lastModified}`

export const EntityFileField: React.FC<EntityFileFieldProps> = ({
  fileableType,
  fileableId,
  ownerProfileType,
  ownerProfileId,
  accept,
  multiple = true,
  onUploaded,
}) => {
  const [translated_phrase] = useTranslation('global')
  const dispatch = useDispatch()
  const token = useSelector(selectAuthToken) ?? ''
  const fileGroup = useMemo(() => new FileGroup(token), [token])
  const hasAttachContext =
    fileableType != null && fileableId != null && fileableId > 0
  const canSelect = Boolean(token) && hasAttachContext

  const state = useReactive<{ pending: PendingFile[] }>({
    pending: [],
  })

  const finalize = useCallback(
    async (uploadKey: string, originalName: string) => {
      await fileGroup.finalize({
        upload_key: uploadKey,
        original_name: originalName,
        owner_profile_type: ownerProfileType,
        owner_profile_id: ownerProfileId,
        fileable_type: fileableType,
        fileable_id: fileableId,
      })
    },
    [
      fileGroup,
      fileableId,
      fileableType,
      ownerProfileId,
      ownerProfileType,
    ]
  )

  const handleTusError = useCallback(
    (error: Error, file: File) => {
      dispatch(
        setNotification({
          title: translated_phrase('FileUpload.upload_failed_title'),
          text: translated_phrase('FileUpload.upload_failed_text', {
            name: file.name,
            detail: error.message,
          }),
          type: 'ERROR',
        })
      )
    },
    [dispatch, translated_phrase]
  )

  const { uploadFiles, progressByFile, isUploading, cancelAll } = useTusUploader({
    token,
    onError: handleTusError,
  })

  const enqueueFiles = useCallback(
    (incoming: File[]) => {
      if (!canSelect || incoming.length === 0) {
        return
      }

      const existing = new Set(state.pending.map(item => item.uid))
      const next = incoming
        .filter(file => {
          const uid = fileUid(file)
          if (existing.has(uid)) {
            return false
          }
          existing.add(uid)
          return true
        })
        .map(file => ({ uid: fileUid(file), file }))

      if (!multiple) {
        state.pending = next.slice(0, 1)
        return
      }

      state.pending = [...state.pending, ...next]
    },
    [canSelect, multiple, state]
  )

  const removePending = useCallback(
    (uid: string) => {
      state.pending = state.pending.filter(item => item.uid !== uid)
    },
    [state]
  )

  const clearPending = useCallback(() => {
    state.pending = []
  }, [state])

  const startUpload = useCallback(async () => {
    if (state.pending.length === 0 || isUploading) {
      return
    }

    const files = state.pending.map(item => item.file)
    try {
      await uploadFiles(files, finalize)
      state.pending = []
      // Once after the whole batch — avoids N parallel refetches racing a slow index.
      onUploaded?.()
    } catch {
      // Errors surface via API notifications / TUS onError; keep queue for retry.
    }
  }, [finalize, isUploading, onUploaded, state, uploadFiles])

  const uploadProps: UploadProps = {
    multiple,
    accept,
    showUploadList: false,
    disabled: !canSelect || isUploading,
    openFileDialogOnClick: true,
    beforeUpload: (file, fileList) => {
      // antd calls beforeUpload per file; enqueue the whole batch once on first call.
      if (file === fileList[0]) {
        enqueueFiles(fileList as unknown as File[])
      }
      return false
    },
  }

  const progressEntries = Object.entries(progressByFile)
  const pendingCount = state.pending.length

  return (
    <div className={styles.root}>
      <Upload.Dragger {...uploadProps}>
        <div className={styles.dropzone_inner}>
          <i className={`${getIcon('CLOUD_ARROW_UP')} ${styles.dropzone_icon}`} />
          <p className={styles.dropzone_title}>
            {translated_phrase('FileUpload.drop_title')}
          </p>
          <p className={styles.dropzone_hint}>
            {translated_phrase('FileUpload.drop_hint')}
          </p>
        </div>
      </Upload.Dragger>

      {!hasAttachContext && (
        <p className={styles.context_hint}>
          {translated_phrase('FileUpload.context_required')}
        </p>
      )}

      {pendingCount > 0 && (
        <div className={styles.queue}>
          <div className={styles.queue_header}>
            <p className={styles.queue_title}>
              {translated_phrase('FileUpload.pending_title', {
                count: pendingCount,
              })}
            </p>
            <Button
              type='link'
              size='small'
              disabled={isUploading}
              onClick={clearPending}
            >
              {translated_phrase('FileUpload.clear_queue')}
            </Button>
          </div>

          <ul className={styles.queue_list}>
            {state.pending.map(item => (
              <li key={item.uid} className={styles.queue_item}>
                <i
                  className={`${getIcon('PAPERCLIP')} ${styles.queue_item_icon}`}
                />
                <div className={styles.queue_item_meta}>
                  <span className={styles.queue_item_name}>{item.file.name}</span>
                  <span className={styles.queue_item_size}>
                    {formatFileSize(item.file.size)}
                  </span>
                </div>
                <Button
                  className={styles.queue_item_remove}
                  type='text'
                  size='small'
                  disabled={isUploading}
                  icon={<i className={getIcon('CLOSE')} />}
                  onClick={() => removePending(item.uid)}
                  aria-label={translated_phrase('FileUpload.remove')}
                />
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <Button
              className='smart-btn'
              type='default'
              loading={isUploading}
              disabled={!canSelect || pendingCount === 0}
              icon={<i className={getIcon('UPLOAD')} />}
              onClick={() => void startUpload()}
            >
              {translated_phrase('FileUpload.start_upload')}
            </Button>
            {isUploading && (
              <Button type='link' onClick={cancelAll}>
                {translated_phrase('FileUpload.cancel')}
              </Button>
            )}
          </div>
        </div>
      )}

      {progressEntries.length > 0 && (
        <div className={styles.progress_list}>
          {progressEntries.map(([name, progress]) => (
            <div key={name} className={styles.progress_item}>
              <div className={styles.progress_meta}>
                <span className={styles.progress_name}>{name}</span>
                <span>
                  {formatFileSize(progress.bytesUploaded)} /{' '}
                  {formatFileSize(progress.bytesTotal)}
                </span>
              </div>
              <Progress
                className={
                  progress.status === 'success'
                    ? 'success'
                    : progress.status === 'error'
                      ? 'danger'
                      : undefined
                }
                percent={progress.percentage}
                size='small'
                status={
                  progress.status === 'error'
                    ? 'exception'
                    : progress.status === 'success'
                      ? 'success'
                      : isUploading
                        ? 'active'
                        : undefined
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
