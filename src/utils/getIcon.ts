enum IconEnum {
  FLASK = 'fa-solid fa-flask',

  INFO = 'fa-solid fa-circle-info',
  SUCCESS = 'fa-solid fa-circle-check',
  ERROR = 'fa-solid fa-circle-exclamation',

  CREATED_AT = 'fa-regular fa-calendar-circle-plus',
  RUBLE = 'fa-solid fa-ruble-sign',
  TIME = 'fa-solid fa-timer',

  TASKS = 'fa-solid fa-list-check',
  PROJECTS = 'fa-solid fa-diagram-project',

  PHONE = 'fa-solid fa-phone',
  PASSWORD = 'fa-solid fa-lock',

  ID = 'fa-solid fa-hashtag',

  CREATE = 'fa-solid fa-plus',
  GO = 'fa-solid fa-arrow-right-from-arc',
  EDIT = 'fa-solid fa-pen-to-square',
  DELETE = 'fa-solid fa-trash',
  RESTORE = 'fa-solid fa-trash-arrow-up',
}

function getValueByKeyForStringEnum(value: string) {
  return Object.entries(IconEnum).find(([key /*, val*/]) => key === value)?.[1]
}

export const getIcon = (iconType: string) => {
  //return <i className={getValueByKeyForStringEnum(iconType)}></i>
  const icon = getValueByKeyForStringEnum(iconType)
  return icon ?? 'fa-solid fa-circle-question'
}
