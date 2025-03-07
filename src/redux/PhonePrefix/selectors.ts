import { RootState } from '../store'

export const selectPrefix = (state: RootState) => state.PhonePrefix.prefix
