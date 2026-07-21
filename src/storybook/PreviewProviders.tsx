import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import russian from 'antd/locale/ru_RU'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import { GetValidateMessages } from '@utils/helpers'

import { getAntdThemeConfig } from './antdTheme'
import { createStoryStore } from './createStoryStore'
import { storybookI18n } from './i18n'

import styles from './AppDecorator.module.scss'

const AntdShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const validateMessages = GetValidateMessages()

  return (
    <ConfigProvider locale={russian} theme={getAntdThemeConfig()} form={{ validateMessages }}>
      <div className={styles.canvas}>{children}</div>
    </ConfigProvider>
  )
}

/**
 * Provider chain for design-sync previews (claude.ai/design): same context
 * AppDecorator gives Storybook stories (Redux, react-query, i18n, router,
 * antd), but as a plain {children} wrapper (no Storybook Story/context args).
 *
 * Per-story router / redux / querySeeds — through storyDecorators in *.stories.tsx
 * (design-sync compose применяет decorators внутри этого shell).
 */
export const PreviewProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // useLayoutEffect (not useEffect): must land before withStoryReduxState's
  // per-story theme override (storyDecorators.tsx) — React flushes ALL
  // layout effects across the tree before ANY passive useEffect runs, so
  // this default-light write always precedes a story's own dark override
  // regardless of parent/child effect-ordering within the same phase.
  React.useLayoutEffect(() => {
    document.body.setAttribute('data-theme', 'light')
  }, [])

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
        Theme: { currentTheme: 'light' },
        CurrentUser: { authToken: 'design-sync-token', perPage: 16 },
      }),
    []
  )

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={storybookI18n}>
          <AntdShell>{children}</AntdShell>
        </I18nextProvider>
      </QueryClientProvider>
    </Provider>
  )
}
