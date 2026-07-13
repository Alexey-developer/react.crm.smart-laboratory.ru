import type { Meta, StoryObj } from '@storybook/react-vite'

import { Breadcrumbs } from '@components/Breadcrumbs'

const meta = {
  title: 'Connected (wave 2)/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Хлебные крошки по `useLocation()` и `formLeftMenuItems()`. Маршрут задаётся через `parameters.router.initialEntries`.',
      },
    },
  },
} satisfies Meta<typeof Breadcrumbs>

export default meta

type Story = StoryObj<typeof meta>

export const Home: Story = {
  parameters: {
    router: { initialEntries: ['/'] },
  },
}

export const ProjectsList: Story = {
  parameters: {
    router: { initialEntries: ['/projects'] },
  },
}

export const ProjectCreate: Story = {
  parameters: {
    router: { initialEntries: ['/projects/create'] },
  },
}

export const ProjectShow: Story = {
  parameters: {
    router: { initialEntries: ['/projects/42'] },
  },
}

export const ProjectEdit: Story = {
  parameters: {
    router: { initialEntries: ['/projects/42/edit'] },
  },
}

export const TasksList: Story = {
  parameters: {
    router: { initialEntries: ['/tasks'] },
  },
}
