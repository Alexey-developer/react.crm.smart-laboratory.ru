import type { ThemeConfig } from 'antd'

import { designTokens } from './designTokens'

/** Ant Design design tokens, синхронизированные с variables.scss */
export const getAntdThemeConfig = (): ThemeConfig => ({
  token: {
    colorPrimary: designTokens.brand.defaultColor,
    colorSuccess: designTokens.semantic.success,
    colorWarning: designTokens.semantic.warning,
    colorError: designTokens.semantic.danger,
    borderRadius: 8,
    motionDurationMid: designTokens.geometry.transitionTime,
  },
})
