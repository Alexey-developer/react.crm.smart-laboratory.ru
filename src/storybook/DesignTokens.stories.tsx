import type { Meta, StoryObj } from '@storybook/react-vite'

import { DesignTokensPanel } from './DesignTokensPanel'

const meta = {
  title: 'Design System/Design Tokens',
  component: DesignTokensPanel,
  parameters: {
    docs: {
      description: {
        component:
          'Витрина SCSS-токенов CRM. Источник правды — `variables.scss`. При изменении палитры или `$BORDER_RADIUS` синхронизировать `designTokens.ts` и эту story.',
      },
    },
  },
} satisfies Meta<typeof DesignTokensPanel>

export default meta

type Story = StoryObj<typeof meta>

export const AllTokens: Story = {}
