import React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Filter } from '@components/Filter'
import { CheckboxFilter } from '@components/Filter/CheckboxFilter'
import { SelectFilter } from '@components/Filter/SelectFilter'

import { projectsFilterQuerySeeds } from '../../storybook/fixtures/apiMocks'
import { withStoryQuerySeeds, withStoryRouter } from '../../storybook/storyDecorators'

const FilterProjectsDemo: React.FC<{
  isLoading?: boolean
  total?: number
}> = ({ isLoading = false, total = 24 }) => {
  const entityFilters = [
    CheckboxFilter('PROJECT_STATUS'),
    SelectFilter('CUSTOMER_COMPANY'),
  ]

  return <Filter filters={entityFilters} isLoading={isLoading} total={total} />
}

const meta = {
  title: 'Connected (wave 2)/Filter',
  component: FilterProjectsDemo,
  tags: ['autodocs'],
  decorators: [withStoryRouter, withStoryQuerySeeds],
  parameters: {
    router: { initialEntries: ['/projects'] },
    querySeeds: projectsFilterQuerySeeds,
    docs: {
      description: {
        component:
          'Popover-фильтры страницы projects: статусы (CheckboxFilter) + заказчик (SelectFilter). API замокан через `parameters.querySeeds`. Redux Filters — через `useGetStateCurrentPageFilters`.',
      },
    },
  },
  args: {
    isLoading: false,
    total: 24,
  },
} satisfies Meta<typeof FilterProjectsDemo>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}

export const WithoutTotal: Story = {
  args: {
    total: undefined,
  },
}
