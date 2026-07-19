import React from 'react'

import { Badge, Button, Descriptions, List, Popover, Typography } from 'antd'

import { useTranslation } from 'react-i18next'

import { TelephonyAccountGroup } from '@api/models/telephonyAccount/queryGroup'
import { useAPIQuery } from '@api/useAPIQuery'

import { AlertCard } from '@components/AlertCard'
import { Can } from '@components/Can'
import { Skeleton } from '@components/Skeleton'

import { getIcon } from '@utils/getIcon'

import cardStyles from '@components/DefaultCard/index.module.scss'
import styles from './index.module.scss'

type TAccountOverview = {
  configured?: boolean
  account?: {
    balance?: number | null
    currency?: string | null
    account_name?: string | null
    low_balance?: boolean
    low_balance_threshold?: number | null
    low_balance_threshold_rub?: number | null
  } | null
  phone_numbers?: Array<Record<string, unknown>>
}

const TelephonyAccountOverviewInner: React.FC = () => {
  const [translated_phrase] = useTranslation('global')

  const { data, isLoading, error } = useAPIQuery(
    TelephonyAccountGroup,
    'overview',
    {},
    true
  )

  const overview = data as TAccountOverview | undefined
  const configured = Boolean(overview?.configured)
  const account = overview?.account
  const lowBalance = Boolean(account?.low_balance)

  const panelBody = (() => {
    if (error) {
      return (
        <Typography.Text type='secondary'>
          {translated_phrase('Telephony.account_load_error')}
        </Typography.Text>
      )
    }

    if (!isLoading && !configured) {
      return (
        <Typography.Text type='secondary'>
          {translated_phrase('Telephony.account_not_configured')}
        </Typography.Text>
      )
    }

    return (
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
          <Descriptions.Item label={translated_phrase('Telephony.balance')}>
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
          dataSource={overview?.phone_numbers ?? []}
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
    )
  })()

  const panel = (
    <div className={`${cardStyles.default_card} default ${styles.panel}`}>
      <Skeleton
        isLoading={isLoading}
        width='100%'
        height='160px'
        skeleton={
          <Typography.Text type='secondary'>
            {translated_phrase('Telephony.account_loading')}
          </Typography.Text>
        }
        content={panelBody}
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
        status={!lowBalance && configured ? 'success' : undefined}
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

export const TelephonyAccountOverview: React.FC = () => (
  <Can permission='telephony.view_vox_account'>
    <TelephonyAccountOverviewInner />
  </Can>
)
