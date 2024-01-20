enum IconEnum {
  CREATED_AT = 'fa-regular fa-calendar-circle-plus',
  MONEY = 'fa-solid fa-ruble-sign',

  GO = 'fa-solid fa-arrow-right-from-arc',
  EDIT = 'fa-solid fa-pen-to-square',
  DELETE = 'fa-solid fa-trash',
}

function getValueByKeyForStringEnum(value: string) {
  return Object.entries(IconEnum).find(([key, val]) => key === value)?.[1]
}

export const getIcon = (iconType: string) => {
  //return <i className={getValueByKeyForStringEnum(iconType)}></i>
  const icon = getValueByKeyForStringEnum(iconType)
  return icon ? icon : 'fa-solid fa-circle-question'
}
