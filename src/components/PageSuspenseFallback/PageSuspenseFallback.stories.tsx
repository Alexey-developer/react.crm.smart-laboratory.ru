import type { Meta, StoryObj } from '@storybook/react-vite'

import { PageSuspenseFallback } from '@components/PageSuspenseFallback'

import { withStoryReduxState } from '../../storybook/storyDecorators'

const meta = {
  title: 'Primitives/PageSuspenseFallback',
  component: PageSuspenseFallback,
  tags: ['autodocs'],
  decorators: [withStoryReduxState],
  parameters: {
    docs: {
      description: {
        component:
          'Suspense fallback для lazy-страниц (до скелетона). Токены темы light/dark + brand Spin. Toolbar Storybook → Theme.',
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PageSuspenseFallback>

export default meta

type Story = StoryObj<typeof meta>

export const Light: Story = {
  parameters: {
    globals: { theme: 'light' },
    reduxState: {
      theme: { currentTheme: 'light' },
    },
  },
}

export const Dark: Story = {
  parameters: {
    globals: { theme: 'dark' },
    reduxState: {
      theme: { currentTheme: 'dark' },
    },
  },
}
