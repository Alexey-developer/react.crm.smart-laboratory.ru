import { Progress, Tag, Tooltip } from 'antd'

import { useTranslation } from 'react-i18next'

import type { TDirection } from '@api/models/direction/type/TDirection'

import { IncludedEmployees } from '@components/IncludedEmployees'

import { getIcon } from '@utils/getIcon'
import { convert2string, seconds2Time } from '@utils/helpers'

import { getProject } from '@utils/tempData'

export const FormContent = (direction: TDirection) => {
  const [translated_phrase] = useTranslation('global')
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
          {convert2string(direction.total_incomes, '₽')}
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
          {convert2string(direction.total_costs_auto, '₽ - ')}
          {convert2string(direction.total_costs, '₽ = ')}
          {convert2string(
            direction.total_costs_auto - direction.total_costs,
            '₽'
          )}
        </Tag>
      </Tooltip>
      <Tooltip title={translated_phrase('Statistics.penalty')}>
        <Tag
          className={'warning transparent'}
          icon={<i className={getIcon('RUBLE')}></i>}
        >
          {convert2string(direction.total_penalty_funds, '₽')}
        </Tag>
      </Tooltip>

      <Tag
        className={'success'}
        icon={<i className='fa-solid fa-chart-line-up'></i>}
      >
        {direction.total_costs_auto &&
          (direction.total_incomes / direction.total_costs_auto).toFixed(2)}
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
