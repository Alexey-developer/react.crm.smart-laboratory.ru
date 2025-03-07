enum MethodEnum {
  LOGIN = 'login',
  CURRENT_USER = 'currentUser',

  INDEX = 'index',
  SHOW = 'show',
  STORE = 'store',
  UPDATE = 'update',
  DESTROY = 'destroy',
  RESTORE = 'restore',
}

function getValueByKeyForStringEnum(value: string) {
  return Object.entries(MethodEnum).find(
    ([key /*, val*/]) => key === value
  )?.[1]
}

export const getMethod = (methodType: string) => {
  const method = getValueByKeyForStringEnum(methodType)
  return method ?? MethodEnum.INDEX
}
