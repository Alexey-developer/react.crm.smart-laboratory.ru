import type { Meta, StoryObj } from '@storybook/react-vite'

import { ActionButton } from '@components/ActionButton'
import { getIcon } from '@utils/getIcon'

const meta = {
  title: 'Primitives/ActionButton',
  component: ActionButton,
  tags: ['autodocs'],
  args: {
    title: 'Actions.edit',
    icon: getIcon('EDIT'),
    shape: 'circle' as const,
    className: 'warning transparent',
  },
  argTypes: {
    title: { control: 'text', description: 'Tooltip title (может быть i18n-ключом)' },
    icon: { control: false },
    onConfirm: { action: 'confirmed' },
  },
} satisfies Meta<typeof ActionButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DangerWithConfirm: Story = {
  args: {
    title: 'Actions.delete',
    icon: getIcon('DELETE'),
    className: 'danger transparent',
    useConfirm: true,
  },
}

export const SuccessRound: Story = {
  args: {
    title: 'Actions.go',
    icon: getIcon('GO'),
    className: 'success',
    shape: 'round',
  },
}

export const DefaultShape: Story = {
  args: {
    title: 'Actions.restore',
    icon: getIcon('RESTORE'),
    className: 'warning',
    shape: 'default',
  },
}
