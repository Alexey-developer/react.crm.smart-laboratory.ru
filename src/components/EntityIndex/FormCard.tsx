import { useTranslation } from 'react-i18next'

import { DefaultCard } from '@components/DefaultCard'

import { formCardExtra } from '@utils/formCardExtra'

type TProps = {
  isLoading: boolean
  entity: any
  FormContent: (entity: any) => React.ReactNode
  cardActions: React.ReactNode[]
}

export const FormCard = (props: TProps) => {
  const { isLoading, entity, FormContent, cardActions } = props
  const [translated_phrase] = useTranslation('global')

  return (
    <DefaultCard
      isLoading={isLoading}
      key={entity.id}
      type='default'
      title={`# ${entity.id} ${entity.name}`}
      badgeRibbonText={translated_phrase(entity.status.lang_code)}
      badgeRibbonClassName={entity.status.class}
      content={FormContent(entity)}
      actions={cardActions}
      extra={formCardExtra(
        entity.type.class,
        translated_phrase(entity.type.lang_code)
      )}
    />
  )
}
