import { ProjectGroup } from '@api/models/project/queryGroup'
import { DirectionGroup } from '@api/models/direction/queryGroup'
import { CustomerCompanyGroup } from '@api/models/customerCompany/queryGroup'

export type Groups =
  | typeof ProjectGroup
  | typeof DirectionGroup
  | typeof CustomerCompanyGroup

export enum SelectFilterTypeEnum {
  PROJECT = 'project',
  DIRECTION = 'direction',
  CUSTOMER_COMPANY = 'customerCompany',
}

const getSelectFilterLangCode = (value: keyof typeof SelectFilterTypeEnum) => {
  switch (value) {
    case 'PROJECT':
      return 'Form.EntitiesFields.project_id'
    case 'DIRECTION':
      return 'Form.EntitiesFields.direction_id'
    case 'CUSTOMER_COMPANY':
      return 'Form.EntitiesFields.customer_company_id'
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
