import { useTranslation } from 'react-i18next'

import { type TColorType } from '@api/common/types/TColorType'

import { DefaultCard, type Grid } from '@components/DefaultCard'

import { formCardExtra } from '@utils/formCardExtra'
import {
  getTaskRecurrenceRibbon,
  isTaskEntity,
} from '@utils/entityFormActions/getTaskRecurrenceRibbon'
import { convert2string } from '@utils/helpers'

type TProps = {
  isLoading: boolean
  entity: any
  FormContent: (entity: any) => React.ReactNode
  cardActions: React.ReactNode[]
  grid?: Grid
}

const isWorkTimeRangeEntity = (entity: any): boolean =>
  entity?.task_item_id != null || entity?.task_item != null

export const FormCard = (props: TProps) => {
  const { isLoading, entity, FormContent, cardActions, grid } = props
  const [translated_phrase] = useTranslation('global')

  let badgeRibbonText = ''
  let badgeRibbonClassName = 'transparent' as TColorType

  if (entity.direction_type) {
    badgeRibbonText = translated_phrase(entity.direction_type.lang_code)
    badgeRibbonClassName = entity.direction_type.class
  } else if (entity.monitoring_enabled) {
    badgeRibbonText = translated_phrase('Form.EntitiesFields.monitoring_enabled')
    badgeRibbonClassName = 'success'
  } else if (isTaskEntity(entity)) {
    const ribbon = getTaskRecurrenceRibbon(entity, translated_phrase)
    badgeRibbonText = ribbon.text
    badgeRibbonClassName = ribbon.className
  } else if (isWorkTimeRangeEntity(entity)) {
    const itemName = entity.task_item?.name ?? ''
    badgeRibbonText = `#${entity.id}${itemName ? ` ${itemName}` : ''}`
  } else if (entity.project) {
    badgeRibbonText = `#${entity.project.id} ${entity.project.name}`
  }

  const statusExtra =
    entity.status &&
    formCardExtra(
      entity.status.class,
      translated_phrase(entity.status.lang_code)
    )

  const rateExtra =
    isWorkTimeRangeEntity(entity) &&
    entity.rate != null &&
    formCardExtra(
      'warning',
      convert2string(
        entity.rate,
        `${entity.salary_currency?.symbol ?? ''}/${translated_phrase('Time.short_hours')}`
      )
    )

  return (
    <DefaultCard
      isLoading={isLoading}
      key={entity.id}
      type='default'
      title={`# ${entity.id} ${entity.name ?? entity.task?.name ?? ''}`}
      badgeRibbonText={badgeRibbonText}
      badgeRibbonClassName={badgeRibbonClassName}
      content={FormContent(entity)}
      actions={cardActions}
      extra={statusExtra || rateExtra || undefined}
      grid={grid}
    />
  )
}
