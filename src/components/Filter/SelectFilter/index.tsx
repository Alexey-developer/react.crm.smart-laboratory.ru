import { useTranslation } from 'react-i18next'

import { CustomSelect } from '@components/CustomSelect'

import {
  SelectFilterTypeEnum,
  getSelectFilterType,
} from '@utils/getSelectFilterType'

export const SelectFilter = (type: keyof typeof SelectFilterTypeEnum) => {
  const [translated_phrase] = useTranslation('global')

  return {
    groupName: translated_phrase(getSelectFilterType(type).lang_code),
    filedName: getSelectFilterType(type).type,
    content: <CustomSelect type={type} />,
  }
}
