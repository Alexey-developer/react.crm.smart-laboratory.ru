import React from 'react'

import { useQueryClient } from '@tanstack/react-query'
import type { Decorator } from '@storybook/react-vite'
import { useDispatch } from 'react-redux'
import { MemoryRouter, useInRouterContext } from 'react-router-dom'

import { setPrefix } from '@redux/PhonePrefix/slice'
import { setIsSpinning } from '@redux/Spin/slice'
import { setCurrentTheme } from '@redux/Theme/slice'

import { seedAPIQueries, type APIQuerySeed } from './queryMocks'
import type { StoryReduxState } from './createStoryStore'

type StoryParameters = {
  router?: { initialEntries?: string[] }
  querySeeds?: APIQuerySeed[]
  reduxState?: StoryReduxState
}

const StoryRouter: React.FC<{
  Story: React.FC
  initialEntries: string[]
}> = ({ Story, initialEntries }) => {
  const isInRouterContext = useInRouterContext()

  if (isInRouterContext) {
    return <Story />
  }

  return (
    <MemoryRouter initialEntries={initialEntries}>
      <Story />
    </MemoryRouter>
  )
}

/**
 * Router только если его ещё нет. В Storybook Router уже даёт AppDecorator,
 * а в design-sync PreviewProviders работает без Router и полагается на этот декоратор.
 */
export const withStoryRouter: Decorator = (Story, { parameters }) => {
  const { router } = parameters as StoryParameters
  const initialEntries = router?.initialEntries ?? ['/projects']

  return <StoryRouter Story={Story} initialEntries={initialEntries} />
}

/** Подмешать API-моки в текущий QueryClient (design-sync + Storybook). */
export const withStoryQuerySeeds: Decorator = (Story, { parameters }) => {
  const client = useQueryClient()
  const { querySeeds } = parameters as StoryParameters

  React.useEffect(() => {
    if (querySeeds?.length) {
      seedAPIQueries(client, querySeeds)
    }
  }, [client, querySeeds])

  return <Story />
}

/** Применить parameters.reduxState к уже существующему store (design-sync). */
export const withStoryReduxState: Decorator = (Story, { parameters }) => {
  const dispatch = useDispatch()
  const { reduxState } = parameters as StoryParameters

  React.useEffect(() => {
    if (!reduxState) return

    if (reduxState.spin?.isSpinning !== undefined) {
      dispatch(setIsSpinning(reduxState.spin.isSpinning))
    }
    if (reduxState.phonePrefix?.prefix !== undefined) {
      dispatch(setPrefix(reduxState.phonePrefix.prefix))
    }
    if (reduxState.theme?.currentTheme) {
      dispatch(setCurrentTheme(reduxState.theme.currentTheme))
      document.body.setAttribute('data-theme', reduxState.theme.currentTheme)
    }
  }, [dispatch, reduxState])

  return <Story />
}
