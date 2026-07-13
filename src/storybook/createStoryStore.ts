import { configureStore, type PreloadedState } from '@reduxjs/toolkit'

import CollapseSider from '@redux/CollapseSider/slice'
import CurrentUser from '@redux/CurrentUser/slice'
import Filters from '@redux/Filters/slice'
import HeaderNotification from '@redux/HeaderNotification/slice'
import Language from '@redux/Language/slice'
import PageLoading from '@redux/PageLoading/slice'
import PhonePrefix from '@redux/PhonePrefix/slice'
import Spin from '@redux/Spin/slice'
import TasksView from '@redux/TasksView/slice'
import Theme from '@redux/Theme/slice'
import type { RootState } from '@redux/store'

const rootReducer = {
  CollapseSider,
  CurrentUser,
  Filters,
  HeaderNotification,
  Language,
  PageLoading,
  PhonePrefix,
  Spin,
  TasksView,
  Theme,
}

export type StoryReduxState = Partial<PreloadedState<RootState>>

export const createStoryStore = (preloadedState?: StoryReduxState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  })
