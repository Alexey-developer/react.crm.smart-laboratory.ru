import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider, Row } from 'antd'
import english from 'antd/locale/en_US'
import russian from 'antd/locale/ru_RU'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'

import { GetValidateMessages } from '@utils/helpers'

import { getAntdThemeConfig } from './antdTheme'
import { createStoryStore, type StoryReduxState } from './createStoryStore'
import { setStorybookLocale, storybookI18n } from './i18n'
import type { Lang } from '@redux/Language/types'
import type { CurrentTheme } from '@redux/Theme/types'
import { setCurrentTheme } from '@redux/Theme/slice'

import styles from './AppDecorator.module.scss'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false },
    mutations: { retry: false },
  },
})

type StoryContext = {
  globals: {
    locale?: Lang
    theme?: CurrentTheme
  }
  parameters: {
    reduxState?: StoryReduxState
  }
}

const readBodyTheme = (): CurrentTheme =>
  (document.body.getAttribute('data-theme') as CurrentTheme) ?? 'light'

const AntdStoryShell: React.FC<{ children: React.ReactNode; locale: Lang }> = ({
  children,
  locale,
}) => {
  const validateMessages = GetValidateMessages()

  return (
    <ConfigProvider
      locale={locale === 'ru' ? russian : english}
      theme={getAntdThemeConfig()}
      form={{ validateMessages }}
    >
      <div className={styles.canvas}>{children}</div>
    </ConfigProvider>
  )
}

export const AppDecorator = (
  Story: React.FC,
  context: StoryContext
): React.ReactElement => {
  const locale = context.globals.locale ?? 'ru'
  const reduxTheme = context.globals.theme ?? readBodyTheme()

  React.useEffect(() => {
    setStorybookLocale(locale)
  }, [locale])

  React.useEffect(() => {
    document.body.setAttribute('data-theme', reduxTheme)
  }, [reduxTheme])

  const store = React.useMemo(
    () =>
      createStoryStore({
        theme: { currentTheme: reduxTheme },
        ...context.parameters.reduxState,
      }),
    [reduxTheme, context.parameters.reduxState]
  )

  React.useEffect(() => {
    store.dispatch(setCurrentTheme(reduxTheme))
  }, [reduxTheme, store])

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={storybookI18n}>
          <MemoryRouter>
            <AntdStoryShell locale={locale}>
              <Story />
            </AntdStoryShell>
          </MemoryRouter>
        </I18nextProvider>
      </QueryClientProvider>
    </Provider>
  )
}

/** Обёртка Row для карточек с grid Col внутри DefaultCard / AlertCard */
export const StoryRow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Row className={styles.row}>{children}</Row>
