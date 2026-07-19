import type { Meta, StoryObj } from '@storybook/react-vite'

import { PhoneInput } from '@components/PhoneInput'

import { StoryForm } from '../../storybook/StoryForm'
import { withStoryReduxState } from '../../storybook/storyDecorators'

const meta = {
  title: 'Connected (wave 2)/PhoneInput',
  component: PhoneInput,
  tags: ['autodocs'],
  decorators: [
    withStoryReduxState,
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
          'Маскированный ввод телефона: префикс (+7 / +994) из Redux `PhonePrefix`, маска antd-mask-input. `mode=\"e164\"` — Form control для CRUD (value = E.164).',
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
    withStoryReduxState,
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

export const E164EntityField: Story = {
  args: {
    mode: 'e164',
    value: '+79001234567',
  },
  decorators: [
    withStoryReduxState,
    Story => (
      <StoryForm initialValues={{ e164: '+79001234567' }}>
        <Story />
      </StoryForm>
    ),
  ],
}
