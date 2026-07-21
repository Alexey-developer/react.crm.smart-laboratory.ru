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
  DIRECTIONS = 'fa-solid fa-route',
  CALLS = 'fa-solid fa-headset',
  QUEUE = 'fa-solid fa-list-ol',
  PHONE_NUMBERS = 'fa-solid fa-phone',
  OPERATOR_PROFILES = 'fa-solid fa-headset',
  BLOCKED_PHONE_NUMBERS = 'fa-solid fa-ban',
  CALL_EXTENSIONS = 'fa-solid fa-diagram-nested',
  COMPANY_DIAL_NUMBERS = 'fa-solid fa-building',
  CUSTOMER_COMPANIES = 'fa-solid fa-building',
  OUR_COMPANIES = 'fa-solid fa-building-columns',
  WORKER_PROFILES = 'fa-solid fa-id-badge',
  CUSTOMER_PROFILES = 'fa-solid fa-users',

  PHONE = 'fa-solid fa-phone',
  PHONE_SLASH = 'fa-solid fa-phone-slash',
  PASSWORD = 'fa-solid fa-lock',

  MICROPHONE = 'fa-solid fa-microphone',
  MICROPHONE_SLASH = 'fa-solid fa-microphone-slash',
  VOLUME_HIGH = 'fa-solid fa-volume-high',
  VOLUME_XMARK = 'fa-solid fa-volume-xmark',
  DELETE_LEFT = 'fa-solid fa-delete-left',
  PAUSE = 'fa-solid fa-pause',
  CHEVRON_DOWN = 'fa-solid fa-chevron-down',
  DIAL_PAD = 'fa-solid fa-grip',
  CLOSE = 'fa-solid fa-xmark',

  ID = 'fa-solid fa-hashtag',

  CREATE = 'fa-solid fa-plus',
  GO = 'fa-solid fa-arrow-right-from-arc',
  EDIT = 'fa-solid fa-pen-to-square',
  DELETE = 'fa-solid fa-trash',
  RESTORE = 'fa-solid fa-trash-arrow-up',

  DOCUMENTS = 'fa-solid fa-file-lines',
  FILES = 'fa-solid fa-folder-open',
  PAPERCLIP = 'fa-solid fa-paperclip',
  UPLOAD = 'fa-solid fa-upload',
  DOWNLOAD = 'fa-solid fa-download',
  CLOUD_ARROW_UP = 'fa-solid fa-cloud-arrow-up',
  PLAY = 'fa-solid fa-play',
  EXPAND = 'fa-solid fa-expand',
  COMPRESS = 'fa-solid fa-compress',
  GAUGE = 'fa-solid fa-gauge-high',
}

function getValueByKeyForStringEnum(value: string) {
  return Object.entries(IconEnum).find(([key /*, val*/]) => key === value)?.[1]
}

export const getIcon = (iconType: string) => {
  //return <i className={getValueByKeyForStringEnum(iconType)}></i>
  const icon = getValueByKeyForStringEnum(iconType)
  return icon ?? 'fa-solid fa-circle-question'
}
