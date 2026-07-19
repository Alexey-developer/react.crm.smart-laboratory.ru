import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  getOpenKeysFromStorage,
  getStringFromOpenKeys,
  LEFT_MENU_OPEN_KEYS_STORAGE_KEY,
} from './helpers'
import type { ILeftMenuOpenKeysSliceState, OpenKeys } from './types'

const initialState: ILeftMenuOpenKeysSliceState = {
  openKeys: getOpenKeysFromStorage(
    localStorage.getItem(LEFT_MENU_OPEN_KEYS_STORAGE_KEY)
  ),
}

const leftMenuOpenKeysSlice = createSlice({
  name: 'leftMenuOpenKeys',
  initialState,
  reducers: {
    setOpenKeys(state, action: PayloadAction<OpenKeys>) {
      state.openKeys = action.payload
      localStorage.setItem(
        LEFT_MENU_OPEN_KEYS_STORAGE_KEY,
        getStringFromOpenKeys(action.payload)
      )
    },
  },
})

export const { setOpenKeys } = leftMenuOpenKeysSlice.actions

export default leftMenuOpenKeysSlice.reducer
