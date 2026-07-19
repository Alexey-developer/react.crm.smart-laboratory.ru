import React from 'react'

import { Tag, Descriptions } from 'antd'

import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { CompanyDialNumberGroup } from '@api/models/companyDialNumber/queryGroup'

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
import { COMPANY_DIAL_NUMBERS } from '@utils/constants/routes'
import { formatE164Display } from '@utils/phoneE164'

export const CompanyDialNumberPage: React.FC = () => {
  const { entityId } = useParams()
  const companyDialNumberId = Number(entityId)
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(
    `${translated_phrase('MenuItems.Telephony.company_dial_numbers')}: #${entityId}`
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data, isLoading, isFetching, error } = useAPIQuery(
    CompanyDialNumberGroup,
    getMethod('SHOW'),
    {
      id: entityId,
    }
  )

  const companyDialNumber = data?.data

  const { mutateAsync: mutateAsyncDelete } = useAPIMutation(
    CompanyDialNumberGroup,
    getMethod('DESTROY'),
    {}
  )

  const cardActions = useFormActions(companyDialNumberId, [1, 2], () =>
    mutateAsyncDelete(companyDialNumberId).then(() =>
      navigate(`/${COMPANY_DIAL_NUMBERS}`)
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
      {companyDialNumber ? (
        <DefaultCard
          grid={{ xs: 24, lg: 24, xl: 24, xxl: 24 }}
          key={companyDialNumber.id}
          type='default'
          title={formatE164Display(companyDialNumber.e164)}
          badgeRibbonText={
            companyDialNumber.is_active
              ? translated_phrase('Form.EntitiesFields.is_active')
              : undefined
          }
          badgeRibbonClassName='success'
          content={
            <>
              <Descriptions column={1} size='small'>
                {companyDialNumber.label && (
                  <Descriptions.Item
                    label={translated_phrase('Form.EntitiesFields.label')}
                  >
                    {companyDialNumber.label}
                  </Descriptions.Item>
                )}
                <Descriptions.Item
                  label={translated_phrase('Form.EntitiesFields.inbound_mode')}
                >
                  {translated_phrase(
                    `Types.CompanyDialNumber.${companyDialNumber.inbound_mode}`
                  )}
                </Descriptions.Item>
              </Descriptions>
              <Tag
                className='transparent'
                icon={<i className={getIcon('CREATED_AT')}></i>}
              >
                {companyDialNumber.created_at}
              </Tag>
            </>
          }
          actions={cardActions}
          extra={formCardExtra(
            'success transparent',
            translated_phrase('MenuItems.Telephony.company_dial_numbers')
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
