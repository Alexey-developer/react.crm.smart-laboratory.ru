import React from 'react'

import { Tag, Descriptions } from 'antd'

import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { BlockedPhoneNumberGroup } from '@api/models/blockedPhoneNumber/queryGroup'

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
import { BLOCKED_PHONE_NUMBERS } from '@utils/constants/routes'
import { formatE164Display } from '@utils/phoneE164'

export const BlockedPhoneNumberPage: React.FC = () => {
  const { entityId } = useParams()
  const blockedPhoneNumberId = Number(entityId)
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(
    `${translated_phrase('MenuItems.Telephony.blocked_phone_numbers')}: #${entityId}`
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data, isLoading, isFetching, error } = useAPIQuery(
    BlockedPhoneNumberGroup,
    getMethod('SHOW'),
    {
      id: entityId,
    }
  )

  const blockedPhoneNumber = data?.data

  const { mutateAsync: mutateAsyncDelete } = useAPIMutation(
    BlockedPhoneNumberGroup,
    getMethod('DESTROY'),
    {}
  )

  const cardActions = useFormActions(
    blockedPhoneNumberId,
    [1, 2],
    () =>
      mutateAsyncDelete(blockedPhoneNumberId).then(() =>
        navigate(`/${BLOCKED_PHONE_NUMBERS}`)
      ),
    { abilities: blockedPhoneNumber?.can }
  )

  React.useEffect(() => {
    dispatch(setPageIsLoaded(!isLoading && !isFetching))
  }, [isLoading, isFetching])

  return (
    <>
      <Skeleton
        isLoading={isLoading}
        width='100%'
        height='100'
        skeleton={<></>}
        content={<></>}
      />
      {blockedPhoneNumber ? (
        <DefaultCard
          grid={{ xs: 24, lg: 24, xl: 24, xxl: 24 }}
          key={blockedPhoneNumber.id}
          type='default'
          title={formatE164Display(blockedPhoneNumber.e164)}
          badgeRibbonText={
            blockedPhoneNumber.is_active
              ? translated_phrase('Form.EntitiesFields.is_active')
              : undefined
          }
          badgeRibbonClassName='success'
          content={
            <>
              {blockedPhoneNumber.comment && (
                <Descriptions column={1} size='small'>
                  <Descriptions.Item
                    label={translated_phrase('Form.EntitiesFields.comment')}
                  >
                    {blockedPhoneNumber.comment}
                  </Descriptions.Item>
                </Descriptions>
              )}
              <Tag
                className='transparent'
                icon={<i className={getIcon('CREATED_AT')}></i>}
              >
                {blockedPhoneNumber.created_at}
              </Tag>
            </>
          }
          actions={cardActions}
          extra={formCardExtra(
            'success transparent',
            translated_phrase('MenuItems.Telephony.blocked_phone_numbers')
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
