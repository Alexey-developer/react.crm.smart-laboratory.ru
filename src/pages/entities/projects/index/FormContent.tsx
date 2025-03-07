import { Progress, Tag, Tooltip } from 'antd'

import { useTranslation } from 'react-i18next'

import type { TProject } from '@api/models/project/type/TProject'

import { IncludedEmployees } from '@components/IncludedEmployees'

import { getIcon } from '@utils/getIcon'
import { convert2string, seconds2Time } from '@utils/helpers'

//temp
import { getProject } from '@utils/tempData'

export const FormContent = (project: TProject) => {
  const [translated_phrase] = useTranslation('global')
  return (
    <>
      <h2>{project.description}</h2>
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
          {convert2string(project.total_incomes, '₽')}
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
          {convert2string(project.total_costs_auto, '₽ - ')}
          {convert2string(project.total_costs, '₽ = ')}
          {convert2string(project.total_costs_auto - project.total_costs, '₽')}
        </Tag>
      </Tooltip>
      <Tooltip title={translated_phrase('Statistics.penalty')}>
        <Tag
          className={'warning transparent'}
          icon={<i className={getIcon('RUBLE')}></i>}
        >
          {convert2string(project.total_penalty_funds, '₽')}
        </Tag>
      </Tooltip>

      <Tag
        className={'success'}
        icon={<i className='fa-solid fa-chart-line-up'></i>}
      >
        {(project.total_incomes / project.total_costs_auto).toFixed(2)}
      </Tag>
      <Tag
        className={'transparent'}
        icon={<i className={getIcon('CREATED_AT')}></i>}
      >
        {project.created_at}
      </Tag>
      <Progress percent={project.common_task_progress} />
      <IncludedEmployees employees={getProject().employees} />
    </>
  )
}
