import type { Meta, StoryObj } from '@storybook/react-vite'

import { CollapseCard } from '@components/CollapseCard'

const meta = {
  title: 'Primitives/CollapseCard',
  component: CollapseCard,
  tags: ['autodocs'],
  args: {
    items: [
      {
        key: '1',
        label: 'Section A',
        children: <p>Collapsible content block A.</p>,
      },
      {
        key: '2',
        label: 'Section B',
        children: <p>Collapsible content block B.</p>,
      },
    ],
  },
} satisfies Meta<typeof CollapseCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Warning: Story = {
  args: { type: 'warning' },
}

export const Danger: Story = {
  args: { type: 'danger' },
}

export const Success: Story = {
  args: { type: 'success' },
}
