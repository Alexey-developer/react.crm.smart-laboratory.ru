import type { Meta, StoryObj } from '@storybook/react-vite'

import { CustomAvatar, type Employee } from '@components/CustomAvatar'

const sampleEmployee: Employee = {
  id: 42,
  name: 'Иван',
  surname: 'Петров',
}

const meta = {
  title: 'Primitives/CustomAvatar',
  component: CustomAvatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Требует `MemoryRouter` (глобальный декоратор Storybook). Tooltip + Link + Avatar с инициалами.',
      },
    },
  },
  args: {
    employee: sampleEmployee,
  },
} satisfies Meta<typeof CustomAvatar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongName: Story = {
  args: {
    employee: {
      id: 7,
      name: 'Александра',
      surname: 'Смирнова',
    },
  },
}
