import React from 'react'

import { Tag, Descriptions } from 'antd'

import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { CallExtensionGroup } from '@api/models/callExtension/queryGroup'

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
import { CALL_EXTENSIONS } from '@utils/constants/routes'
import { formatE164Display } from '@utils/phoneE164'

export const CallExtensionPage: React.FC = () => {
  const { entityId } = useParams()
  const callExtensionId = Number(entityId)
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(
    `${translated_phrase('MenuItems.Telephony.call_extensions')}: #${entityId}`
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data, isLoading, isFetching, error } = useAPIQuery(
    CallExtensionGroup,
    getMethod('SHOW'),
    {
      id: entityId,
    }
  )

  const callExtension = data?.data

  const { mutateAsync: mutateAsyncDelete } = useAPIMutation(
    CallExtensionGroup,
    getMethod('DESTROY'),
    {}
  )

  const cardActions = useFormActions(callExtensionId, [1, 2], () =>
    mutateAsyncDelete(callExtensionId).then(() =>
      navigate(`/${CALL_EXTENSIONS}`)
    )
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
      {callExtension ? (
        <DefaultCard
          grid={{ xs: 24, lg: 24, xl: 24, xxl: 24 }}
          key={callExtension.id}
          type='default'
          title={`${callExtension.code}${
            callExtension.display_name ? ` — ${callExtension.display_name}` : ''
          }`}
          badgeRibbonText={
            callExtension.is_active
              ? translated_phrase('Form.EntitiesFields.is_active')
              : undefined
          }
          badgeRibbonClassName='success'
          content={
            <>
              <Descriptions column={1} size='small'>
                <Descriptions.Item
                  label={translated_phrase('Form.EntitiesFields.target_type')}
                >
                  {translated_phrase(
                    `Types.CallExtension.${callExtension.target_type}`
                  )}
                </Descriptions.Item>
                {callExtension.operator_profile && (
                  <Descriptions.Item
                    label={translated_phrase(
                      'Form.EntitiesFields.operator_profile_id'
                    )}
                  >
                    {callExtension.operator_profile.worker_profile?.user?.name ??
                      callExtension.operator_profile.vox_username}
                  </Descriptions.Item>
                )}
                {callExtension.vox_username && (
                  <Descriptions.Item
                    label={translated_phrase('Form.EntitiesFields.vox_username')}
                  >
                    {callExtension.vox_username}
                  </Descriptions.Item>
                )}
                {callExtension.phone_number && (
                  <Descriptions.Item
                    label={translated_phrase(
                      'Form.EntitiesFields.phone_number_id'
                    )}
                  >
                    {formatE164Display(callExtension.phone_number.e164)}
                  </Descriptions.Item>
                )}
              </Descriptions>
              <Tag
                className='transparent'
                icon={<i className={getIcon('CREATED_AT')}></i>}
              >
                {callExtension.created_at}
              </Tag>
            </>
          }
          actions={cardActions}
          extra={formCardExtra(
            'success transparent',
            translated_phrase('MenuItems.Telephony.call_extensions')
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
