import type { OpenKeys } from './types'

export const LEFT_MENU_OPEN_KEYS_STORAGE_KEY = 'leftMenuOpenKeys'

export const getOpenKeysFromStorage = (raw: string | null): OpenKeys => {
  if (!raw) {
    return []
  }

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter((key): key is string => typeof key === 'string')
  } catch {
    return []
  }
}

export const getStringFromOpenKeys = (openKeys: OpenKeys): string =>
  JSON.stringify(openKeys)
