import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import Theme from './Theme/slice'
import CollapseSider from './CollapseSider/slice'
import Language from './Language/slice'
import PageLoading from './PageLoading/slice'
import TasksView from './TasksView/slice'

export const store = configureStore({
  reducer: {
    Theme,
    CollapseSider,
    Language,
    PageLoading,
    TasksView,
  },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
