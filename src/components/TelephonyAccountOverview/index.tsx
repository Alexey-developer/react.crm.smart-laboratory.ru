import React from 'react'

import { Badge, Button, Descriptions, List, Popover, Typography } from 'antd'

import { useTranslation } from 'react-i18next'

import { TelephonyAccountGroup } from '@api/models/telephonyAccount/queryGroup'
import { useAPIQuery } from '@api/useAPIQuery'

import { AlertCard } from '@components/AlertCard'
import { Skeleton } from '@components/Skeleton'

import { getIcon } from '@utils/getIcon'

import cardStyles from '@components/DefaultCard/index.module.scss'
import styles from './index.module.scss'

export const TelephonyAccountOverview: React.FC = () => {
  const [translated_phrase] = useTranslation('global')

  const { data, isLoading, error } = useAPIQuery(
    TelephonyAccountGroup,
    'overview',
    {},
    true
  )

  const overview = data?.data

  if (error || (!isLoading && !overview?.configured)) {
    return null
  }

  const account = overview?.account
  const lowBalance = Boolean(account?.low_balance)

  const panel = (
    <div className={`${cardStyles.default_card} default ${styles.panel}`}>
      <Skeleton
        isLoading={isLoading}
        width='100%'
        height='160px'
        skeleton={<></>}
        content={
          overview ? (
            <>
              {lowBalance && (
                <AlertCard
                  col={false}
                  type='warning'
                  icon={<i className={getIcon('ERROR')}></i>}
                  message={translated_phrase('Telephony.low_balance_warning', {
                    threshold:
                      account?.low_balance_threshold ??
                      account?.low_balance_threshold_rub,
                  })}
                />
              )}
              <Descriptions column={1} size='small' className={styles.descriptions}>
                <Descriptions.Item
                  label={translated_phrase('Telephony.balance')}
                >
                  {account?.balance ?? '—'} {account?.currency ?? ''}
                </Descriptions.Item>
                <Descriptions.Item
                  label={translated_phrase('Telephony.account_name')}
                >
                  {account?.account_name ?? '—'}
                </Descriptions.Item>
              </Descriptions>
              <Typography.Text strong>
                {translated_phrase('Telephony.phone_numbers')}
              </Typography.Text>
              <List
                size='small'
                dataSource={overview.phone_numbers}
                locale={{
                  emptyText: translated_phrase('Telephony.no_phone_numbers'),
                }}
                renderItem={(item: Record<string, unknown>) => (
                  <List.Item>
                    {(item.phone_number as string) ||
                      (item.phone as string) ||
                      JSON.stringify(item)}
                  </List.Item>
                )}
              />
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
      title={translated_phrase('Telephony.account_overview')}
      content={panel}
    >
      <Badge
        dot={lowBalance}
        status={!lowBalance && overview?.configured ? 'success' : undefined}
        offset={[-8, 18]}
      >
        <Button
          className={styles.header_btn}
          type='text'
          aria-label={translated_phrase('Telephony.account_overview')}
          icon={<i className='fa-solid fa-wallet'></i>}
        />
      </Badge>
    </Popover>
  )
}
