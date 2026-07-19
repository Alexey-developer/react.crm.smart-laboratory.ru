import React from 'react'

import { Tag, Descriptions } from 'antd'

import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { OperatorProfileGroup } from '@api/models/operatorProfile/queryGroup'

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
import { OPERATOR_PROFILES } from '@utils/constants/routes'

export const OperatorProfilePage: React.FC = () => {
  const { entityId } = useParams()
  const operatorProfileId = Number(entityId)
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(
    `${translated_phrase('MenuItems.Telephony.operator_profiles')}: #${entityId}`
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data, isLoading, isFetching, error } = useAPIQuery(
    OperatorProfileGroup,
    getMethod('SHOW'),
    {
      id: entityId,
    }
  )

  const operatorProfile = data?.data

  const { mutateAsync: mutateAsyncDelete } = useAPIMutation(
    OperatorProfileGroup,
    getMethod('DESTROY'),
    {}
  )

  const cardActions = useFormActions(
    operatorProfileId,
    [1, 2],
    () =>
      mutateAsyncDelete(operatorProfileId).then(() =>
        navigate(`/${OPERATOR_PROFILES}`)
      ),
    { abilities: operatorProfile?.can }
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
      {operatorProfile ? (
        <DefaultCard
          grid={{ xs: 24, lg: 24, xl: 24, xxl: 24 }}
          key={operatorProfile.id}
          type='default'
          title={operatorProfile.vox_username}
          badgeRibbonText={
            operatorProfile.is_active
              ? translated_phrase('Form.EntitiesFields.is_active')
              : undefined
          }
          badgeRibbonClassName='success'
          content={
            <>
              <Descriptions column={1} size='small'>
                <Descriptions.Item
                  label={translated_phrase(
                    'Form.EntitiesFields.worker_profile_id'
                  )}
                >
                  {operatorProfile.worker_profile?.user?.name ??
                    operatorProfile.worker_profile_id}
                </Descriptions.Item>
                <Descriptions.Item
                  label={translated_phrase(
                    'Form.EntitiesFields.softphone_enabled'
                  )}
                >
                  {String(operatorProfile.softphone_enabled)}
                </Descriptions.Item>
                <Descriptions.Item
                  label={translated_phrase(
                    'Form.EntitiesFields.mobile_dialer_enabled'
                  )}
                >
                  {String(operatorProfile.mobile_dialer_enabled)}
                </Descriptions.Item>
              </Descriptions>
              <Tag
                className='transparent'
                icon={<i className={getIcon('CREATED_AT')}></i>}
              >
                {operatorProfile.created_at}
              </Tag>
            </>
          }
          actions={cardActions}
          extra={formCardExtra(
            'success transparent',
            translated_phrase('MenuItems.Telephony.operator_profiles')
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
