import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-themes'],
  framework: '@storybook/react-vite',
  docs: {
    defaultName: 'Документация',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@api': path.resolve(dirname, '../src/api'),
          '@assets': path.resolve(dirname, '../src/assets'),
          '@components': path.resolve(dirname, '../src/components'),
          '@layouts': path.resolve(dirname, '../src/layouts'),
          '@redux': path.resolve(dirname, '../src/redux'),
          '@pages': path.resolve(dirname, '../src/pages'),
          '@translations': path.resolve(dirname, '../src/translations'),
          '@utils': path.resolve(dirname, '../src/utils'),
        },
      },
    })
  },
}

export default config
