import { Tag, Tooltip } from 'antd'

import { useTranslation } from 'react-i18next'

import type { TWorkTimeRange } from '@api/models/workTimeRange/type/TWorkTimeRange'

import { getIcon } from '@utils/getIcon'
import { convert2string, seconds2Time } from '@utils/helpers'

export const FormContent = (workTimeRange: TWorkTimeRange) => {
  const [translated_phrase] = useTranslation('global')
  const currencySymbol = workTimeRange.salary_currency?.symbol ?? ''

  return (
    <>
      <Tooltip title={translated_phrase('WorkTimeRanges.total_time')}>
        <Tag
          className='warning transparent'
          icon={<i className={getIcon('TIME')}></i>}
        >
          {seconds2Time(workTimeRange.total_time, translated_phrase)}
        </Tag>
      </Tooltip>
      <Tooltip title={translated_phrase('WorkTimeRanges.money')}>
        <Tag
          className='success transparent'
          icon={<i className={getIcon('RUBLE')}></i>}
        >
          {convert2string(workTimeRange.money, currencySymbol)}
        </Tag>
      </Tooltip>
      {workTimeRange.worker_profile?.user?.name && (
        <Tag className='transparent' icon={<i className='fa-solid fa-user'></i>}>
          {workTimeRange.worker_profile.user.name}
        </Tag>
      )}
      <Tag
        className='transparent'
        icon={<i className={getIcon('CREATED_AT')}></i>}
      >
        {workTimeRange.start_at} — {workTimeRange.end_at}
      </Tag>
    </>
  )
}
