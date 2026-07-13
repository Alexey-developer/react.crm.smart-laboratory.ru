import type { Meta, StoryObj } from '@storybook/react-vite'

import { CustomSimpleSelect } from '@components/CustomSimpleSelect'

import { projectStatusSimpleSelectSeeds } from '../../storybook/fixtures/apiMocks'
import { StoryForm } from '../../storybook/StoryForm'
import { withStoryQuerySeeds } from '../../storybook/storyDecorators'

const meta = {
  title: 'Connected (wave 2)/CustomSimpleSelect',
  component: CustomSimpleSelect,
  tags: ['autodocs'],
  decorators: [
    withStoryQuerySeeds,
    Story => (
      <StoryForm>
        <Story />
      </StoryForm>
    ),
  ],
  parameters: {
    querySeeds: projectStatusSimpleSelectSeeds,
    docs: {
      description: {
        component:
          'Простой Select со статическим списком из R-группы (ProjectStatusGroup). Опции — i18n-ключи `lang_code`.',
      },
    },
  },
  args: {
    type: 'PROJECT_STATUS',
    name: 'status',
    defaultValue: 1,
  },
} satisfies Meta<typeof CustomSimpleSelect>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Multiple: Story = {
  args: {
    mode: 'multiple',
    defaultValue: undefined,
  },
}
