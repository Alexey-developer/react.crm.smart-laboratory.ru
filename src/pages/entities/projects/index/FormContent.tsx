import { Progress, Tag, Tooltip } from 'antd'

import { useTranslation } from 'react-i18next'

import type { TProject } from '@api/models/project/type/TProject'

import { getIcon } from '@utils/getIcon'
import { seconds2Time } from '@utils/helpers'
import {
  formatBillingMoney,
  formatCostsAutoVsBilling,
  formatIncomeToCostRatio,
  formatProjectionMoney,
} from '@utils/formatFinancialMoney'

export const FormContent = (project: TProject) => {
  const [translated_phrase] = useTranslation('global')
  return (
    <>
      <h2>{project.description}</h2>
      {project.monitoring_enabled && (
        <Tag className='success' icon={<i className='fa-solid fa-heart-pulse'></i>}>
          {translated_phrase('Form.EntitiesFields.monitoring_enabled')}
        </Tag>
      )}
      <Tooltip title={translated_phrase('Statistics.time_spent')}>
        <Tag
          className={'warning transparent'}
          icon={<i className={getIcon('TIME')}></i>}
        >
          {seconds2Time(project.total_spent_time, translated_phrase)}
        </Tag>
      </Tooltip>
      <Tooltip title={translated_phrase('Statistics.incomes')}>
        <Tag
          className={'success transparent'}
          icon={<i className={getIcon('RUBLE')}></i>}
        >
          {formatBillingMoney(project.total_incomes, project.currency)}
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
            project.financial_projections,
            project.total_costs,
            project.currency
          )}
        </Tag>
      </Tooltip>
      <Tooltip title={translated_phrase('Statistics.penalty')}>
        <Tag
          className={'warning transparent'}
          icon={<i className={getIcon('RUBLE')}></i>}
        >
          {formatProjectionMoney(
            project.financial_projections,
            'total_penalty_funds',
            project.currency?.symbol
          )}
        </Tag>
      </Tooltip>

      <Tag
        className={'success'}
        icon={<i className='fa-solid fa-chart-line-up'></i>}
      >
        {formatIncomeToCostRatio(
          project.total_incomes,
          project.financial_projections,
          project.currency?.id
        )}
      </Tag>
      <Tag
        className={'transparent'}
        icon={<i className={getIcon('CREATED_AT')}></i>}
      >
        {project.created_at}
      </Tag>
      <Progress percent={project.common_task_progress} />
    </>
  )
}
