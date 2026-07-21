import React, { useCallback, useEffect, useRef } from 'react'

import { Button, Spin } from 'antd'
import { useInViewport } from 'ahooks'
import { useTranslation } from 'react-i18next'

import styles from './index.module.scss'

export type InfiniteScrollProps = {
  children: React.ReactNode
  hasMore: boolean
  isFetchingMore: boolean
  onLoadMore: () => void
  /** When false, sentinel / fill / button do not request the next page. */
  enabled?: boolean
  /** Override `Extra.loading_more`. */
  loadingMoreLabel?: string
  /** Override `Extra.load_more`. Shown while `hasMore` and not fetching. */
  loadMoreLabel?: string
  className?: string
}

/**
 * Scroll container + sentinel + fill-until-overflow + always-visible «Load more».
 * Pair with `useInfiniteAPIQuery`. While `hasMore`, progress is guaranteed even when
 * the current page is shorter than the scroll viewport (no scrollbar).
 */
export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  hasMore,
  isFetchingMore,
  onLoadMore,
  enabled = true,
  loadingMoreLabel,
  loadMoreLabel,
  className,
}) => {
  const [translated_phrase] = useTranslation('global')
  const scrollRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [sentinelInView] = useInViewport(sentinelRef, {
    root: scrollRef,
  })

  const resolvedLoadingLabel =
    loadingMoreLabel ?? translated_phrase('Extra.loading_more')
  const resolvedLoadMoreLabel =
    loadMoreLabel ?? translated_phrase('Extra.load_more')

  const canLoadMore = enabled && hasMore && !isFetchingMore

  const requestMore = useCallback(() => {
    if (!canLoadMore) {
      return
    }
    onLoadMore()
  }, [canLoadMore, onLoadMore])

  /** Sentinel entered / stayed in view after a fetch finished. */
  useEffect(() => {
    if (!canLoadMore || !sentinelInView) {
      return
    }
    requestMore()
  }, [canLoadMore, requestMore, sentinelInView])

  /**
   * Fill-until-scrollable: while there is a next page and content does not overflow
   * the container, keep loading — covers short first pages without a scrollbar.
   */
  const fillIfNeeded = useCallback(() => {
    const el = scrollRef.current
    if (!el || !canLoadMore) {
      return
    }

    if (el.scrollHeight <= el.clientHeight + 1) {
      requestMore()
    }
  }, [canLoadMore, requestMore])

  useEffect(() => {
    fillIfNeeded()
  }, [fillIfNeeded, children, hasMore, isFetchingMore])

  useEffect(() => {
    const el = scrollRef.current
    if (!el || typeof ResizeObserver === 'undefined') {
      return
    }

    const observer = new ResizeObserver(() => {
      fillIfNeeded()
    })
    observer.observe(el)

    return () => observer.disconnect()
  }, [fillIfNeeded])

  const rootClassName = className
    ? `${styles.root} ${className}`
    : styles.root

  return (
    <div className={rootClassName} ref={scrollRef}>
      {children}
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden />
      {isFetchingMore ? (
        <div className={styles.load_more}>
          <Spin size='small' />
          <span>{resolvedLoadingLabel}</span>
        </div>
      ) : null}
      {enabled && hasMore && !isFetchingMore ? (
        <div className={styles.load_more_action}>
          <Button type='link' size='small' onClick={requestMore}>
            {resolvedLoadMoreLabel}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
