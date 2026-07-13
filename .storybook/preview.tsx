import type { Preview } from '@storybook/react-vite'
import { withThemeByDataAttribute } from '@storybook/addon-themes'

import '@layouts/MainLayout/reset.css'
import '@layouts/MainLayout/common.scss'
import '@assets/fontawesome/v6.5.1/css/all.css'
import '@assets/fontawesome/v6.5.1/css/sharp-thin.css'
import '@assets/fontawesome/v6.5.1/css/sharp-solid.css'
import '@assets/fontawesome/v6.5.1/css/sharp-regular.css'
import '@assets/fontawesome/v6.5.1/css/sharp-light.css'

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
          ['README', 'Design Tokens', '*'],
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
