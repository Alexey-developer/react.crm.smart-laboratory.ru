import React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { useReactive } from 'ahooks'

import { Sort, type RequestSortState } from '@components/Sort'

const SortDemo: React.FC<{
  isLoading?: boolean
  sortAttributes?: string[]
  initialSortBy?: string
  initialDirection?: 'asc' | 'desc'
}> = ({
  isLoading = false,
  sortAttributes = ['name', 'created_at'],
  initialSortBy = 'id',
  initialDirection = 'asc',
}) => {
  const requestSortState = useReactive<RequestSortState>({
    sortByFiledName: initialSortBy,
    sortDirection: initialDirection,
  })

  return (
    <Sort
      requestSortState={requestSortState}
      isLoading={isLoading}
      sortAttributes={sortAttributes}
    />
  )
}

const meta = {
  title: 'Connected (wave 2)/Sort',
  component: SortDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Сортировка списка: поле + направление. Локальное состояние — `useReactive` (как в EntityIndex).',
      },
    },
  },
  args: {
    isLoading: false,
    sortAttributes: ['name', 'created_at', 'budget'],
    initialSortBy: 'id',
    initialDirection: 'asc',
  },
} satisfies Meta<typeof SortDemo>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Descending: Story = {
  args: {
    initialDirection: 'desc',
    initialSortBy: 'name',
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}
