import { useCallback, useEffect, useMemo } from 'react'

import { useReactive } from 'ahooks'

import type { TMetadata } from '@api/common/types/TMetadata'
import type { GroupClass, GroupMethod } from '@api/common/types/TGroups'
import { useAPIQuery } from '@api/useAPIQuery'

export type InfiniteListItem = {
  id: number | string
}

export type InfinitePageMeta = Pick<TMetadata, 'current_page' | 'last_page'>

export type InfinitePageBody<TItem> = {
  data?: TItem[]
  meta?: InfinitePageMeta
}

type ListState<TItem> = {
  page: number
  loadedPage: number
  items: TItem[]
  hasMore: boolean
}

export type UseInfiniteAPIQueryOptions<TItem extends InfiniteListItem> = {
  /** Default: Laravel paginator body after `useAPIQuery` select (`{ data, meta }`). */
  parsePage?: (data: unknown) => {
    items: TItem[]
    meta: InfinitePageMeta | null
  }
  getItemId?: (item: TItem) => number | string
}

const defaultParsePage = <TItem extends InfiniteListItem>(
  data: unknown
): { items: TItem[]; meta: InfinitePageMeta | null } => {
  const body = data as InfinitePageBody<TItem> | undefined
  const items = Array.isArray(body?.data) ? body.data : []
  const meta =
    body?.meta &&
    typeof body.meta.current_page === 'number' &&
    typeof body.meta.last_page === 'number'
      ? body.meta
      : null

  return { items, meta }
}

const defaultGetItemId = <TItem extends InfiniteListItem>(
  item: TItem
): number | string => item.id


/**
 * Infinite pages over `useAPIQuery` (Laravel `meta.current_page` / `last_page`).
 * Reuse for attachments, chats, notifications — keep fetching in this hook, UI chrome in `InfiniteScroll`.
 */
export const useInfiniteAPIQuery = <TItem extends InfiniteListItem>(
  groupClass: GroupClass,
  groupMethod: GroupMethod,
  params: Record<string, unknown> = {},
  enabled = true,
  options: UseInfiniteAPIQueryOptions<TItem> = {}
) => {
  const parsePage = options.parsePage ?? defaultParsePage<TItem>
  const getItemId = options.getItemId ?? defaultGetItemId

  const listState = useReactive<ListState<TItem>>({
    page: 1,
    loadedPage: 0,
    items: [],
    hasMore: true,
  })

  // Reset when list scope changes (filters / query / sort) — not when `page` bumps.
  const scopeKey = useMemo(() => {
    const { page: _page, ...scope } = params
    return JSON.stringify(scope)
  }, [params])

  useEffect(() => {
    listState.page = 1
    listState.loadedPage = 0
    listState.items = []
    listState.hasMore = true
  }, [listState, scopeKey])

  const { data, isLoading, isFetching, isError, error, refetch, isSuccess } =
    useAPIQuery(
      groupClass,
      groupMethod,
      {
        ...params,
        page: listState.page,
      },
      enabled
    )

  useEffect(() => {
    const { items: pageItems, meta } = parsePage(data)
    if (!meta) {
      // Avoid InfiniteScroll sentinel loops when the page body has no paginator meta.
      if (data != null && listState.hasMore) {
        listState.hasMore = false
      }
      return
    }

    const currentPage = meta.current_page

    if (currentPage === 1) {
      listState.items = pageItems
    } else if (currentPage > listState.loadedPage) {
      const seen = new Set(listState.items.map(item => getItemId(item)))
      listState.items = [
        ...listState.items,
        ...pageItems.filter(item => !seen.has(getItemId(item))),
      ]
    }

    listState.loadedPage = currentPage
    listState.hasMore = currentPage < meta.last_page
  }, [data, listState, parsePage, getItemId])

  const loadMore = useCallback(() => {
    if (!listState.hasMore || isFetching || isLoading) {
      return
    }
    if (listState.items.length === 0) {
      return
    }
    if (listState.loadedPage < listState.page) {
      return
    }

    listState.page += 1
  }, [isFetching, isLoading, listState])

  const reloadFromStart = useCallback(async () => {
    const alreadyFirst = listState.page === 1
    listState.page = 1
    listState.loadedPage = 0
    listState.items = []
    listState.hasMore = true

    if (alreadyFirst) {
      await refetch()
    }
  }, [listState, refetch])

  const isInitialLoading =
    isLoading && listState.page === 1 && listState.items.length === 0

  const isFetchingMore =
    listState.hasMore &&
    (isFetching || listState.loadedPage < listState.page) &&
    listState.items.length > 0

  return {
    items: listState.items,
    hasMore: listState.hasMore,
    page: listState.page,
    isInitialLoading,
    isFetchingMore,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    loadMore,
    reloadFromStart,
    refetch,
  }
}
