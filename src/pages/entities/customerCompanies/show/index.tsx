import React from 'react'

import { Tag, Descriptions } from 'antd'

import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { CustomerCompanyGroup } from '@api/models/customerCompany/queryGroup'

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
import { CUSTOMER_COMPANIES } from '@utils/constants/routes'

export const CustomerCompanyPage: React.FC = () => {
  const { entityId } = useParams()
  const customerCompanyId = Number(entityId)
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(
    `${translated_phrase('MenuItems.WorkingWithCustomers.companies')}: #${entityId}`
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data, isLoading, isFetching, error } = useAPIQuery(
    CustomerCompanyGroup,
    getMethod('SHOW'),
    {
      id: entityId,
    }
  )

  const customerCompany = data?.data

  const { mutateAsync: mutateAsyncDelete } = useAPIMutation(
    CustomerCompanyGroup,
    getMethod('DESTROY'),
    {}
  )

  const cardActions = useFormActions(
    customerCompanyId,
    [1, 2],
    () =>
      mutateAsyncDelete(customerCompanyId).then(() =>
        navigate(`/${CUSTOMER_COMPANIES}`)
      ),
    { abilities: customerCompany?.can }
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
      {customerCompany ? (
        <DefaultCard
          grid={{ xs: 24, lg: 24, xl: 24, xxl: 24 }}
          key={customerCompany.id}
          type='default'
          title={customerCompany.name}
          content={
            <>
              <Descriptions column={1} size='small'>
                <Descriptions.Item
                  label={translated_phrase('Form.EntitiesFields.INN')}
                >
                  {customerCompany.INN}
                </Descriptions.Item>
                <Descriptions.Item
                  label={translated_phrase('Form.EntitiesFields.country')}
                >
                  {customerCompany.country}
                </Descriptions.Item>
                {customerCompany.city && (
                  <Descriptions.Item
                    label={translated_phrase('Form.EntitiesFields.city')}
                  >
                    {customerCompany.city}
                  </Descriptions.Item>
                )}
                <Descriptions.Item
                  label={translated_phrase(
                    'Form.EntitiesFields.organizational_legal_form_id'
                  )}
                >
                  {customerCompany.organizational_legal_form_id}
                </Descriptions.Item>
                <Descriptions.Item
                  label={translated_phrase('Form.EntitiesFields.currency_id')}
                >
                  {customerCompany.currency?.code ?? customerCompany.currency_id}
                </Descriptions.Item>
                {customerCompany.description && (
                  <Descriptions.Item
                    label={translated_phrase('Form.EntitiesFields.description')}
                  >
                    {customerCompany.description}
                  </Descriptions.Item>
                )}
              </Descriptions>
              <Tag
                className='transparent'
                icon={<i className={getIcon('CREATED_AT')}></i>}
              >
                {customerCompany.created_at}
              </Tag>
            </>
          }
          actions={cardActions}
          extra={formCardExtra(
            'success transparent',
            translated_phrase('MenuItems.WorkingWithCustomers.companies')
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
