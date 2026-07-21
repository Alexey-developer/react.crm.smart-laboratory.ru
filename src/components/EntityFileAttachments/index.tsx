import React, { useCallback, useEffect, useMemo } from 'react'

import { Button, List, Popconfirm } from 'antd'
import { useReactive } from 'ahooks'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { FileGroup } from '@api/models/file/queryGroup'
import type { TFile } from '@api/models/file/type/TFile'
import { useAPIMutation } from '@api/useAPIMutation'
import { useInfiniteAPIQuery } from '@api/useInfiniteAPIQuery'
import { CollapseCard } from '@components/CollapseCard'
import { EntityFileField } from '@components/EntityFileField'
import { InfiniteScroll } from '@components/InfiniteScroll'
import { MediaGallery } from '@components/MediaGallery'
import { Skeleton } from '@components/Skeleton'
import { VideoPlayer } from '@components/VideoPlayer'
import { useAuthenticatedImagePreviewUrls } from '@hooks/useAuthenticatedImagePreviewUrls'
import { selectAuthToken } from '@redux/CurrentUser/selectors'
import {
  fileListFilterForContext,
  type TFileableType,
} from '@utils/constants/fileableTypes'
import {
  FILE_PREVIEW_VARIANTS,
  type TFilePreviewVariant,
} from '@utils/constants/filePreviewVariants'
import { formatFileSize } from '@utils/formatFileSize'
import { getIcon } from '@utils/getIcon'
import { getMethod } from '@utils/getMethod'

import { formSkeleton } from './formSkeleton'
import styles from './index.module.scss'

export type EntityFileAttachmentsProps = {
  fileableType: TFileableType
  fileableId: number
}

type VideoState = {
  activeId: number | null
  loadingId: number | null
  urls: Record<number, string>
}

const isVideoFile = (file: TFile): boolean => file.mime_type.startsWith('video/')

