import type { Meta, StoryObj } from '@storybook/react-vite'

import { AlertCard } from '@components/AlertCard'
import { StoryRow } from '../../storybook/AppDecorator'
import { getIcon } from '@utils/getIcon'

const meta = {
  title: 'Primitives/AlertCard',
  component: AlertCard,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <StoryRow>
        <Story />
      </StoryRow>
    ),
  ],
  args: {
    message: 'Statistics.time_spent',
    description: 'Optional description or secondary line.',
    icon: <i className={getIcon('INFO')} />,
    col: true,
  },
} satisfies Meta<typeof AlertCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Notification.success',
    icon: <i className={getIcon('SUCCESS')} />,
  },
}

export const Warning: Story = {
  args: {
    type: 'warning',
    message: 'Notification.warning',
    icon: <i className={getIcon('ERROR')} />,
  },
}

export const Danger: Story = {
  args: {
    type: 'danger',
    message: 'Notification.error',
    icon: <i className={getIcon('ERROR')} />,
  },
}

export const BannerClosable: Story = {
  args: {
    banner: true,
    closable: true,
    col: false,
    type: 'warning transparent',
  },
}
