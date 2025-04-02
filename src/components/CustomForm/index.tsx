import React from 'react'

import type { FormProps } from 'antd'
import { Button, Form } from 'antd'

import type { FormInstance } from 'antd'
import type { FormLayout } from 'antd/es/form/Form'
import type { Rule } from 'rc-field-form/lib/interface'
import type { Store } from 'rc-field-form/lib/interface'

import { useDispatch, useSelector } from 'react-redux'
import { selectPrefix } from '@redux/PhonePrefix/selectors'
import { setSetFieldsValue } from '@redux/CurrentForm/slice'

import { useTranslation } from 'react-i18next'

import { useReactive } from 'ahooks'

import { DefaultCard } from '@components/DefaultCard'
import type { DefaultCardProps } from '@components/DefaultCard'

import { getIcon } from '@utils/getIcon'

import type { GroupClass, GroupMethod } from '@api/common/types/TGroups'

import { useAPIMutation } from '@api/useAPIMutation'

interface SubmitButtonProps {
  form: FormInstance
  btnIcon: string
  btnClass: string
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
  form,
  btnIcon,
  btnClass,
  children,
}) => {
  type TState = {
    submittable: boolean
  }
  const state = useReactive<TState>({
    submittable: false,
  })

  // Watch all values
  const values = Form.useWatch([], form)
  //   console.log(values)

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => (state.submittable = true))
      .catch(() => (state.submittable = false))

    // form
    //   .validateFields(['phone'])
    //   .then(e => e && form.getFieldInstance('password').focus())
  }, [form, values])

  return (
    <Button
      htmlType='submit'
      //   htmlType='button'
      className={`smart-btn ${btnClass}`}
      icon={<i className={getIcon(btnIcon)}></i>}
      disabled={!state.submittable}
    >
      {children}
    </Button>
  )
}

export type FormItem = {
  name: string
  rules: Rule[]
  component: React.ReactNode
}

export type FormCard = Omit<DefaultCardProps, 'content' | 'hoverable' | 'grid'>

type CustomFormProps = {
  name: string
  formItems: FormItem[]
  formCard: FormCard
  requestData: { groupClass: GroupClass; groupMethod: GroupMethod }
  onSuccessMutation: (data) => void
  btnIcon?: string
  btnText?: string
  btnClass?: string
  initialValues?: Store
  layout?: FormLayout
  entityId?: number
}

export const CustomForm: React.FC<CustomFormProps> = ({
  name,
  formItems,
  formCard,
  requestData,
  onSuccessMutation,
  btnIcon = 'GO',
  btnText = 'Form.BtnTexts.default',
  btnClass = '',
  initialValues = {},
  layout = 'vertical',
  entityId = undefined,
}) => {
  const [translated_phrase] = useTranslation('global')
  const dispatch = useDispatch()
  console.log(`formItems = `)
  console.log(formItems)
  //   console.log(formItems[0].component)

  const prefix = useSelector(selectPrefix)
  //   const form1 = Form.useForm()
  const [form] = Form.useForm()
  //   console.log(`form = `)
  //   console.log(typeof form)
  //   console.log(form)
  //   console.log(JSON.stringify(form))
  //   console.log(Object.keys(form))

  dispatch(setSetFieldsValue(form.setFieldsValue))

  //   type TState = {
  //     submit: boolean
  //   }
  //   const state = useReactive<TState>({
  //     submit: false,
  //   })

  React.useEffect(() => {
    form.resetFields(['phone'])
  }, [prefix])

  const onFinish: FormProps /*<FieldType>*/['onFinish'] = values => {
    console.log('Success:', values)

    // state.submit = true
    mutate(undefined, { onSuccess: onSuccessMutation })
    console.log(data)
    console.log(variables)
  }

  const values = Form.useWatch([], form)
  console.log(`values = ${values}`)
  console.log(values)

  const { mutate, data, isPending, isSuccess, isError, variables } =
    useAPIMutation(
      requestData.groupClass,
      requestData.groupMethod,
      values,
      entityId
    )

  //   React.useEffect(function () {}, [])

  const onFinishFailed: FormProps /*<FieldType>*/['onFinishFailed'] =
    errorInfo => {
      console.log('Failed:', errorInfo)
    }

  return (
    <DefaultCard
      grid={{ xs: 24, lg: 24, xl: 24, xxl: 24 }}
      type={formCard.type}
      title={formCard.title}
      badgeRibbonText={formCard.badgeRibbonText}
      badgeRibbonClassName={formCard.badgeRibbonClassName}
      content={
        <Form
          form={form}
          name={name}
          layout={layout}
          //   size='large'
          //   scrollToFirstError
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          //   style={{ maxWidth: 600 }}
          initialValues={initialValues}
          // initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          {formItems.map(formItem => (
            <Form.Item /*<FieldType>*/
              hasFeedback
              validateStatus={isPending ? 'validating' : undefined}
              key={formItem.name}
              label={translated_phrase(`Form.${formItem.name}`)}
              name={formItem.name}
              rules={formItem.rules}
              valuePropName={
                formItem.name.includes('check') ? 'checked' : undefined
              }
            >
              {formItem.component}
            </Form.Item>
          ))}
          <Form.Item
          //   wrapperCol={{ offset: 8, span: 16 }}
          >
            <SubmitButton form={form} btnIcon={btnIcon} btnClass={btnClass}>
              {translated_phrase(btnText)}
            </SubmitButton>
          </Form.Item>
        </Form>
      }
      extra={formCard.extra}
    />
  )
}
