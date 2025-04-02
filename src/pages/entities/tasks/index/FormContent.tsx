import { Progress, Tag, Tooltip } from 'antd'

import { useTranslation } from 'react-i18next'

import type { TTask } from '@api/models/task/type/TTask'

import { IncludedEmployees } from '@components/IncludedEmployees'

import { getIcon } from '@utils/getIcon'
import { convert2string, seconds2Time } from '@utils/helpers'

//temp
import { getProject } from '@utils/tempData'

export const FormContent = (task: TTask) => {
  const [translated_phrase] = useTranslation('global')
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
          {convert2string(task.total_incomes, '₽')}
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
          {convert2string(task.total_costs_auto, '₽ - ')}
          {convert2string(task.total_costs, '₽ = ')}
          {convert2string(task.total_costs_auto - task.total_costs, '₽')}
        </Tag>
      </Tooltip>
      <Tooltip title={translated_phrase('Statistics.penalty')}>
        <Tag
          className={'warning transparent'}
          icon={<i className={getIcon('RUBLE')}></i>}
        >
          {convert2string(task.total_penalty_funds, '₽')}
        </Tag>
      </Tooltip>

      <Tag
        className={'success'}
        icon={<i className='fa-solid fa-chart-line-up'></i>}
      >
        {(task.total_incomes / task.total_costs_auto).toFixed(2)}
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
