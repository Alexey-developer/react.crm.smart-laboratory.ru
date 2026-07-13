import type { Meta, StoryObj } from '@storybook/react-vite'

import { CustomSpin } from '@components/CustomSpin'

import { withStoryReduxState } from '../../storybook/storyDecorators'

const meta = {
  title: 'Primitives/CustomSpin',
  component: CustomSpin,
  tags: ['autodocs'],
  decorators: [withStoryReduxState],
  parameters: {
    docs: {
      description: {
        component:
          'Глобальный fullscreen Spin. Управляется Redux `spin.isSpinning`. Включите story — overlay на весь canvas.',
      },
    },
  },
} satisfies Meta<typeof CustomSpin>

export default meta

type Story = StoryObj<typeof meta>

export const Hidden: Story = {
  parameters: {
    reduxState: {
      spin: { isSpinning: false },
    },
  },
}

export const Spinning: Story = {
  parameters: {
    reduxState: {
      spin: { isSpinning: true },
    },
  },
}
