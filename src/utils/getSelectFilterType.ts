import { ProjectGroup } from '@api/models/project/queryGroup'
import { CustomerCompanyGroup } from '@api/models/customerCompany/queryGroup'

export type Groups = typeof ProjectGroup | typeof CustomerCompanyGroup

export enum SelectFilterTypeEnum {
  PROJECT = 'project',
  CUSTOMER_COMPANY = 'customerCompany',
}

const getSelectFilterLangCode = (value: keyof typeof SelectFilterTypeEnum) => {
  switch (value) {
    case 'PROJECT':
      return 'project'
    case 'CUSTOMER_COMPANY':
      return 'customerCompany'
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
    case 'CUSTOMER_COMPANY':
      return CustomerCompanyGroup
    // default:
    //   return ''
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
