import { ProjectGroup } from '@api/models/project/queryGroup'
import { CustomerCompanyGroup } from '@api/models/customerCompany/queryGroup'

export type Groups = typeof ProjectGroup | typeof CustomerCompanyGroup

// import { ProjectTypeGroup } from '@api/models/projectType/queryGroup'

enum SelectFilterLangEnum {
  PROJECT = 'project',
  CUSTOMER_COMPANY = 'customerCompany',
}
export enum SelectFilterTypeEnum {
  PROJECT = 'project',
  CUSTOMER_COMPANY = 'customerCompany',
}

const getValueByKeyForStringEnum = (
  value: keyof typeof SelectFilterTypeEnum
) => {
  return {
    type:
      Object.entries(SelectFilterTypeEnum).find(
        ([key]) => key === value
      )?.[1] ?? 'select',
    lang_code:
      Object.entries(SelectFilterLangEnum).find(
        ([key]) => key === value
      )?.[1] ?? 'no_phrase',
    group: getSelectFilterGroup(value),
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

export const getSelectFilterType = (
  selectFilterType: keyof typeof SelectFilterTypeEnum
) => {
  return getValueByKeyForStringEnum(selectFilterType)
}
