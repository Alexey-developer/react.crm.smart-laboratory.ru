import { RootState } from '../store'

export const selectLeftMenuOpenKeys = (state: RootState) =>
  state.LeftMenuOpenKeys.openKeys
