import React, { useRef, useEffect, useState, SyntheticEvent } from 'react'
// import constants from '@utils/constants.json'

// import type { FormProps } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'

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
// const { Option } = Select

// import type { FormInstance } from 'antd'

// import styles from './../index.module.scss'
// import styles from '../../components/Sidebar/index.module.scss'

import { useTranslation } from 'react-i18next'

import { CustomForm } from '@components/CustomForm'
import { PhoneInput } from '@components/PhoneInput'
import type { FormItem } from '@components/CustomForm'

import { SetPageTitle } from '@utils/helpers'
import { getIcon } from '@utils/getIcon'

// const { Content, Footer, Sider } = Layout

// interface SubmitButtonProps {
//   form: FormInstance
// }

// const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
//   form,
//   children,
// }) => {
//   const [submittable, setSubmittable] = React.useState<boolean>(false)

//   // Watch all values
//   const values = Form.useWatch([], form)

//   React.useEffect(() => {
//     form
//       .validateFields({ validateOnly: true })
//       .then(() => setSubmittable(true))
//       .catch(() => setSubmittable(false))
//   }, [form, values])

//   return (
//     <Button type='primary' htmlType='submit' disabled={!submittable}>
//       {children}
//     </Button>
//   )
// }

// type FieldType = {
//   username: string
//   password: string
// }

// const onFinish: FormProps<FieldType>['onFinish'] = values => {
//   console.log('Success:', values)
// }

// const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
//   console.log('Failed:', errorInfo)
// }

