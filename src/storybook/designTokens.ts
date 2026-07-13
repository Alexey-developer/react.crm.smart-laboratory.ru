/**
 * JS-зеркало `src/utils/scss/variables.scss` для Storybook / Claude Design.
 * При изменении SCSS-переменных — синхронизировать этот файл.
 */
export const designTokens = {
  geometry: {
    borderRadius: '8px',
    transitionTime: '0.5s',
  },
  brand: {
    defaultColor: 'rgb(115, 103, 240)',
    defaultColorWithOpacity: 'rgba(115, 103, 240, 0.16)',
    activeElementBoxShadow: 'rgba(115, 103, 240, 0.48) 0px 2px 6px',
    gradient: {
      deg: '72.47deg',
      color1: 'rgb(115, 103, 240)',
      percent1: '22.16%',
      color2: 'rgba(115, 103, 240, 0.7)',
      percent2: '76.47%',
    },
  },
  semantic: {
    success: 'rgb(40, 199, 111)',
    successWithOpacity: 'rgb(40, 199, 111, 0.16)',
    warning: 'rgb(255, 159, 67)',
    warningWithOpacity: 'rgb(255, 159, 67, 0.16)',
    danger: 'rgb(234, 84, 85)',
    dangerWithOpacity: 'rgb(234, 84, 85, 0.16)',
    dangerElementBoxShadow: 'rgba(234, 84, 85, 0.48) 0px 2px 6px',
  },
  light: {
    bg: 'rgb(248, 247, 250)',
    elementBg: 'rgb(255, 255, 255)',
    color: 'rgba(47, 43, 61, 0.68)',
    hoverBg: 'rgba(47, 43, 61, 0.04)',
    hoverColor: '#000',
    smallShadow: 'rgba(47, 43, 61, 0.14) 0px 2px 6px 0px',
    largeShadow: 'rgba(47, 43, 61, 0.1) 0px 4px 18px 0px',
  },
  dark: {
    bg: 'rgb(37, 41, 60)',
    elementBg: 'rgb(47, 51, 73)',
    color: 'rgba(208, 212, 241, 0.68)',
    hoverBg: 'rgba(208, 212, 241, 0.04)',
    hoverColor: '#fff',
    smallShadow: 'rgba(15, 20, 34, 0.14) 0px 2px 6px 0px',
    largeShadow: 'rgba(15, 20, 34, 0.1) 0px 4px 18px 0px',
  },
} as const

export type StorybookTheme = 'light' | 'dark'
