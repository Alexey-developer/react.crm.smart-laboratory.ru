import type { Meta, StoryObj } from '@storybook/react-vite'

import { EntityFileField } from '@components/EntityFileField'
import { StoryRow } from '../../storybook/AppDecorator'
import { withStoryReduxState } from '../../storybook/storyDecorators'

const meta = {
  title: 'Primitives/EntityFileField',
  component: EntityFileField,
  tags: ['autodocs'],
  decorators: [
    withStoryReduxState,
    Story => (
      <StoryRow>
        <Story />
      </StoryRow>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'TUS dropzone: файлы копятся в очередь, отправка стартует по кнопке «Отправить». Токены light/dark из variables.scss.',
      },
    },
    reduxState: {
      CurrentUser: {
        authToken: 'storybook-token',
        perPage: 16,
      },
    },
  },
  args: {
    fileableType: 'project',
    fileableId: 100,
    multiple: true,
  },
} satisfies Meta<typeof EntityFileField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutContext: Story = {
  args: {
    fileableType: undefined,
    fileableId: undefined,
  },
}

export const Dark: Story = {
  globals: {
    theme: 'dark',
  },
  parameters: {
    reduxState: {
      theme: { currentTheme: 'dark' },
    },
  },
}
