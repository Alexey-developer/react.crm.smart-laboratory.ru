import React from 'react'

import { Badge, Button, List, Popover, Typography } from 'antd'

import { useTranslation } from 'react-i18next'

import {
  TelephonyQueuesGroup,
  type TTelephonyQueueCall,
} from '@api/models/telephonyQueues/queryGroup'
import { useAPIMutation } from '@api/useAPIMutation'
import { useAPIQuery } from '@api/useAPIQuery'

import { Skeleton } from '@components/Skeleton'

import { getIcon } from '@utils/getIcon'
import { formatE164Display } from '@utils/phoneE164'
import { useTelephonyQueueSocket } from '@utils/sockets/useTelephonyQueueSocket'

import cardStyles from '@components/DefaultCard/index.module.scss'
import styles from './index.module.scss'

const callLabel = (call: TTelephonyQueueCall): string => {
  const phone = call.customer_phone
    ? formatE164Display(call.customer_phone)
    : null
  const name = call.customer_name?.trim() || null

  if (name && phone) {
    return `${name} · ${phone}`
  }

  return name || phone || `Call #${call.id}`
}

const TelephonyQueueOverviewComponent: React.FC = () => {
  const [translated_phrase] = useTranslation('global')

  useTelephonyQueueSocket(true)

  const { data, isLoading, error, refetch, isRefetching } = useAPIQuery(
    TelephonyQueuesGroup,
    'queues',
    {},
    true
  )

  const { mutateAsync: claimCall, isPending: isClaiming } = useAPIMutation(
    TelephonyQueuesGroup,
    'claim',
    {}
  )

  const queues = data

  if (error || (!isLoading && !queues)) {
    return null
  }

  const waitingCount =
    (queues?.general_queue.length ?? 0) + (queues?.operator_queue.length ?? 0)

  const onClaim = async (callId: number) => {
    await claimCall({ call_id: callId })
    await refetch()
  }

  const renderQueue = (
    titleKey: string,
    items: TTelephonyQueueCall[],
    withClaim: boolean
  ) => (
    <>
      <Typography.Text strong className={styles.section_title}>
        {translated_phrase(titleKey)}
      </Typography.Text>
      <List
        size='small'
        dataSource={items}
        locale={{
          emptyText: translated_phrase('Telephony.queue_empty'),
        }}
        renderItem={(call: TTelephonyQueueCall) => (
          <List.Item
            actions={
              withClaim
                ? [
                    <Button
                      key='claim'
                      type='link'
                      size='small'
                      loading={isClaiming}
                      onClick={() => void onClaim(call.id)}
                    >
                      {translated_phrase('Telephony.queue_claim')}
                    </Button>,
                  ]
                : undefined
            }
          >
            <span className={styles.call_line}>
              {call.queue_position != null ? `#${call.queue_position} · ` : ''}
              {callLabel(call)}
            </span>
          </List.Item>
        )}
      />
    </>
  )

  const panel = (
    <div className={`${cardStyles.default_card} default ${styles.panel}`}>
      <Skeleton
        isLoading={isLoading || isRefetching}
        width='100%'
        height='200px'
        skeleton={<></>}
        content={
          queues ? (
            <>
              {renderQueue(
                'Telephony.queue_general',
                queues.general_queue,
                true
              )}
              {renderQueue(
                'Telephony.queue_operator',
                queues.operator_queue,
                true
              )}
              {renderQueue(
                'Telephony.queue_active',
                queues.active_calls,
                false
              )}
            </>
          ) : (
            <></>
          )
        }
      />
    </div>
  )

  return (
    <Popover
      trigger='click'
      placement='bottomRight'
      title={translated_phrase('Telephony.queue_title')}
      content={panel}
    >
      <Badge
        count={waitingCount}
        overflowCount={99}
        offset={[-8, 18]}
        size='small'
      >
        <Button
          className={styles.header_btn}
          type='text'
          aria-label={translated_phrase('Telephony.queue_title')}
          icon={<i className={getIcon('QUEUE')}></i>}
        />
      </Badge>
    </Popover>
  )
}

/** Memo: isolate from TopHeader sibling/parent re-renders. */
export const TelephonyQueueOverview = React.memo(
  TelephonyQueueOverviewComponent
)
