import { ProjectGroup } from '@api/models/project/queryGroup'
import { DirectionGroup } from '@api/models/direction/queryGroup'
import { CustomerCompanyGroup } from '@api/models/customerCompany/queryGroup'
import { TaskGroup } from '@api/models/task/queryGroup'
import { WorkerProfileGroup } from '@api/models/workerProfile/queryGroup'

export type Groups =
  | typeof ProjectGroup
  | typeof DirectionGroup
  | typeof CustomerCompanyGroup
  | typeof TaskGroup
  | typeof WorkerProfileGroup

export enum SelectFilterTypeEnum {
  PROJECT = 'project',
  DIRECTION = 'direction',
  CUSTOMER_COMPANY = 'customerCompany',
  TASK = 'task',
  WORKER_PROFILE = 'worker_profile',
}

const getSelectFilterLangCode = (value: keyof typeof SelectFilterTypeEnum) => {
  switch (value) {
    case 'PROJECT':
      return 'Form.EntitiesFields.project_id'
    case 'DIRECTION':
      return 'Form.EntitiesFields.direction_id'
    case 'CUSTOMER_COMPANY':
      return 'Form.EntitiesFields.customer_company_id'
    case 'TASK':
      return 'Form.EntitiesFields.task_id'
    case 'WORKER_PROFILE':
      return 'Form.EntitiesFields.worker_profile_id'
    default:
      return 'no_phrase'
  }
}

const getSelectFilterGroup = (
  value: keyof typeof SelectFilterTypeEnum
): Groups => {
  switch (value) {
    case 'PROJECT':
      return ProjectGroup
    case 'DIRECTION':
      return DirectionGroup
    case 'CUSTOMER_COMPANY':
      return CustomerCompanyGroup
    case 'TASK':
      return TaskGroup
    case 'WORKER_PROFILE':
      return WorkerProfileGroup
  }
}

const getValueByKeyForStringEnum = (
  value: keyof typeof SelectFilterTypeEnum
) => {
  return {
    type:
      Object.entries(SelectFilterTypeEnum).find(
        ([key]) => key === value
      )?.[1] ?? 'select',
    lang_code: getSelectFilterLangCode(value),
    group: getSelectFilterGroup(value),
  }
}

export const getSelectFilterType = (
  selectFilterType: keyof typeof SelectFilterTypeEnum
) => {
  return getValueByKeyForStringEnum(selectFilterType)
}
