import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ILanguageSliceState, Lang } from './types'

const initialState: ILanguageSliceState = {
  lang: (localStorage.getItem('lang') as Lang) ?? 'ru',
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLang(state, action: PayloadAction<Lang>) {
      state.lang = action.payload

      localStorage.setItem('lang', action.payload.toString())
    },
  },
})

export const { setLang } = languageSlice.actions

export default languageSlice.reducer
