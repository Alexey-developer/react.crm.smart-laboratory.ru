import { RootState } from '../store'

export const selectLang = (state: RootState) => state.Language.lang
