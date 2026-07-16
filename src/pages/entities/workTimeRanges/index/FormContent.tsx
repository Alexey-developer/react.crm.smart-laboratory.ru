import { Tag, Tooltip } from 'antd'

import { useTranslation } from 'react-i18next'

import type { TWorkTimeRange } from '@api/models/workTimeRange/type/TWorkTimeRange'

import { IncludedEmployees } from '@components/IncludedEmployees'

import { getIcon } from '@utils/getIcon'
import { convert2string, seconds2Time } from '@utils/helpers'

const workerAsEmployee = (workTimeRange: TWorkTimeRange) => {
  const profile = workTimeRange.worker_profile
  const fullName = profile?.user?.name?.trim()
  if (!profile || !fullName) {
    return undefined
  }

  const parts = fullName.split(/\s+/).filter(Boolean)

  return {
    id: profile.id,
    surname: parts[0] ?? '',
    name: parts[1] ?? parts[0] ?? '',
  }
}

export const FormContent = (workTimeRange: TWorkTimeRange) => {
  const [translated_phrase] = useTranslation('global')
  const currencySymbol = workTimeRange.salary_currency?.symbol ?? ''
  const employee = workerAsEmployee(workTimeRange)

  return (
    <>
      <Tooltip title={translated_phrase('Form.EntitiesFields.total_time')}>
        <Tag
          className='warning transparent'
          icon={<i className={getIcon('TIME')}></i>}
        >
          {seconds2Time(workTimeRange.total_time, translated_phrase)}
        </Tag>
      </Tooltip>
      {workTimeRange.money != null && (
        <Tooltip title={translated_phrase('Form.EntitiesFields.money')}>
          <Tag
            className='success transparent'
            icon={<i className={getIcon('RUBLE')}></i>}
          >
            {convert2string(workTimeRange.money, currencySymbol)}
          </Tag>
        </Tooltip>
      )}
      <Tag
        className='transparent'
        icon={<i className={getIcon('CREATED_AT')}></i>}
      >
        {workTimeRange.start_at} — {workTimeRange.end_at}
      </Tag>
      {employee && <IncludedEmployees employees={[employee]} />}
    </>
  )
}
