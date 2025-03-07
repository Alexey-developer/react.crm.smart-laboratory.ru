import { RootState } from '../store'

export const selectIsSpinning = (state: RootState) => state.Spin.isSpinning
