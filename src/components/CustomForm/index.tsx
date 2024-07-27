import React, { useEffect /*, { useRef, useEffect }*/ } from 'react'
// import constants from '@utils/constants.json'

import type { FormProps } from 'antd'
import { Button, Form /*, Checkbox*/ } from 'antd'

// import {
//   Cascader,
//   ColorPicker,
//   DatePicker,
//   InputNumber,
//   Radio,
//   Select,
//   Slider,
//   Switch,
//   TreeSelect,
//   Upload,
// } from 'antd'
// const { RangePicker } = DatePicker
// const { TextArea } = Input

import type { FormInstance } from 'antd'
import type { FormLayout } from 'antd/es/form/Form'
import type { Rule } from '../../../node_modules/rc-field-form/lib/interface.d.ts'
import type { Store } from '../../../node_modules/rc-field-form/lib/interface.d.ts'

import { useSelector } from 'react-redux'
import { selectPrefix } from '@redux/PhonePrefix/selectors'

import { useTranslation } from 'react-i18next'

import { useReactive } from 'ahooks'

import { DefaultCard } from '@components/DefaultCard'
import type { DefaultCardProps } from '@components/DefaultCard'

import { getIcon } from '@utils/getIcon'
import { useAPIQuery } from '@api/useAPIQuery.ts'
import { ProjectGroup } from '@api/models/project/queryGroup/'
// import { selectAuthToken } from '@redux/CurrentUser/selectors'

// import { TestR } from '@api/requests/testR'

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

  //   form.getFieldInstance('password').focus()

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => (state.submittable = true))
      .catch(() => (state.submittable = false))

    // form
    //   .validateFields(['phone'])
    //   .then(e => e && form.getFieldInstance('password').focus())

    // form.getFieldInstance('phone').
    // form.getFieldValue('phone').nora
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
  //   fieldType: object
  formItems: FormItem[]
  formCard: FormCard
  btnIcon?: string
  btnText?: string
  btnClass?: string
  initialValues?: Store
  layout?: FormLayout
}

export const CustomForm: React.FC<CustomFormProps> = ({
  name,
  formItems,
  formCard,
  btnIcon = 'GO',
  btnText = 'Form.BtnTexts.default',
  btnClass = '',
  initialValues = {},
  layout = 'vertical',
}) => {
  const [translated_phrase] = useTranslation('global')

  const prefix = useSelector(selectPrefix)
  const [form] = Form.useForm()

  React.useEffect(() => {
    form.resetFields(['phone'])
  }, [prefix])

  // type FieldType = {
  //   username: string
  //   password: string
  // }

  //   type FieldType = typeof fieldType

  //   useEffect(() => {
  // TestR()

  //   const PG = new ProjectGroup(
  //     'Bearer 1|wcKsc30IAcEAC76Clqlnf9RiNx6lLEtS3oJbuQf2bd8e7f3d'
  //   )
  //   PG.index()

  //   const { data, isLoading, isSuccess, isError } = useAPIQuery(
  //     projectGroup.index
  //   )
  console.log(1, ProjectGroup.prototype)
  //   console.log(2, ProjectGroup.prototype.valueOf())

  const { data, isLoading, isSuccess, isError } = useAPIQuery(
    ProjectGroup,
    // ProjectGroup.prototype.show
    // ProjectGroup.prototype.index
    // ProjectGroup.getPrototypeOf
    'index'
    // Object.prototype.
  )
  //   console.log(data)
  //   console.log(isLoading)
  //   console.log(isSuccess)
  //   console.log(isError)
  //   }, [])

  const onFinish: FormProps /*<FieldType>*/['onFinish'] = values => {
    console.log('Success:', values)

    // TestR()
  }

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
              //   validateStatus='validating'
              key={formItem.name}
              label={translated_phrase(`Form.${formItem.name}`)}
              name={formItem.name}
              rules={formItem.rules}
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
