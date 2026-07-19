import { ProjectGroup } from '@api/models/project/queryGroup'
import { DirectionGroup } from '@api/models/direction/queryGroup'
import { CustomerCompanyGroup } from '@api/models/customerCompany/queryGroup'
import { OurCompanyGroup } from '@api/models/ourCompany/queryGroup'
import { CustomerProfileGroup } from '@api/models/customerProfile/queryGroup'
import { PhoneNumberGroup } from '@api/models/phoneNumber/queryGroup'
import { TaskGroup } from '@api/models/task/queryGroup'
import { WorkerProfileGroup } from '@api/models/workerProfile/queryGroup'
import { OperatorProfileGroup } from '@api/models/operatorProfile/queryGroup'
import { WorkTimeRangeGroup } from '@api/models/workTimeRange/queryGroup'

export type Groups =
  | typeof ProjectGroup
  | typeof DirectionGroup
  | typeof CustomerCompanyGroup
  | typeof OurCompanyGroup
  | typeof CustomerProfileGroup
  | typeof PhoneNumberGroup
  | typeof TaskGroup
  | typeof WorkerProfileGroup
  | typeof OperatorProfileGroup
  | typeof WorkTimeRangeGroup

export enum SelectFilterTypeEnum {
  PROJECT = 'project',
  DIRECTION = 'direction',
  CUSTOMER_COMPANY = 'customerCompany',
  OUR_COMPANY = 'ourCompany',
  CUSTOMER_PROFILE = 'customerProfile',
  PHONE_NUMBER = 'phoneNumber',
  TASK = 'task',
  WORKER_PROFILE = 'worker_profile',
  OPERATOR_PROFILE = 'operatorProfile',
  WORK_TIME_RANGE = 'workTimeRange',
}

const getSelectFilterLangCode = (value: keyof typeof SelectFilterTypeEnum) => {
  switch (value) {
    case 'PROJECT':
      return 'Form.EntitiesFields.project_id'
    case 'DIRECTION':
      return 'Form.EntitiesFields.direction_id'
    case 'CUSTOMER_COMPANY':
      return 'Form.EntitiesFields.customer_company_id'
    case 'OUR_COMPANY':
      return 'Form.EntitiesFields.our_company_id'
    case 'CUSTOMER_PROFILE':
      return 'Form.EntitiesFields.customer_profile_id'
    case 'PHONE_NUMBER':
      return 'Form.EntitiesFields.phone_number_id'
    case 'TASK':
      return 'Form.EntitiesFields.task_id'
    case 'WORKER_PROFILE':
      return 'Form.EntitiesFields.worker_profile_id'
    case 'OPERATOR_PROFILE':
      return 'Form.EntitiesFields.operator_profile_id'
    case 'WORK_TIME_RANGE':
      return 'Form.EntitiesFields.work_time_range_id'
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
    case 'OUR_COMPANY':
      return OurCompanyGroup
    case 'CUSTOMER_PROFILE':
      return CustomerProfileGroup
    case 'PHONE_NUMBER':
      return PhoneNumberGroup
    case 'TASK':
      return TaskGroup
    case 'WORKER_PROFILE':
      return WorkerProfileGroup
    case 'OPERATOR_PROFILE':
      return OperatorProfileGroup
    case 'WORK_TIME_RANGE':
      return WorkTimeRangeGroup
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
