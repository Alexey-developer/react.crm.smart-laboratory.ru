import { ProjectTypeGroup } from '@api/models/projectType/queryGroup'
import { ProjectStatusGroup } from '@api/models/projectStatus/queryGroup'
import { TaskStatusGroup } from '@api/models/taskStatus/queryGroup'

export type Groups =
  | typeof ProjectTypeGroup
  | typeof ProjectStatusGroup
  | typeof TaskStatusGroup

export enum CheckboxFilterTypeEnum {
  PROJECT_TYPE = 'project_type',
  PROJECT_STATUS = 'project_status',
  TASK_STATUS = 'task_status',
}

const getCheckBoxFilterLangCode = (
  value: keyof typeof CheckboxFilterTypeEnum
) => {
  switch (value) {
    case 'PROJECT_TYPE':
      return 'Filters.types'
    case 'PROJECT_STATUS':
    case 'TASK_STATUS':
      return 'Filters.statuses'
    default:
      return 'no_phrase'
  }
}

const getCheckboxFilterGroup = (
  value: keyof typeof CheckboxFilterTypeEnum
): Groups => {
  switch (value) {
    case 'PROJECT_TYPE':
      return ProjectTypeGroup
    case 'PROJECT_STATUS':
      return ProjectStatusGroup
    case 'TASK_STATUS':
      return TaskStatusGroup
    // default:
    //   return ''
  }
}

const getValueByKeyForStringEnum = (
  value: keyof typeof CheckboxFilterTypeEnum
) => {
  return {
    type:
      Object.entries(CheckboxFilterTypeEnum).find(
        ([key]) => key === value
      )?.[1] ?? 'checkbox',
    lang_code: getCheckBoxFilterLangCode(value),
    group: getCheckboxFilterGroup(value),
  }
}

export const getCheckboxFilterType = (
  checkboxFilterType: keyof typeof CheckboxFilterTypeEnum
) => {
  return getValueByKeyForStringEnum(checkboxFilterType)
}
