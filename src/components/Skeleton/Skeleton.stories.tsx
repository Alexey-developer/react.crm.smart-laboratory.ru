import type { Meta, StoryObj } from '@storybook/react-vite'

import { Skeleton } from '@components/Skeleton'

import { formSkeleton } from '@components/DefaultCard/formSkeleton'

const meta = {
  title: 'Primitives/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Читает `selectCurrentTheme` из Redux — тема синхронизируется с toolbar Storybook.',
      },
    },
  },
  args: {
    width: 320,
    height: 200,
    skeleton: formSkeleton(3),
    content: (
      <div>
        <strong>Loaded content</strong>
        <p>Visible when isLoading=false.</p>
      </div>
    ),
  },
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Loading: Story = {
  args: { isLoading: true },
}

export const Loaded: Story = {
  args: { isLoading: false },
}
