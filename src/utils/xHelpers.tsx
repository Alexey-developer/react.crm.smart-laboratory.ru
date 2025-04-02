export const getFormCardTitle = (iconType: string) => (
  <i
    className={`${getIcon(iconType)} fa-fade`}
    style={{ animationDuration: '4s' }}
  ></i>
)

import type { TColorType } from '@api/common/types/TColorType'

import type { FormCard } from '@components/CustomForm'
import { formCardExtra } from '@utils/formCardExtra'
import { getIcon } from '@utils/getIcon'
export const getFormCard = (
  badgeRibbonText: string,
  extraText: string,
  className: TColorType,
  iconType: string
) => {
  const formCard: FormCard = {
    title: getFormCardTitle(iconType),
    type: 'default',
    badgeRibbonText: badgeRibbonText,
    badgeRibbonClassName: className.replace(' transparent', '') as TColorType,
    extra: formCardExtra(className, extraText),
  }

  return formCard
}

import type { Store } from 'rc-field-form/lib/interface'
import type { GroupClass } from '@api/common/types/TGroups'
import { type FormItem, CustomForm } from '@components/CustomForm'
import { getMethod } from '@utils/getMethod'
export const getCustomForm = (
  formItems: FormItem[],
  badgeRibbonText: string,
  extraText: string,
  className: TColorType,
  iconType: string,
  groupClass: GroupClass,
  methodType: string,
  btnIcon: string,
  btnText: string,
  initialValues?: Store,
  entityId?: number
) => (
  <CustomForm
    name='entityCreateEdit'
    formItems={formItems}
    initialValues={initialValues}
    formCard={getFormCard(badgeRibbonText, extraText, className, iconType)}
    requestData={{
      groupClass: groupClass,
      groupMethod: getMethod(methodType),
    }}
    onSuccessMutation={data => {
      // dispatch(setAuthToken(data.data.access_token))
    }}
    btnIcon={btnIcon}
    btnText={btnText}
    entityId={entityId}
  />
)
