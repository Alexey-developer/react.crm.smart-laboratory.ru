import { useTranslation } from 'react-i18next'

import { type TColorType } from '@api/common/types/TColorType'

import { DefaultCard, type Grid } from '@components/DefaultCard'

import { formCardExtra } from '@utils/formCardExtra'

type TProps = {
  isLoading: boolean
  entity: any
  FormContent: (entity: any) => React.ReactNode
  cardActions: React.ReactNode[]
  grid?: Grid
}

export const FormCard = (props: TProps) => {
  const { isLoading, entity, FormContent, cardActions, grid } = props
  const [translated_phrase] = useTranslation('global')

  //   type TState = {
  //     badgeRibbonText: string
  //     badgeRibbonClassName: TColorType
  //   }
  //   const state = useReactive<TState>({
  //     badgeRibbonText: '',
  //     badgeRibbonClassName: 'transparent',
  //   })

  //   useEffect(() => {
  //     if (entity.type) {
  //       state.badgeRibbonText = translated_phrase(entity.type.lang_code)
  //       state.badgeRibbonClassName = entity.type.class
  //     } else if (entity.project) {
  //       state.badgeRibbonText = entity.project.name
  //     }
  //   }, [entity])

  let badgeRibbonText = ''
  let badgeRibbonClassName = 'transparent' as TColorType

  if (entity.type) {
    badgeRibbonText = translated_phrase(entity.type.lang_code)
    badgeRibbonClassName = entity.type.class
  } else if (entity.project) {
    badgeRibbonText = `#${entity.project.id} ${entity.project.name}`
  }

  return (
    <DefaultCard
      isLoading={isLoading}
      key={entity.id}
      type='default'
      title={`# ${entity.id} ${entity.name}`}
      badgeRibbonText={badgeRibbonText}
      badgeRibbonClassName={badgeRibbonClassName}
      content={FormContent(entity)}
      actions={cardActions}
      extra={formCardExtra(
        entity.status.class,
        translated_phrase(entity.status.lang_code)
      )}
      grid={grid}
    />
  )
}
