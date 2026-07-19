import React from 'react'

import { Tag, Descriptions } from 'antd'

import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { CustomerProfileGroup } from '@api/models/customerProfile/queryGroup'

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
import { CUSTOMER_PROFILES } from '@utils/constants/routes'

export const CustomerProfilePage: React.FC = () => {
  const { entityId } = useParams()
  const customerProfileId = Number(entityId)
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(
    `${translated_phrase(
      'MenuItems.WorkingWithCustomers.customer_profiles'
    )}: #${entityId}`
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data, isLoading, isFetching, error } = useAPIQuery(
    CustomerProfileGroup,
    getMethod('SHOW'),
    {
      id: entityId,
    }
  )

  const customerProfile = data?.data

  const { mutateAsync: mutateAsyncDelete } = useAPIMutation(
    CustomerProfileGroup,
    getMethod('DESTROY'),
    {}
  )

  const cardActions = useFormActions(
    customerProfileId,
    [1, 2],
    () =>
      mutateAsyncDelete(customerProfileId).then(() =>
        navigate(`/${CUSTOMER_PROFILES}`)
      ),
    { abilities: customerProfile?.can }
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
      {customerProfile ? (
        <DefaultCard
          grid={{ xs: 24, lg: 24, xl: 24, xxl: 24 }}
          key={customerProfile.id}
          type='default'
          title={customerProfile.user?.name ?? `#${customerProfile.user_id}`}
          content={
            <>
              <Descriptions column={1} size='small'>
                <Descriptions.Item
                  label={translated_phrase('Form.EntitiesFields.user_id')}
                >
                  {customerProfile.user_id}
                </Descriptions.Item>
                <Descriptions.Item
                  label={translated_phrase('Form.EntitiesFields.utc_offset')}
                >
                  {customerProfile.utc_offset}
                </Descriptions.Item>
                <Descriptions.Item
                  label={translated_phrase(
                    'Form.EntitiesFields.customer_company_ids'
                  )}
                >
                  {customerProfile.customer_companies
                    ?.map((c: { name: string }) => c.name)
                    .join(', ') || '—'}
                </Descriptions.Item>
                <Descriptions.Item
                  label={translated_phrase('Form.EntitiesFields.project_ids')}
                >
                  {customerProfile.projects
                    ?.map((p: { name: string }) => p.name)
                    .join(', ') || '—'}
                </Descriptions.Item>
              </Descriptions>
              <Tag
                className='transparent'
                icon={<i className={getIcon('CREATED_AT')}></i>}
              >
                {customerProfile.created_at}
              </Tag>
            </>
          }
          actions={cardActions}
          extra={formCardExtra(
            'success transparent',
            translated_phrase(
              'MenuItems.WorkingWithCustomers.customer_profiles'
            )
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
