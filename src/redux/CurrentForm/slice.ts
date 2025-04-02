import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ICurrentFormSliceState, SetFieldsValue } from './types'

const initialState: ICurrentFormSliceState = {
  setFieldsValue: null,
}

const currentFormSlice = createSlice({
  name: 'currentForm',
  initialState,
  reducers: {
    setSetFieldsValue(state, action: PayloadAction<SetFieldsValue>) {
      console.log(`action = `)
      console.log(action)

      state.setFieldsValue = action.payload
      //   const [t] = action.payload
      //   state.currentForm = t
      //   state.currentForm = { ...action.payload }
      //   Object.assign({}, state.currentForm, { ...action.payload })
    },
  },
})

export const { setSetFieldsValue } = currentFormSlice.actions

export default currentFormSlice.reducer
