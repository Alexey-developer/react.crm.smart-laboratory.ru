import type { Meta, StoryObj } from '@storybook/react-vite'

import { EditableTextarea } from '@components/EditableTextarea'

import { StoryForm } from '../../storybook/StoryForm'

const meta = {
  title: 'Connected (wave 2)/EditableTextarea',
  component: EditableTextarea,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <StoryForm>
        <Story />
      </StoryForm>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Переключатель simple (antd TextArea) / advanced (jodit-pro). Тема Jodit — из Redux `selectCurrentTheme` + toolbar Storybook.',
      },
    },
  },
  args: {
    name: 'description',
    value: '',
    mode: 'simple',
  },
} satisfies Meta<typeof EditableTextarea>

export default meta

type Story = StoryObj<typeof meta>

export const SimpleEmpty: Story = {}

export const SimpleWithText: Story = {
  args: {
    value: 'Краткое описание задачи или проекта.',
  },
}

export const AdvancedMode: Story = {
  args: {
    mode: 'advanced',
    value: '<p>Rich-text <strong>описание</strong> с форматированием.</p>',
  },
}

export const AdvancedLongContent: Story = {
  args: {
    mode: 'advanced',
    value:
      '<p>Первый абзац.</p><ul><li>Пункт 1</li><li>Пункт 2</li></ul><p>Второй абзац с <em>акцентом</em>.</p>',
  },
}
