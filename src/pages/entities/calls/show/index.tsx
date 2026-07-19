import React from 'react'

import { Row, Col, Tag, Descriptions, Typography } from 'antd'

import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setPageIsLoaded } from '@redux/PageLoading/slice'

import { CallGroup } from '@api/models/call/queryGroup'

import { useAPIQuery } from '@api/useAPIQuery'
import { useAPIMutation } from '@api/useAPIMutation'

import { Skeleton } from '@components/Skeleton'
import { useFormActions } from '@components/EntityIndex/FormActions'
import { AlertCard } from '@components/AlertCard'
import { DefaultCard } from '@components/DefaultCard'
import { CollapseCard } from '@components/CollapseCard'

import { getMethod } from '@utils/getMethod'
import { SetPageTitle } from '@utils/helpers'
import { formCardExtra } from '@utils/formCardExtra'
import { getIcon } from '@utils/getIcon'
import { CALLS } from '@utils/constants/routes'
import { isManualCall } from '@utils/entityFormActions/isManualCall'
import { formatE164Display } from '@utils/phoneE164'

export const CallPage: React.FC = () => {
  const { entityId } = useParams()
  const callId = Number(entityId)
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(`${translated_phrase('MenuItems.Telephony.calls')}: #${entityId}`)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data, isLoading, isFetching, error } = useAPIQuery(
    CallGroup,
    getMethod('SHOW'),
    {
      id: entityId,
    }
  )

  const call = data?.data

  const { mutateAsync: mutateAsyncDelete } = useAPIMutation(
    CallGroup,
    getMethod('DESTROY'),
    {}
  )

  const cardActions = useFormActions(
    callId,
    isManualCall(call ?? {}) ? [1, 2] : [2],
    () => mutateAsyncDelete(callId).then(() => navigate(`/${CALLS}`)),
    { abilities: call?.can }
  )

  React.useEffect(() => {
    dispatch(setPageIsLoaded(!isLoading && !isFetching))
  }, [isLoading, isFetching])

  const csatItems = [
    { key: 'csat_quality', label: translated_phrase('Calls.csat_quality') },
    { key: 'csat_recommend', label: translated_phrase('Calls.csat_recommend') },
    { key: 'csat_resolved', label: translated_phrase('Calls.csat_resolved') },
    { key: 'csat_speed', label: translated_phrase('Calls.csat_speed') },
  ]

  return (
    <>
      <Skeleton
        isLoading={isLoading}
        width='100%'
        height='100'
        skeleton={<></>}
        content={
          call && (
            <Row>
              <AlertCard
                message={translated_phrase(`Types.Call.${call.direction}`)}
                description={translated_phrase('Form.EntitiesFields.direction')}
                icon={<i className={getIcon('PHONE')}></i>}
                type='transparent'
              />
              <AlertCard
                message={translated_phrase(call.source)}
                description={translated_phrase('Form.EntitiesFields.source')}
                icon={<i className={getIcon('INFO')}></i>}
                type='success transparent'
              />
            </Row>
          )
        }
      />
      {call ? (
        <DefaultCard
          grid={{ xs: 24, lg: 24, xl: 24, xxl: 24 }}
          key={call.id}
          type='default'
          title={`# ${call.id}`}
          badgeRibbonText={translated_phrase(`Types.Call.${call.direction}`)}
          badgeRibbonClassName='success'
          content={
            <>
              <Descriptions column={1} size='small'>
                <Descriptions.Item
                  label={translated_phrase(
                    'Form.EntitiesFields.customer_phone_number_id'
                  )}
                >
                  {call.customer_phone_number?.e164
                    ? formatE164Display(call.customer_phone_number.e164)
                    : call.customer_phone_number_id}
                </Descriptions.Item>
                {call.operator_profile && (
                  <Descriptions.Item
                    label={translated_phrase(
                      'Form.EntitiesFields.operator_profile_id'
                    )}
                  >
                    {call.operator_profile.worker_profile?.user?.name ??
                      call.operator_profile.vox_username}
                  </Descriptions.Item>
                )}
                {call.started_at && (
                  <Descriptions.Item
                    label={translated_phrase('Form.EntitiesFields.started_at')}
                  >
                    {call.started_at}
                  </Descriptions.Item>
                )}
                {call.ended_at && (
                  <Descriptions.Item
                    label={translated_phrase('Form.EntitiesFields.ended_at')}
                  >
                    {call.ended_at}
                  </Descriptions.Item>
                )}
              </Descriptions>
              {call.is_answered === true && (
                <Tag className='success'>{translated_phrase('Calls.answered')}</Tag>
              )}
              {call.is_missed === true && (
                <Tag className='danger'>{translated_phrase('Calls.missed')}</Tag>
              )}
              {call.comment && <p>{call.comment}</p>}
            </>
          }
          actions={cardActions}
          extra={formCardExtra(
            'success transparent',
            translated_phrase(call.source)
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
      <Skeleton
        isLoading={isLoading}
        width='100%'
        height='100%'
        skeleton={<></>}
        content={
          call && (
            <Row>
              <Col span={24} className='default-col'>
                <CollapseCard
                  type='success transparent'
                  items={[
                    {
                      key: 'csat',
                      label: translated_phrase('Calls.csat_scores'),
                      children: (
                        <Descriptions column={2} size='small'>
                          {csatItems.map(item => (
                            <Descriptions.Item
                              key={item.key}
                              label={item.label}
                            >
                              {call[item.key as keyof typeof call] ?? '—'}
                            </Descriptions.Item>
                          ))}
                        </Descriptions>
                      ),
                    },
                  ]}
                />
              </Col>
              {call.call_record_transcription_text && (
                <Col span={24} className='default-col'>
                  <CollapseCard
                    items={[
                      {
                        key: 'transcription',
                        label: translated_phrase(
                          'Form.EntitiesFields.call_record_transcription_text'
                        ),
                        children: (
                          <Typography.Paragraph>
                            {call.call_record_transcription_text}
                          </Typography.Paragraph>
                        ),
                      },
                    ]}
                  />
                </Col>
              )}
              <Col span={24} className='default-col'>
                <CollapseCard
                  type='transparent'
                  items={[
                    {
                      key: 'links',
                      label: translated_phrase('Calls.links'),
                      children: (
                        <>
                          {call.call_record_url && (
                            <p>
                              <Link to={call.call_record_url} target='_blank'>
                                {translated_phrase('Calls.call_record')}
                              </Link>
                            </p>
                          )}
                          {call.log_file_url && (
                            <p>
                              <Link to={call.log_file_url} target='_blank'>
                                {translated_phrase('Calls.log_file')}
                              </Link>
                            </p>
                          )}
                          {!call.call_record_url && !call.log_file_url && (
                            <p>{translated_phrase('Calls.no_links')}</p>
                          )}
                        </>
                      ),
                    },
                  ]}
                />
              </Col>
            </Row>
          )
        }
      />
    </>
  )
}
