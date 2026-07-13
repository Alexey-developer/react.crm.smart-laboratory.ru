import React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { useReactive } from 'ahooks'

import { CustomPagination } from '@components/CustomPagination'

import { withStoryReduxState } from '../../storybook/storyDecorators'

const PaginationDemo: React.FC<{
  total: number
  lastPage: number
  initialPage?: number
}> = ({ total, lastPage, initialPage = 1 }) => {
  const requestPageState = useReactive({ value: initialPage })

  return (
    <CustomPagination
      requestPageState={requestPageState}
      total={total}
      lastPage={lastPage}
    />
  )
}

const meta = {
  title: 'Primitives/CustomPagination',
  component: PaginationDemo,
  tags: ['autodocs'],
  decorators: [withStoryReduxState],
  parameters: {
    reduxState: {
      currentUser: { authToken: '', perPage: 16 },
    },
    docs: {
      description: {
        component:
          'Требует Redux (`currentUser.perPage`). В Storybook состояние страницы — через `useReactive`.',
      },
    },
  },
  args: {
    total: 128,
    lastPage: 8,
    initialPage: 1,
  },
} satisfies Meta<typeof PaginationDemo>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MiddlePage: Story = {
  args: {
    initialPage: 4,
    total: 256,
    lastPage: 16,
  },
}

export const SinglePage: Story = {
  args: {
    total: 8,
    lastPage: 1,
    initialPage: 1,
  },
}
