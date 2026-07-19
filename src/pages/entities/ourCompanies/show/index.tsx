import React from 'react'

import { Tag, Descriptions } from 'antd'

import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { OurCompanyGroup } from '@api/models/ourCompany/queryGroup'

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
import { OUR_COMPANIES } from '@utils/constants/routes'

export const OurCompanyPage: React.FC = () => {
  const { entityId } = useParams()
  const ourCompanyId = Number(entityId)
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(
    `${translated_phrase('MenuItems.Studio.our_companies')}: #${entityId}`
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data, isLoading, isFetching, error } = useAPIQuery(
    OurCompanyGroup,
    getMethod('SHOW'),
    {
      id: entityId,
    }
  )

  const ourCompany = data?.data

  const { mutateAsync: mutateAsyncDelete } = useAPIMutation(
    OurCompanyGroup,
    getMethod('DESTROY'),
    {}
  )

  const cardActions = useFormActions(
    ourCompanyId,
    [1, 2],
    () =>
      mutateAsyncDelete(ourCompanyId).then(() => navigate(`/${OUR_COMPANIES}`)),
    { abilities: ourCompany?.can }
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
      {ourCompany ? (
        <DefaultCard
          grid={{ xs: 24, lg: 24, xl: 24, xxl: 24 }}
          key={ourCompany.id}
          type='default'
          title={ourCompany.name}
          content={
            <>
              <Descriptions column={1} size='small'>
                {ourCompany.commercial_name && (
                  <Descriptions.Item
                    label={translated_phrase(
                      'Form.EntitiesFields.commercial_name'
                    )}
                  >
                    {ourCompany.commercial_name}
                  </Descriptions.Item>
                )}
                <Descriptions.Item
                  label={translated_phrase('Form.EntitiesFields.status')}
                >
                  {translated_phrase(`OurCompanyStatuses.${ourCompany.status}`)}
                </Descriptions.Item>
                <Descriptions.Item
                  label={translated_phrase('Form.EntitiesFields.INN')}
                >
                  {ourCompany.INN}
                </Descriptions.Item>
                {ourCompany.OGRN && (
                  <Descriptions.Item
                    label={translated_phrase('Form.EntitiesFields.OGRN')}
                  >
                    {ourCompany.OGRN}
                  </Descriptions.Item>
                )}
                <Descriptions.Item
                  label={translated_phrase('Form.EntitiesFields.country')}
                >
                  {ourCompany.country}
                </Descriptions.Item>
                {ourCompany.city && (
                  <Descriptions.Item
                    label={translated_phrase('Form.EntitiesFields.city')}
                  >
                    {ourCompany.city}
                  </Descriptions.Item>
                )}
                <Descriptions.Item
                  label={translated_phrase('Form.EntitiesFields.currency_id')}
                >
                  {ourCompany.currency?.code ?? ourCompany.currency_id}
                </Descriptions.Item>
                {ourCompany.documents_email && (
                  <Descriptions.Item
                    label={translated_phrase(
                      'Form.EntitiesFields.documents_email'
                    )}
                  >
                    {ourCompany.documents_email}
                  </Descriptions.Item>
                )}
                {ourCompany.description && (
                  <Descriptions.Item
                    label={translated_phrase('Form.EntitiesFields.description')}
                  >
                    {ourCompany.description}
                  </Descriptions.Item>
                )}
              </Descriptions>
              <Tag
                className='transparent'
                icon={<i className={getIcon('CREATED_AT')}></i>}
              >
                {ourCompany.created_at}
              </Tag>
            </>
          }
          actions={cardActions}
          extra={formCardExtra(
            'success transparent',
            translated_phrase('MenuItems.Studio.our_companies')
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
