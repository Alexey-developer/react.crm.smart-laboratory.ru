import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import CollapseSider from './CollapseSider/slice'
import CurrentForm from './CurrentForm/slice'
import CurrentUser from './CurrentUser/slice'
import Filters from './Filters/slice'
import HeaderNotification from './HeaderNotification/slice'
import Language from './Language/slice'
import PageLoading from './PageLoading/slice'
import PhonePrefix from './PhonePrefix/slice'
import Spin from './Spin/slice'
import TasksView from './TasksView/slice'
import Theme from './Theme/slice'

export const store = configureStore({
  reducer: {
    CollapseSider,
    CurrentForm,
    CurrentUser,
    Filters,
    HeaderNotification,
    Language,
    PageLoading,
    PhonePrefix,
    Spin,
    TasksView,
    Theme,
  },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