export const EntityFileAttachments: React.FC<EntityFileAttachmentsProps> = ({
  fileableType,
  fileableId,
}) => {
  const [translated_phrase] = useTranslation('global')
  const token = useSelector(selectAuthToken) ?? ''
  const fileGroup = useMemo(() => new FileGroup(token), [token])

  const listFilter = useMemo(
    () => fileListFilterForContext(fileableType, fileableId),
    [fileableId, fileableType]
  )

  const listParams = useMemo(
    () => ({
      filters: {
        deleted: 'only_existing',
        ...listFilter,
      },
    }),
    [listFilter]
  )

  const {
    items: files,
    hasMore,
    isInitialLoading,
    isFetchingMore,
    loadMore,
    reloadFromStart,
  } = useInfiniteAPIQuery<TFile>(
    FileGroup,
    getMethod('INDEX'),
    listParams,
    Boolean(fileableId)
  )

  const videoState = useReactive<VideoState>({
    activeId: null,
    loadingId: null,
    urls: {},
  })

  const { mutateAsync: destroyFile, isPending: isDeleting } = useAPIMutation(
    FileGroup,
    getMethod('DESTROY'),
    {}
  )

  useEffect(() => {
    return () => {
      Object.values(videoState.urls).forEach(url => URL.revokeObjectURL(url))
    }
  }, [videoState])

  const preview = useCallback(
    (
      id: number,
      variant: TFilePreviewVariant = FILE_PREVIEW_VARIANTS.COMPRESSED
    ) => fileGroup.preview(id, variant),
    [fileGroup]
  )
  const { thumbUrls, originalUrls, ensureOriginal } =
    useAuthenticatedImagePreviewUrls(files, preview)

  const handleReload = useCallback(async () => {
    videoState.activeId = null
    await reloadFromStart()
  }, [reloadFromStart, videoState])

  const handleUploaded = useCallback(() => {
    void handleReload()
  }, [handleReload])

  const handleDownload = useCallback(
    async (file: TFile) => {
      const response = await fileGroup.download(file.id)
      const url = window.URL.createObjectURL(response)
      const link = document.createElement('a')
      link.href = url
      link.download = file.original_name
      link.click()
      window.URL.revokeObjectURL(url)
    },
    [fileGroup]
  )

  const handleDelete = useCallback(
    async (id: number) => {
      await destroyFile(id)
      if (videoState.activeId === id) {
        videoState.activeId = null
      }
      if (videoState.urls[id]) {
        URL.revokeObjectURL(videoState.urls[id])
        delete videoState.urls[id]
      }
      await handleReload()
    },
    [destroyFile, handleReload, videoState]
  )

  const handlePlayVideo = useCallback(
    async (file: TFile) => {
      if (!isVideoFile(file)) {
        return
      }

      if (videoState.urls[file.id]) {
        videoState.activeId = file.id
        return
      }

      videoState.loadingId = file.id
      try {
        const blob = await fileGroup.preview(file.id)
        const url = URL.createObjectURL(blob)
        videoState.urls[file.id] = url
        videoState.activeId = file.id
      } catch {
        videoState.activeId = null
      } finally {
        videoState.loadingId = null
      }
    },
    [fileGroup, videoState]
  )

  const handleCloseVideo = useCallback(() => {
    videoState.activeId = null
  }, [videoState])

  const activeVideo = files.find(file => file.id === videoState.activeId)

  const attachmentsBody = (
    <>
      <div className={styles.media}>
        <MediaGallery
          files={files}
          thumbUrl={id => thumbUrls[id]}
          originalUrl={id => originalUrls[id]}
          ensureOriginal={ensureOriginal}
        />
        {activeVideo && videoState.urls[activeVideo.id] ? (
          <div className={styles.video_preview}>
            <div className={styles.video_preview_header}>
              <Button type='link' size='small' onClick={handleCloseVideo}>
                {translated_phrase('FileUpload.close_preview')}
              </Button>
            </div>
            <VideoPlayer
              file={activeVideo}
              previewUrl={videoState.urls[activeVideo.id]}
            />
          </div>
        ) : null}
      </div>

      <InfiniteScroll
        className={styles.scroll}
        hasMore={hasMore}
        isFetchingMore={isFetchingMore}
        onLoadMore={loadMore}
        enabled={files.length > 0}
        loadingMoreLabel={translated_phrase('FileUpload.loading_more')}
        loadMoreLabel={translated_phrase('FileUpload.load_more')}
      >
        <List
          className={styles.list}
          locale={{ emptyText: translated_phrase('FileUpload.empty_list') }}
          dataSource={files}
          renderItem={(file: TFile) => (
            <List.Item className={styles.list_item}>
              <div className={styles.file_row}>
                <span className={styles.file_icon}>
                  <i
                    className={getIcon(
                      isVideoFile(file) ? 'PLAY' : 'PAPERCLIP'
                    )}
                  />
                </span>
                <div className={styles.file_meta}>
                  <span className={styles.file_name}>{file.original_name}</span>
                  <span className={styles.file_details}>
                    {formatFileSize(file.size_bytes)} · {file.mime_type}
                  </span>
                </div>
                <div className={styles.file_actions}>
                  {isVideoFile(file) ? (
                    <Button
                      type='link'
                      size='small'
                      loading={videoState.loadingId === file.id}
                      icon={<i className={getIcon('PLAY')} />}
                      onClick={() => void handlePlayVideo(file)}
                    >
                      {translated_phrase('FileUpload.play_video')}
                    </Button>
                  ) : null}
                  <Button
                    type='link'
                    size='small'
                    icon={<i className={getIcon('DOWNLOAD')} />}
                    onClick={() => void handleDownload(file)}
                  >
                    {translated_phrase('FileUpload.download')}
                  </Button>
                  {file.can?.delete ? (
                    <Popconfirm
                      title={translated_phrase('Confirm.title')}
                      description={translated_phrase('Confirm.description')}
                      okText={translated_phrase('Confirm.ok_text')}
                      cancelText={translated_phrase('Confirm.cancel_text')}
                      onConfirm={() => void handleDelete(file.id)}
                    >
                      <Button
                        type='link'
                        size='small'
                        danger
                        disabled={isDeleting}
                        icon={<i className={getIcon('DELETE')} />}
                      >
                        {translated_phrase('Actions.delete')}
                      </Button>
                    </Popconfirm>
                  ) : null}
                </div>
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </>
  )

  const listContent = (
    <div className={styles.root}>
      <EntityFileField
        fileableType={fileableType}
        fileableId={fileableId}
        onUploaded={handleUploaded}
      />
      <Skeleton
        isLoading={isInitialLoading}
        width='100%'
        height={260}
        skeleton={formSkeleton()}
        content={attachmentsBody}
      />
    </div>
  )

  return (
    <CollapseCard
      type='transparent'
      items={[
        {
          key: 'attachments',
          label: translated_phrase('Info.attachments'),
          children: listContent,
        },
      ]}
    />
  )
}
