import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  IncludedEmployees,
  type Employees,
} from '@components/IncludedEmployees'

const employees: Employees[] = [
  { id: 1, name: 'Иван', surname: 'Петров' },
  { id: 2, name: 'Мария', surname: 'Сидорова' },
  { id: 3, name: 'Алексей', surname: 'Козлов' },
  { id: 4, name: 'Елена', surname: 'Новикова' },
]

const meta = {
  title: 'Primitives/IncludedEmployees',
  component: IncludedEmployees,
  tags: ['autodocs'],
  args: {
    employees,
  },
} satisfies Meta<typeof IncludedEmployees>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const TwoEmployees: Story = {
  args: {
    employees: employees.slice(0, 2),
  },
}

export const ManyEmployees: Story = {
  args: {
    employees: [
      ...employees,
      { id: 5, name: 'Олег', surname: 'Волков' },
      { id: 6, name: 'Анна', surname: 'Морозова' },
    ],
  },
}