export const Auth: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(translated_phrase('AuthPage.page_title'))

  //   const navigate = useNavigate()

  //   const state = useReactive({
  //     error: '',
  //   })

  //   const emailInputRef = useRef<HTMLInputElement>(null)
  //   const passwordInputRef = useRef<HTMLInputElement>(null)

  //   const authorize = async () => {
  //     try {
  //       state.error = ''
  //       const { data } = await axios.post(constants.API_URL + 'login', {
  //         email: emailInputRef.current?.value,
  //         password: passwordInputRef.current?.value,
  //       })
  //       localStorage.setItem('auth_key', data.access_token)
  //       localStorage.setItem('user_email', data.user.email)
  //       navigate('/')
  //     } catch (error) {
  //       if (!error.response) {
  //         state.error = 'Введите авторизационные данные'
  //       } else {
  //         state.error = error.response.data.message
  //       }
  //     }
  //   }

  //   const [form] = Form.useForm()

  const formItems: FormItem[] = [
    {
      name: 'ex',
      rules: [
        { required: true, message: 'Please input your username!' },
        { max: 1 },
      ],
      component: <Input />,
    },
    {
      name: 'phone',
      rules: [{ required: true } /*, { min: 9 }, { max: 15 }*/],
      component: (
        // <Input
        //   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

        //     const { value: inputValue } = e.target
        //     // const reg = /^-?\d*(\.\d*)?$/
        //     const reg = /\d+/g
        //     // console.log(inputValue)

        //     // console.log('r', inputValue.replace(reg, inputValue))

        //     // inputValue.replace(reg, inputValue)

        //     // console.log(inputValue.match(reg)?.join(''))

        //     setValue1(inputValue.match(reg)?.join('') || '')
        //     // console.log(inputValue)
        //     // console.log(value)

        //     // if (
        //     //   reg.test(inputValue) ||
        //     //   inputValue === '' ||
        //     //   inputValue === '-'
        //     // ) {
        //     //   console.log('true')

        //     //   //   onChange(inputValue)
        //     // }
        //   }}
        //   placeholder='Input a number'
        //   value={value1}
        //   //   maxLength={16}
        // />

        // <NumericInput
        //   style={{ width: 120 }}
        //   value={value}
        //   onChange={setValue}
        // />

        // <InputNumber
        //   type='number'
        //   //   className={styles.test}
        //   //   parser={value => value!.replace('+', '')}
        //   //   formatter={value => value!.replace('+', '')}
        //   //   min={1}
        //   //   max={10}
        //   stringMode={true}
        //   onKeyDown={event => {
        //     const regex = /^[eE.,-]/
        //     // const disallowedKeys = ['ArrowUp', 'ArrowDown']
        //     // console.log(event.key)
        //     // console.log(disallowedKeys.includes(event.key))
        //     // disallowedKeys.includes(event.key) ||
        //     if (regex.test(event.key)) {
        //       event.preventDefault()
        //     }
        //   }}
        //   onPaste={event => {
        //     const regex = /[eE.,-]/
        //     if (regex.test(event.clipboardData.getData('text/plain'))) {
        //       event.preventDefault()
        //     }
        //   }}
        //   controls={false}
        //   changeOnWheel={false}
        //   changeOnBlur={false}
        //   precision={0}
        //   //   step={0.01}
        //   //   max={2}
        //   autoFocus={true}
        //   //   addonBefore={<i className={getIcon('ID')}></i>}
        //   //   placeholder='input search text'
        //   addonBefore={prefixSelector}
        //   style={{ width: '100%' }}
        //   //   keyboard={false}
        // />
        // <Input
        //   //   onChange={function () {
        //   //     console.log(this)
        //   //   }}

        //   //   onKeyDown={event => {
        //   //     const regex = /[0-9]/
        //   //     const allowedKeys = [
        //   //       'Backspace',
        //   //       'Delete',
        //   //       'ArrowLeft',
        //   //       'ArrowUp',
        //   //       'ArrowRight',
        //   //       'ArrowDown',
        //   //     ]
        //   //     if (!allowedKeys.includes(event.key) && !regex.test(event.key)) {
        //   //       event.preventDefault()
        //   //     }
        //   //   }}

        //   type='number'
        //   //   controls={false}
        //   addonBefore={prefixSelector}
        //   // onKeyPress={event => {
        //   //   if (!/[0-9]/.test(event.key)) {
        //   //     event.preventDefault()
        //   //   }
        //   // }}
        //   //   onKeyDown={event => {
        //   //     if (event.keyCode == 8) {
        //   //       console.log('bac')
        //   //     } else if (event.keyCode == 46) {
        //   //       console.log('del')
        //   //     } else {
        //   //       if (!/[0-9]/.test(event.key)) {
        //   //         event.preventDefault()
        //   //       }
        //   //     }
        //   //   }}
        // />
        <PhoneInput />
      ),
    },
    {
      name: 'password',
      rules: [
        { required: true, message: 'Please input your username!' },
        { max: 1 },
      ],
      component: <Input.Password />,
    },
  ]

  return (
    <CustomForm
      name='login'
      formItems={formItems}
      initialValues={{
        prefix: '+7',
      }}
    />
  )
  // <>
  //   <Form
  //     form={form}
  //     name='validateOnly'
  //     layout='vertical'
  //     labelCol={{ span: 8 }}
  //     wrapperCol={{ span: 16 }}
  //     //   style={{ maxWidth: 600 }}
  //     initialValues={{ remember: true }}
  //     onFinish={onFinish}
  //     onFinishFailed={onFinishFailed}
  //     // autoComplete='off'
  //   >
  //     <Form.Item<FieldType>
  //       label='Username'
  //       name='username'
  //       rules={[
  //         { required: true, message: 'Please input your username!' },
  //         { max: 1 },
  //       ]}
  //     >
  //       <Input />
  //     </Form.Item>

  //     <Form.Item<FieldType>
  //       label='Password'
  //       name='password'
  //       rules={[{ required: true, message: 'Please input your password!' }]}
  //     >
  //       <Input.Password />
  //     </Form.Item>

  //     <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
  //       {/* <Button type='primary' htmlType='submit'>
  //         Submit
  //       </Button> */}
  //       <SubmitButton form={form}>Submit</SubmitButton>
  //     </Form.Item>
  //   </Form>
  //   <>
  //     <Checkbox
  //       checked={false}
  //       //   onChange={e => (e.target.checked)}
  //     >
  //       Form disabled
  //     </Checkbox>
  //     <Form
  //       labelCol={{ span: 4 }}
  //       wrapperCol={{ span: 14 }}
  //       layout='horizontal'
  //       disabled={false}
  //       style={{ maxWidth: 600 }}
  //     >
  //       <Form.Item label='Checkbox' name='disabled' valuePropName='checked'>
  //         <Checkbox>Checkbox</Checkbox>
  //       </Form.Item>
  //       <Form.Item label='Radio'>
  //         <Radio.Group>
  //           <Radio value='apple'> Apple </Radio>
  //           <Radio value='pear'> Pear </Radio>
  //         </Radio.Group>
  //       </Form.Item>
  //       <Form.Item label='Input'>
  //         <Input />
  //       </Form.Item>
  //       <Form.Item label='Select'>
  //         <Select>
  //           <Select.Option value='demo'>Demo</Select.Option>
  //         </Select>
  //       </Form.Item>
  //       <Form.Item label='TreeSelect'>
  //         <TreeSelect
  //           treeData={[
  //             {
  //               title: 'Light',
  //               value: 'light',
  //               children: [{ title: 'Bamboo', value: 'bamboo' }],
  //             },
  //           ]}
  //         />
  //       </Form.Item>
  //       <Form.Item label='Cascader'>
  //         <Cascader
  //           options={[
  //             {
  //               value: 'zhejiang',
  //               label: 'Zhejiang',
  //               children: [
  //                 {
  //                   value: 'hangzhou',
  //                   label: 'Hangzhou',
  //                 },
  //               ],
  //             },
  //           ]}
  //         />
  //       </Form.Item>
  //       <Form.Item label='DatePicker'>
  //         <DatePicker />
  //       </Form.Item>
  //       <Form.Item label='RangePicker'>
  //         <RangePicker />
  //       </Form.Item>
  //       <Form.Item label='InputNumber'>
  //         <InputNumber />
  //       </Form.Item>
  //       <Form.Item label='TextArea'>
  //         <TextArea rows={4} />
  //       </Form.Item>
  //       <Form.Item label='Switch' valuePropName='checked'>
  //         <Switch />
  //       </Form.Item>
  //       <Form.Item
  //         label='Upload'
  //         valuePropName='fileList'
  //         // getValueFromEvent={normFile}
  //       >
  //         <Upload action='/upload.do' listType='picture-card'>
  //           <button style={{ border: 0, background: 'none' }} type='button'>
  //             {/* <PlusOutlined /> */}
  //             <div style={{ marginTop: 8 }}>Upload</div>
  //           </button>
  //         </Upload>
  //       </Form.Item>
  //       <Form.Item label='Button'>
  //         <Button>Button</Button>
  //       </Form.Item>
  //       <Form.Item label='Slider'>
  //         <Slider />
  //       </Form.Item>
  //       <Form.Item label='ColorPicker'>
  //         <ColorPicker />
  //       </Form.Item>
  //     </Form>
  //   </>
  // </>
}
//  ${
//             styles.opened
//             // isCollapsed ? styles.collapsed : styles.opened
//           }
