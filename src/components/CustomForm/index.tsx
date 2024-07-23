import React /*, { useRef, useEffect }*/ from 'react'
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

// import { useReactive } from 'ahooks'

interface SubmitButtonProps {
  form: FormInstance
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
  form,
  children,
}) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false)

  // Watch all values
  const values = Form.useWatch([], form)
  console.log(values)

  React.useEffect(() => {
    // form.resetFields()
    // form.resetField()
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false))
  }, [form, values])

  return (
    <Button type='primary' htmlType='submit' disabled={!submittable}>
      {children}
    </Button>
  )
}

export type FormItem = {
  name: string
  rules: Rule[]
  component: React.ReactNode
}

type CustomFormProps = {
  name: string
  //   fieldType: object
  formItems: FormItem[]
  layout?: FormLayout
  initialValues?: Store
}

export const CustomForm: React.FC<CustomFormProps> = ({
  name,
  formItems,
  layout = 'vertical',
  initialValues = {},
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

  const onFinish: FormProps /*<FieldType>*/['onFinish'] = values => {
    console.log('Success:', values)
  }

  const onFinishFailed: FormProps /*<FieldType>*/['onFinishFailed'] =
    errorInfo => {
      console.log('Failed:', errorInfo)
    }

  return (
    <>
      <Form
        form={form}
        name={name}
        layout={layout}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        //   style={{ maxWidth: 600 }}
        initialValues={initialValues}
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        // autoComplete='off'
      >
        {formItems.map(formItem => (
          <Form.Item /*<FieldType>*/
            hasFeedback
            // validateStatus='validating'
            key={formItem.name}
            label={translated_phrase(`form.${formItem.name}`)}
            name={formItem.name}
            rules={formItem.rules}
          >
            {formItem.component}
          </Form.Item>
        ))}
        {/* <Form.Item<FieldType>
          label='Username'
          name='username'
          rules={[
            { required: true, message: 'Please input your username!' },
            { max: 1 },
          ]}
        >
          <Input />
        </Form.Item> */}

        {/* <Form.Item<FieldType>
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <SubmitButton form={form}>Submit</SubmitButton>
        </Form.Item>
      </Form>
    </>
  )
}
