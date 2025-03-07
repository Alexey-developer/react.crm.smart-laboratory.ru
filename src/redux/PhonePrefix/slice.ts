import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { IPhonePrefixSliceState, Prefix } from './types'

const initialState: IPhonePrefixSliceState = {
  prefix: parseInt(localStorage.getItem('prefix') ?? '7') as Prefix,
}

const phonePrefixSlice = createSlice({
  name: 'phonePrefix',
  initialState,
  reducers: {
    setPrefix(state, action: PayloadAction<Prefix>) {
      state.prefix = action.payload

      localStorage.setItem('prefix', state.prefix.toString())
    },
  },
})

export const { setPrefix } = phonePrefixSlice.actions

export default phonePrefixSlice.reducer
