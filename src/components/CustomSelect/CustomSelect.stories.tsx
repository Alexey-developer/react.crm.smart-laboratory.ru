import type { Meta, StoryObj } from '@storybook/react-vite'

import { CustomSelect } from '@components/CustomSelect'

import { projectSelectQuerySeeds, directionSelectQuerySeeds } from '../../storybook/fixtures/apiMocks'
import { StoryForm } from '../../storybook/StoryForm'

const meta = {
  title: 'Connected (wave 2)/CustomSelect',
  component: CustomSelect,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <StoryForm>
        <Story />
      </StoryForm>
    ),
  ],
  parameters: {
    querySeeds: projectSelectQuerySeeds,
    docs: {
      description: {
        component:
          'Select с поиском и подгрузкой страниц из API (`useAPIQuery` + ProjectGroup). Данные замоканы в QueryClient.',
      },
    },
  },
  args: {
    type: 'PROJECT',
    name: 'project_id',
    mode: 'multiple',
  },
} satisfies Meta<typeof CustomSelect>

export default meta

type Story = StoryObj<typeof meta>

export const Multiple: Story = {}

export const Single: Story = {
  args: {
    mode: undefined,
    name: 'project_id',
  },
}

export const Direction: Story = {
  args: {
    type: 'DIRECTION',
    name: 'direction_id',
  },
  parameters: {
    querySeeds: directionSelectQuerySeeds,
  },
}
