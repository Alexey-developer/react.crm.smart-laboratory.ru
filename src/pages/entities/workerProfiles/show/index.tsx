import React from 'react'

import { Tag, Descriptions } from 'antd'

import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { WorkerProfileGroup } from '@api/models/workerProfile/queryGroup'

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
import { WORKER_PROFILES } from '@utils/constants/routes'

export const WorkerProfilePage: React.FC = () => {
  const { entityId } = useParams()
  const workerProfileId = Number(entityId)
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(
    `${translated_phrase('MenuItems.Employees.profiles')}: #${entityId}`
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data, isLoading, isFetching, error } = useAPIQuery(
    WorkerProfileGroup,
    getMethod('SHOW'),
    {
      id: entityId,
    }
  )

  const workerProfile = data?.data

  const { mutateAsync: mutateAsyncDelete } = useAPIMutation(
    WorkerProfileGroup,
    getMethod('DESTROY'),
    {}
  )

  const cardActions = useFormActions(
    workerProfileId,
    [1, 2],
    () =>
      mutateAsyncDelete(workerProfileId).then(() =>
        navigate(`/${WORKER_PROFILES}`)
      ),
    { abilities: workerProfile?.can }
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
      {workerProfile ? (
        <DefaultCard
          grid={{ xs: 24, lg: 24, xl: 24, xxl: 24 }}
          key={workerProfile.id}
          type='default'
          title={workerProfile.user?.name ?? `#${workerProfile.user_id}`}
          content={
            <>
              <Descriptions column={1} size='small'>
                <Descriptions.Item
                  label={translated_phrase('Form.EntitiesFields.user_id')}
                >
                  {workerProfile.user_id}
                </Descriptions.Item>
                <Descriptions.Item
                  label={translated_phrase('Form.EntitiesFields.base_rate')}
                >
                  {workerProfile.base_rate ?? '—'}
                </Descriptions.Item>
                <Descriptions.Item
                  label={translated_phrase(
                    'Form.EntitiesFields.salary_currency_id'
                  )}
                >
                  {workerProfile.salary_currency?.code ??
                    workerProfile.salary_currency_id}
                </Descriptions.Item>
                <Descriptions.Item
                  label={translated_phrase('Form.EntitiesFields.utc_offset')}
                >
                  {workerProfile.utc_offset}
                </Descriptions.Item>
              </Descriptions>
              <Tag
                className='transparent'
                icon={<i className={getIcon('CREATED_AT')}></i>}
              >
                {workerProfile.created_at}
              </Tag>
            </>
          }
          actions={cardActions}
          extra={formCardExtra(
            'success transparent',
            translated_phrase('MenuItems.Employees.profiles')
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
