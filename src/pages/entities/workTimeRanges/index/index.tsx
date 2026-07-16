import React from 'react'

import { WorkTimeRangeGroup } from '@api/models/workTimeRange/queryGroup'
import type { TWorkTimeRange } from '@api/models/workTimeRange/type/TWorkTimeRange'

import { EntityIndex } from '@components/EntityIndex'
import { SelectFilter } from '@components/Filter/SelectFilter'

import { FormContent } from './FormContent'

const workTimeRangeProjectEntity = (workTimeRange: TWorkTimeRange) => {
  const project = workTimeRange.task?.project
  if (!project) {
    return undefined
  }

  return {
    id: project.id,
    label: project.name,
  }
}

const workTimeRangeDirectionEntity = (workTimeRange: TWorkTimeRange) => {
  const direction = workTimeRange.task?.direction
  if (!direction) {
    return undefined
  }

  return {
    id: direction.id,
    label: direction.name,
  }
}

export const WorkTimeRangesPage: React.FC = () => {
  return (
    <EntityIndex
      pageTitleCode='MenuItems.work_time_ranges'
      groupClass={WorkTimeRangeGroup}
      entityFilters={[
        SelectFilter('PROJECT'),
        SelectFilter('DIRECTION'),
        SelectFilter('TASK'),
        SelectFilter('WORKER_PROFILE'),
      ]}
      FormContent={FormContent}
      actionIndexes={[0, 5, 7, 1, 2]}
      formActions={{
        parentEntity: workTimeRangeProjectEntity,
        directionEntity: workTimeRangeDirectionEntity,
      }}
    />
  )
}
