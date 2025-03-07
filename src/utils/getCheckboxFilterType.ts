import { ProjectStatusGroup } from '@api/models/projectStatus/queryGroup'
import { ProjectTypeGroup } from '@api/models/projectType/queryGroup'

enum CheckboxFilterLangEnum {
  STATUS = 'Filters.statuses',
  TYPE = 'Filters.types',
}
export enum CheckboxFilterTypeEnum {
  STATUS = 'status',
  TYPE = 'type',
}

const getValueByKeyForStringEnum = (
  value: keyof typeof CheckboxFilterTypeEnum
) => {
  return {
    type:
      Object.entries(CheckboxFilterTypeEnum).find(
        ([key]) => key === value
      )?.[1] ?? 'checkbox',
    lang_code:
      Object.entries(CheckboxFilterLangEnum).find(
        ([key]) => key === value
      )?.[1] ?? 'no_phrase',
    group: getCheckboxFilterGroup(value),
  }
}

const getCheckboxFilterGroup = (value: keyof typeof CheckboxFilterTypeEnum) => {
  switch (value) {
    case 'STATUS':
      return ProjectStatusGroup
    case 'TYPE':
      return ProjectTypeGroup
    default:
      return ''
  }
}

export const getCheckboxFilterType = (
  checkboxFilterType: keyof typeof CheckboxFilterTypeEnum
) => {
  return getValueByKeyForStringEnum(checkboxFilterType)
}
