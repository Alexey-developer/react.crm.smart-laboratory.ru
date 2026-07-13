import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import russian from 'antd/locale/ru_RU'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'

import { GetValidateMessages } from '@utils/helpers'

import { getAntdThemeConfig } from './antdTheme'
import { createStoryStore } from './createStoryStore'
import { storybookI18n } from './i18n'

const AntdShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const validateMessages = GetValidateMessages()

  return (
    <ConfigProvider locale={russian} theme={getAntdThemeConfig()} form={{ validateMessages }}>
      {children}
    </ConfigProvider>
  )
}

/**
 * Provider chain for design-sync previews (claude.ai/design): same context
 * AppDecorator gives Storybook stories (Redux, react-query, i18n, router,
 * antd), but as a plain {children} wrapper (no Storybook Story/context args)
 * and with no CSS side-effect imports (design-sync's esbuild pass has no
 * .scss loader — see .design-sync/NOTES.md).
 */
export const PreviewProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = React.useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: false, refetchOnWindowFocus: false },
          mutations: { retry: false },
        },
      }),
    []
  )
  const store = React.useMemo(
    () =>
      createStoryStore({
        theme: { currentTheme: 'light' },
        currentUser: { authToken: 'design-sync-token', perPage: 16 },
      }),
    []
  )

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={storybookI18n}>
          <MemoryRouter initialEntries={['/projects']}>
            <AntdShell>{children}</AntdShell>
          </MemoryRouter>
        </I18nextProvider>
      </QueryClientProvider>
    </Provider>
  )
}
