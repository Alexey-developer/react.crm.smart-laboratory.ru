import type { Meta, StoryObj } from '@storybook/react-vite'

import { ActionButton } from '@components/ActionButton'
import { DefaultCard } from '@components/DefaultCard'
import { StoryRow } from '../../storybook/AppDecorator'
import { getIcon } from '@utils/getIcon'

const meta = {
  title: 'Primitives/DefaultCard',
  component: DefaultCard,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <StoryRow>
        <Story />
      </StoryRow>
    ),
  ],
  args: {
    title: 'Project Alpha',
    content: <p>Card body content — описание сущности или метрики.</p>,
    hoverable: true,
  },
} satisfies Meta<typeof DefaultCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithRibbon: Story = {
  args: {
    badgeRibbonText: 'In progress',
    badgeRibbonClassName: 'warning',
    type: 'warning',
  },
}

export const WithActions: Story = {
  args: {
    actions: [
      <ActionButton
        key='go'
        title='Go'
        shape='circle'
        icon={getIcon('GO')}
        className='transparent'
      />,
      <ActionButton
        key='edit'
        title='Edit'
        shape='circle'
        icon={getIcon('EDIT')}
        className='warning transparent'
      />,
      <ActionButton
        key='delete'
        title='Delete'
        shape='circle'
        icon={getIcon('DELETE')}
        className='danger transparent'
        useConfirm
      />,
    ],
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
    skeletonActionCount: 3,
  },
}

export const SuccessType: Story = {
  args: {
    type: 'success',
    badgeRibbonText: 'Done',
    badgeRibbonClassName: 'success',
  },
}

export const DangerType: Story = {
  args: {
    type: 'danger',
    title: 'Blocked project',
  },
}
