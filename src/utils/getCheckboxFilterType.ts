import { ProjectStatusGroup } from '@api/models/projectStatus/queryGroup'
import { DirectionStatusGroup } from '@api/models/directionStatus/queryGroup'
import { DirectionFamilyGroup } from '@api/models/directionFamily/queryGroup'
import { DirectionTypeGroup } from '@api/models/directionType/queryGroup'
import { PaymentModelGroup } from '@api/models/paymentModel/queryGroup'
import { PaymentPeriodGroup } from '@api/models/paymentPeriod/queryGroup'
import { TaskStatusGroup } from '@api/models/taskStatus/queryGroup'
import { CurrencyGroup } from '@api/models/currency/queryGroup'
import { OrganizationalLegalFormGroup } from '@api/models/organizationalLegalForm/queryGroup'
import { EmploymentFormGroup } from '@api/models/employmentForm/queryGroup'

export type Groups =
  | typeof ProjectStatusGroup
  | typeof DirectionStatusGroup
  | typeof DirectionFamilyGroup
  | typeof DirectionTypeGroup
  | typeof PaymentModelGroup
  | typeof PaymentPeriodGroup
  | typeof TaskStatusGroup
  | typeof CurrencyGroup
  | typeof OrganizationalLegalFormGroup
  | typeof EmploymentFormGroup

export enum CheckboxFilterTypeEnum {
  PROJECT_STATUS = 'status',
  DIRECTION_STATUS = 'status',
  DIRECTION_FAMILY = 'direction_family',
  DIRECTION_TYPE = 'direction_type',
  PAYMENT_MODEL = 'payment_model',
  PAYMENT_PERIOD = 'payment_period',
  TASK_STATUS = 'task_status',
  CURRENCY = 'currency',
  ORGANIZATIONAL_LEGAL_FORM = 'organizational_legal_form',
  EMPLOYMENT_FORM = 'employment_form',
}

const getCheckBoxFilterLangCode = (
  value: keyof typeof CheckboxFilterTypeEnum
) => {
  switch (value) {
    case 'DIRECTION_FAMILY':
      return 'Filters.direction_family'
    case 'DIRECTION_TYPE':
      return 'Filters.direction_type'
    case 'PAYMENT_MODEL':
      return 'Filters.payment_model'
    case 'PAYMENT_PERIOD':
      return 'Filters.payment_period'
    case 'DIRECTION_STATUS':
    case 'PROJECT_STATUS':
    case 'TASK_STATUS':
      return 'Filters.statuses'
    case 'CURRENCY':
      return 'Filters.currency'
    case 'ORGANIZATIONAL_LEGAL_FORM':
      return 'Filters.organizational_legal_form'
    case 'EMPLOYMENT_FORM':
      return 'Filters.employment_form'
    default:
      return 'no_phrase'
  }
}

const getCheckboxFilterGroup = (
  value: keyof typeof CheckboxFilterTypeEnum
): Groups => {
  switch (value) {
    case 'PROJECT_STATUS':
      return ProjectStatusGroup
    case 'DIRECTION_STATUS':
      return DirectionStatusGroup
    case 'DIRECTION_FAMILY':
      return DirectionFamilyGroup
    case 'DIRECTION_TYPE':
      return DirectionTypeGroup
    case 'PAYMENT_MODEL':
      return PaymentModelGroup
    case 'PAYMENT_PERIOD':
      return PaymentPeriodGroup
    case 'TASK_STATUS':
      return TaskStatusGroup
    case 'CURRENCY':
      return CurrencyGroup
    case 'ORGANIZATIONAL_LEGAL_FORM':
      return OrganizationalLegalFormGroup
    case 'EMPLOYMENT_FORM':
      return EmploymentFormGroup
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
