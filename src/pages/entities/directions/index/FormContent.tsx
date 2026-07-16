import { Progress, Tag, Tooltip } from 'antd'

import { useTranslation } from 'react-i18next'

import type { TDirection } from '@api/models/direction/type/TDirection'

import { IncludedEmployees } from '@components/IncludedEmployees'

import { getIcon } from '@utils/getIcon'
import { seconds2Time } from '@utils/helpers'
import {
  formatBillingMoney,
  formatCostsAutoVsBilling,
  formatIncomeToCostRatio,
  formatProjectionMoney,
} from '@utils/formatFinancialMoney'

import { getProject } from '@utils/tempData'

export const FormContent = (direction: TDirection) => {
  const [translated_phrase] = useTranslation('global')
  const billingCurrency = direction.currency ?? direction.project?.currency

  return (
    <>
      <h2>{direction.description}</h2>
      <Tooltip title={translated_phrase('Statistics.time_spent')}>
        <Tag
          className={'warning transparent'}
          icon={<i className={getIcon('TIME')}></i>}
        >
          {seconds2Time(direction.total_spent_time, translated_phrase)}
        </Tag>
      </Tooltip>
      <Tooltip title={translated_phrase('Statistics.incomes')}>
        <Tag
          className={'success transparent'}
          icon={<i className={getIcon('RUBLE')}></i>}
        >
          {formatBillingMoney(direction.total_incomes, billingCurrency)}
        </Tag>
      </Tooltip>
      <Tooltip
        title={
          translated_phrase('Statistics.costs_auto') +
          ' - ' +
          translated_phrase('Statistics.costs')
        }
      >
        <Tag
          className={'danger transparent'}
          icon={<i className={getIcon('RUBLE')}></i>}
        >
          {formatCostsAutoVsBilling(
            direction.financial_projections,
            direction.total_costs,
            billingCurrency
          )}
        </Tag>
      </Tooltip>
      <Tooltip title={translated_phrase('Statistics.penalty')}>
        <Tag
          className={'warning transparent'}
          icon={<i className={getIcon('RUBLE')}></i>}
        >
          {formatProjectionMoney(
            direction.financial_projections,
            'total_penalty_funds',
            billingCurrency?.symbol
          )}
        </Tag>
      </Tooltip>

      <Tag
        className={'success'}
        icon={<i className='fa-solid fa-chart-line-up'></i>}
      >
        {formatIncomeToCostRatio(
          direction.total_incomes,
          direction.financial_projections
        )}
      </Tag>
      <Tag
        className={'transparent'}
        icon={<i className={getIcon('CREATED_AT')}></i>}
      >
        {direction.created_at}
      </Tag>
      <Progress percent={direction.common_task_progress} />
      <IncludedEmployees employees={getProject().employees} />
    </>
  )
}
