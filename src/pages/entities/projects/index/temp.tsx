import { Progress, Tag, Tooltip } from 'antd'

import { useTranslation } from 'react-i18next'

import type { TProject } from '@api/models/project/type/TProject'

import { DefaultCard } from '@components/DefaultCard'
import { IncludedEmployees } from '@components/IncludedEmployees'

import { getIcon } from '@utils/getIcon'
import { convert2string } from '@utils/helpers'

//temp
import { getProject } from '@utils/tempData'
import { formCardExtra } from '@utils/formCardExtra'

const useFormContent = (project: TProject) => {
  const [translated_phrase] = useTranslation('global')
  return (
    <>
      <h2>{project.description}</h2>
      <Tooltip title={translated_phrase('Statistics.time_spent')}>
        <Tag
          className={'warning transparent'}
          icon={<i className={getIcon('TIME')}></i>}
        >
          {project.total_spent_time}
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

const useFormActions = (entityId: number) => {
  return [
    <Link to={pathname + '/' + entityId}>
      <ActionButton
        title={translated_phrase('Actions.go')}
        shape='circle'
        icon={getIcon('GO')}
      />
    </Link>,
    <Link to={`/${TASKS}/?project_id=${entityId}`}>
      <Badge count='+99' offset={[15, 5]}>
        <ActionButton
          className='transparent'
          title={translated_phrase('MenuItems.tasks')}
          shape='circle'
          icon={getIcon('TASKS')}
        />
      </Badge>
    </Link>,
    <Link to={pathname + '/' + entityId + '/' + COMMON_EDITING}>
      <ActionButton
        className='warning transparent'
        title={translated_phrase('Actions.edit')}
        shape='circle'
        icon={getIcon('EDIT')}
      />
    </Link>,
    <ActionButton
      className='danger transparent'
      title={translated_phrase('Actions.delete')}
      shape='circle'
      icon={getIcon('DELETE')}
      useConfirm={true}
    />,
  ]
}

export const useFormCard = (project: TProject) => {
  const [translated_phrase] = useTranslation('global')
  return (
    <DefaultCard
      isLoading={isLoading}
      key={project.id}
      type='default'
      title={`# ${project.id} ${project.name}`}
      badgeRibbonText={translated_phrase(project.status.lang_code)}
      badgeRibbonClassName={project.status.class}
      content={useFormContent(project)}
      actions={cardActions}
      extra={formCardExtra(
        project.type.class,
        translated_phrase(project.type.lang_code)
      )}
    />
  )
}
