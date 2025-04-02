export interface ICurrentFormSliceState {
  setFieldsValue: SetFieldsValue
}
export type SetFieldsValue = ((values: any) => void) | null
