import React, { useEffect, useState, SyntheticEvent } from 'react'
// import constants from '@utils/constants.json'

// import type { FormProps } from 'antd'
import { Row, Col, Input } from 'antd'
import type { InputRef } from 'antd'

import styles from './index.module.scss'

// const { Option } = Select
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

import { useSelector } from 'react-redux'
import { selectPrefix } from '@redux/PhonePrefix/selectors'

import { useTranslation } from 'react-i18next'

import { CustomForm } from '@components/CustomForm'
import { PhoneInput } from '@components/PhoneInput'
import type { FormItem, FormCard } from '@components/CustomForm'

import { SetPageTitle } from '@utils/helpers'
import { getIcon } from '@utils/getIcon'
import { formCardExtra } from '@utils/formCardExtra'

export const Auth: React.FC = () => {
  const [translated_phrase] = useTranslation('global')
  SetPageTitle(translated_phrase('AuthPage.page_title'))

  const passwordInputRef = React.useRef<InputRef>(null)

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

  const formItems: FormItem[] = [
    {
      name: 'phone',
      rules: [{ required: true }],
      component: <PhoneInput nextInputRef={passwordInputRef} />,
    },
    {
      name: 'password',
      rules: [{ required: true }, { min: 8 }, { max: 10 }],
      component: (
        <Input.Password
          ref={passwordInputRef}
          addonBefore={<i className={getIcon('PASSWORD')}></i>}
          placeholder={
            translated_phrase('Form.Common.enter') +
            translated_phrase('Form.password')
          }
        />
      ),
    },
  ]

  const formCard: FormCard = {
    title: (
      <>
        {translated_phrase('Common.companyName') + ' '}
        <i
          className={getIcon('FLASK') + ' fa-fade'}
          style={{ animationDuration: '4s' }}
        ></i>
      </>
    ),
    type: 'default',
    badgeRibbonText: translated_phrase('AuthPage.for_staff'),
    badgeRibbonClassName: 'success',
    extra: formCardExtra(
      'success transparent',
      translated_phrase('AuthPage.page_title') +
        ' ' +
        translated_phrase('Prepositions.in') +
        ' ' +
        translated_phrase('Common.system_type')
    ),
  }

  return (
    <Row className={styles.auth_form} align='middle' justify='center'>
      <Col xs={24} lg={12} xl={10} xxl={8}>
        <CustomForm
          name='login'
          formItems={formItems}
          initialValues={{
            prefix: useSelector(selectPrefix),
          }}
          formCard={formCard}
        />
      </Col>
    </Row>
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
