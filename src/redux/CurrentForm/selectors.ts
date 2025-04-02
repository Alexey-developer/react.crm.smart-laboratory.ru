import { RootState } from '../store'

export const selectCurrentFormSetFieldsValue = (state: RootState) =>
  state.CurrentForm.setFieldsValue
