import React, { useCallback } from 'react'

import { useReactive } from 'ahooks'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { InfiniteScroll } from '@components/InfiniteScroll'

import { withStoryReduxState } from '../../storybook/storyDecorators'

import styles from './InfiniteScroll.stories.module.css'

const meta = {
  title: 'Primitives/InfiniteScroll',
  component: InfiniteScroll,
  tags: ['autodocs'],
  decorators: [withStoryReduxState],
  parameters: {
    docs: {
      description: {
        component:
          'Scroll + sentinel + fill-until-overflow + «Load more» while hasMore (даже если контент короче max-height). Данные — `useInfiniteAPIQuery`.',
      },
    },
  },
} satisfies Meta<typeof InfiniteScroll>

export default meta

type Story = StoryObj<typeof meta>

const DemoList: React.FC<{ shortPages?: boolean }> = ({ shortPages = false }) => {
  const pageSize = shortPages ? 2 : 8
  const state = useReactive({
    items: Array.from({ length: shortPages ? 2 : 12 }, (_, index) => index + 1),
    hasMore: true,
    isFetchingMore: false,
  })

  const onLoadMore = useCallback(() => {
    if (!state.hasMore || state.isFetchingMore) {
      return
    }

    state.isFetchingMore = true
    window.setTimeout(() => {
      const nextStart = state.items.length + 1
      state.items = [
        ...state.items,
        ...Array.from({ length: pageSize }, (_, index) => nextStart + index),
      ]
      state.hasMore = state.items.length < 40
      state.isFetchingMore = false
    }, 400)
  }, [pageSize, state])

  return (
    <InfiniteScroll
      className={styles.demo}
      hasMore={state.hasMore}
      isFetchingMore={state.isFetchingMore}
      onLoadMore={onLoadMore}
      enabled={state.items.length > 0}
      loadingMoreLabel='Loading…'
      loadMoreLabel='Load more'
    >
      <ul className={styles.list}>
        {state.items.map(item => (
          <li key={item} className={styles.item}>
            Item #{item}
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  )
}

export const Basic: Story = {
  render: () => <DemoList />,
}

/** Content shorter than max-height — auto-fill + button still available. */
export const ShortPagesNoScrollbar: Story = {
  render: () => <DemoList shortPages />,
}
