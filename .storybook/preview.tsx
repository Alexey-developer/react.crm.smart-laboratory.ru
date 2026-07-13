import type { Preview } from '@storybook/react-vite'
import { withThemeByDataAttribute } from '@storybook/addon-themes'

import '../src/storybook/globalStyles'

import { AppDecorator } from '../src/storybook/AppDecorator'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: [
          'Design System',
          ['Design Tokens', '*'],
          'Primitives',
          '*',
          'Connected (wave 2)',
          '*',
        ],
      },
    },
  },
  globalTypes: {
    locale: {
      name: 'Язык',
      description: 'Локаль i18n (как в CRM)',
      defaultValue: 'ru',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'ru', title: 'Русский' },
          { value: 'en', title: 'English' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    AppDecorator,
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
      parentSelector: 'body',
    }),
  ],
}

export default preview
