import React from 'react'

import { Form } from 'antd'

type StoryFormProps = {
  children: React.ReactNode
  initialValues?: Record<string, unknown>
}

/** Обёртка antd Form для connected-компонентов в Storybook */
export const StoryForm: React.FC<StoryFormProps> = ({
  children,
  initialValues = {},
}) => (
  <Form layout='vertical' initialValues={initialValues}>
    {children}
  </Form>
)
