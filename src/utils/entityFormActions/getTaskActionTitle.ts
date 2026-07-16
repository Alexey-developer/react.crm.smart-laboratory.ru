import { TFunction } from 'i18next'

export const getTaskActionTitle = (
  translated_phrase: TFunction,
  taskTitle?: string
) => {
  if (taskTitle) {
    return taskTitle
  }

  return translated_phrase('Form.EntitiesFields.task_id')
}
