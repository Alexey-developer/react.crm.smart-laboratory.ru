enum IconEnum {
  CREATED_AT = 'fa-regular fa-calendar-circle-plus',
  RUBLE = 'fa-solid fa-ruble-sign',
  TIME = 'fa-solid fa-timer',

  TASKS = 'fa-solid fa-list-check',
  PROJECTS = 'fa-solid fa-diagram-project',

  CREATE = 'fa-solid fa-plus',
  GO = 'fa-solid fa-arrow-right-from-arc',
  EDIT = 'fa-solid fa-pen-to-square',
  DELETE = 'fa-solid fa-trash',
}

function getValueByKeyForStringEnum(value: string) {
  return Object.entries(IconEnum).find(([key /*, val*/]) => key === value)?.[1]
}

export const getIcon = (iconType: string) => {
  //return <i className={getValueByKeyForStringEnum(iconType)}></i>
  const icon = getValueByKeyForStringEnum(iconType)
  return icon ? icon : 'fa-solid fa-circle-question'
}
