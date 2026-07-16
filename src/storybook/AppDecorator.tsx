import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider, Row } from 'antd'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter, useInRouterContext } from 'react-router-dom'

import { getAntdLocale } from '@utils/getAntdLocale'
import { GetValidateMessages } from '@utils/helpers'

import { getAntdThemeConfig } from './antdTheme'
import { createStoryStore, type StoryReduxState } from './createStoryStore'
import { setStorybookLocale, storybookI18n } from './i18n'
import { seedAPIQueries, type APIQuerySeed } from './queryMocks'
import type { Lang } from '@redux/Language/types'
import type { CurrentTheme } from '@redux/Theme/types'
import { setCurrentTheme } from '@redux/Theme/slice'

import styles from './AppDecorator.module.scss'

type StoryContext = {
  globals: {
    locale?: Lang
    theme?: CurrentTheme
  }
  parameters: {
    reduxState?: StoryReduxState
    router?: {
      initialEntries?: string[]
    }
    querySeeds?: APIQuerySeed[]
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
      locale={getAntdLocale(locale)}
      theme={getAntdThemeConfig()}
      form={{ validateMessages }}
    >
      <div className={styles.canvas}>{children}</div>
    </ConfigProvider>
  )
}

const StoryMemoryRouter: React.FC<{
  children: React.ReactNode
  initialEntries: string[]
}> = ({ children, initialEntries }) => {
  const isInRouterContext = useInRouterContext()

  if (isInRouterContext) {
    return <>{children}</>
  }

  return <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
}

export const AppDecorator = (
  Story: React.FC,
  context: StoryContext & { id: string }
): React.ReactElement => {
  const locale = context.globals.locale ?? 'ru'
  const reduxTheme = context.globals.theme ?? readBodyTheme()
  const initialEntries = context.parameters.router?.initialEntries ?? ['/projects']

  const queryClient = React.useMemo(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: { retry: false, refetchOnWindowFocus: false },
        mutations: { retry: false },
      },
    })
    if (context.parameters.querySeeds?.length) {
      seedAPIQueries(client, context.parameters.querySeeds)
    }
    return client
  }, [context.id, context.parameters.querySeeds])

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
        currentUser: { authToken: 'storybook-token', perPage: 16 },
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
          <StoryMemoryRouter initialEntries={initialEntries}>
            <AntdStoryShell locale={locale}>
              <Story />
            </AntdStoryShell>
          </StoryMemoryRouter>
        </I18nextProvider>
      </QueryClientProvider>
    </Provider>
  )
}

/** Обёртка Row для карточек с grid Col внутри DefaultCard / AlertCard */
export const StoryRow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Row className={styles.row}>{children}</Row>
