import type { Meta, StoryObj } from '@storybook/react-vite'

import { PhoneInput } from '@components/PhoneInput'

import { StoryForm } from '../../storybook/StoryForm'

const meta = {
  title: 'Connected (wave 2)/PhoneInput',
  component: PhoneInput,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <StoryForm initialValues={{ prefix: 7, phone: '' }}>
        <Story />
      </StoryForm>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Маскированный ввод телефона: префикс (+7 / +994) из Redux `PhonePrefix`, маска antd-mask-input.',
      },
    },
    reduxState: {
      phonePrefix: { prefix: 7 },
    },
  },
} satisfies Meta<typeof PhoneInput>

export default meta

type Story = StoryObj<typeof meta>

export const RussiaPrefix: Story = {}

export const AzerbaijanPrefix: Story = {
  decorators: [
    Story => (
      <StoryForm initialValues={{ prefix: 994, phone: '' }}>
        <Story />
      </StoryForm>
    ),
  ],
  parameters: {
    reduxState: {
      phonePrefix: { prefix: 994 },
    },
  },
}
