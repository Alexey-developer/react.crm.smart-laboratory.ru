import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ISpinSliceState, IsSpinning } from './types'

const initialState: ISpinSliceState = {
  isSpinning: false,
}

const spinSlice = createSlice({
  name: 'spin',
  initialState,
  reducers: {
    setIsSpinning(state, action: PayloadAction<IsSpinning>) {
      state.isSpinning = action.payload
    },
  },
})

export const { setIsSpinning } = spinSlice.actions

export default spinSlice.reducer
