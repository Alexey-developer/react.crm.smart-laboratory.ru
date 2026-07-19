import React from 'react'

import { Tag, Descriptions } from 'antd'

import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { PhoneNumberGroup } from '@api/models/phoneNumber/queryGroup'

import { useAPIQuery } from '@api/useAPIQuery'
import { useAPIMutation } from '@api/useAPIMutation'

import { Skeleton } from '@components/Skeleton'
import { useFormActions } from '@components/EntityIndex/FormActions'
import { AlertCard } from '@components/AlertCard'
import { DefaultCard } from '@components/DefaultCard'

import { getMethod } from '@utils/getMethod'
import { SetPageTitle } from '@utils/helpers'
import { formCardExtra } from '@utils/formCardExtra'
import { getIcon } from '@utils/getIcon'
import { PHONE_NUMBERS } from '@utils/constants/routes'
import { formatE164Display } from '@utils/phoneE164'

export const PhoneNumberPage: React.FC = () => {
  const { entityId } = useParams()
  const phoneNumberId = Number(entityId)
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(
    `${translated_phrase('MenuItems.Telephony.phone_numbers')}: #${entityId}`
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data, isLoading, isFetching, error } = useAPIQuery(
    PhoneNumberGroup,
    getMethod('SHOW'),
    {
      id: entityId,
    }
  )

  const phoneNumber = data?.data

  const { mutateAsync: mutateAsyncDelete } = useAPIMutation(
    PhoneNumberGroup,
    getMethod('DESTROY'),
    {}
  )

  const cardActions = useFormActions(phoneNumberId, [1, 2], () =>
    mutateAsyncDelete(phoneNumberId).then(() => navigate(`/${PHONE_NUMBERS}`))
  )

  React.useEffect(() => {
    dispatch(setPageIsLoaded(!isLoading && !isFetching))
  }, [isLoading, isFetching])

  const phoneableName =
    phoneNumber?.phoneable && 'name' in phoneNumber.phoneable
      ? phoneNumber.phoneable.name
      : phoneNumber?.phoneable && 'user' in phoneNumber.phoneable
        ? phoneNumber.phoneable.user?.name
        : undefined

  return (
    <>
      <Skeleton
        isLoading={isLoading}
        width='100%'
        height='100'
        skeleton={<></>}
        content={<></>}
      />
      {phoneNumber ? (
        <DefaultCard
          grid={{ xs: 24, lg: 24, xl: 24, xxl: 24 }}
          key={phoneNumber.id}
          type='default'
          title={formatE164Display(phoneNumber.e164)}
          badgeRibbonText={
            phoneNumber.is_primary
              ? translated_phrase('Form.EntitiesFields.is_primary')
              : undefined
          }
          badgeRibbonClassName='success'
          content={
            <>
              {phoneNumber.label && <h2>{phoneNumber.label}</h2>}
              <Descriptions column={1} size='small'>
                <Descriptions.Item
                  label={translated_phrase('Form.EntitiesFields.phoneable_type')}
                >
                  {translated_phrase(
                    `Types.PhoneNumber.${phoneNumber.phoneable_type}`
                  )}
                </Descriptions.Item>
                {phoneableName && (
                  <Descriptions.Item
                    label={translated_phrase('Form.EntitiesFields.phoneable_id')}
                  >
                    {phoneableName}
                  </Descriptions.Item>
                )}
              </Descriptions>
              <Tag
                className='transparent'
                icon={<i className={getIcon('CREATED_AT')}></i>}
              >
                {phoneNumber.created_at}
              </Tag>
            </>
          }
          actions={cardActions}
          extra={formCardExtra(
            'success transparent',
            translated_phrase('MenuItems.Telephony.phone_numbers')
          )}
        />
      ) : isLoading ? (
        <DefaultCard
          grid={{ xs: 24, lg: 24, xl: 24, xxl: 24 }}
          isLoading={true}
          title=''
          content={<></>}
        />
      ) : (
        error && (
          <AlertCard
            message={error.response?.statusText}
            description={error.message}
            icon={<i className={getIcon('ERROR')}></i>}
            type='danger'
            col={false}
          />
        )
      )}
    </>
  )
}
