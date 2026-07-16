import { Progress, Tag, Tooltip } from 'antd'

import { useTranslation } from 'react-i18next'

import type { TTask } from '@api/models/task/type/TTask'

import { IncludedEmployees } from '@components/IncludedEmployees'

import { getIcon } from '@utils/getIcon'
import { seconds2Time } from '@utils/helpers'
import {
  formatBillingMoney,
  formatCostsAutoVsBilling,
  formatIncomeToCostRatio,
  formatProjectionMoney,
} from '@utils/formatFinancialMoney'

//temp
import { getProject } from '@utils/tempData'

export const FormContent = (task: TTask) => {
  const [translated_phrase] = useTranslation('global')
  const billingCurrency = task.project?.currency ?? task.direction?.currency

  return (
    <>
      <h2>{task.description}</h2>
      <Tooltip title={translated_phrase('Statistics.time_spent')}>
        <Tag
          className={'warning transparent'}
          icon={<i className={getIcon('TIME')}></i>}
        >
          {seconds2Time(task.total_spent_time, translated_phrase)}
        </Tag>
      </Tooltip>
      <Tooltip title={translated_phrase('Statistics.incomes')}>
        <Tag
          className={'success transparent'}
          icon={<i className={getIcon('RUBLE')}></i>}
        >
          {formatBillingMoney(task.total_incomes, billingCurrency)}
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
            task.financial_projections,
            task.total_costs,
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
            task.financial_projections,
            'total_penalty_funds',
            billingCurrency?.symbol
          )}
        </Tag>
      </Tooltip>

      <Tag
        className={'success'}
        icon={<i className='fa-solid fa-chart-line-up'></i>}
      >
        {formatIncomeToCostRatio(task.total_incomes, task.financial_projections)}
      </Tag>
      <Tag
        className={'transparent'}
        icon={<i className={getIcon('CREATED_AT')}></i>}
      >
        {task.created_at}
      </Tag>
      <Progress percent={task.progress} />
      <IncludedEmployees employees={getProject().employees} />
    </>
  )
}
