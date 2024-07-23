import React, { SyntheticEvent, useEffect, useRef } from 'react'

import { Form, InputRef, Select } from 'antd'
const { Option } = Select
import { IMask, MaskedInput } from 'antd-mask-input'

import { useReactive } from 'ahooks'

import { useDispatch, useSelector } from 'react-redux'
import { selectPrefix } from '@redux/PhonePrefix/selectors'
import { setPrefix } from '@redux/PhonePrefix/slice'
import type { Prefix } from '@redux/PhonePrefix/types'

import { getIcon } from '@utils/getIcon'

export const PhoneInput: React.FC = (/*props: NumericInputProps*/) => {
  //   const { value, onChange } = props

  const maskedInputRef = useRef<InputRef>(null)

  const dispatch = useDispatch()
  const prefix = useSelector(selectPrefix)

  type PhonePrefixDataType = {
    length: number
    mask: string
    placeholder: string
  }

  const phonePrefixes = new Map<Prefix, PhonePrefixDataType>([
    [
      7,
      { length: 10, mask: '(000)-000-00-00', placeholder: '(___)-___-__-__' },
    ],
    [994, { length: 9, mask: '(00)-000-00-00', placeholder: '(__)-___-__-__' }],
  ])

  const options: React.ReactNode[] = []
  phonePrefixes.forEach((key, value) => {
    options.push(
      <Option
        //   selected={prefix === value}
        key={value}
        value={value}
      >
        +{value}
      </Option>
    )
  })

  const onChangePrefixHandler = (event: Prefix) => {
    dispatch(setPrefix(event))
    // maskedInputRef.current?.select()
    maskedInputRef.current?.focus()
  }

  const prefixSelector = (
    // <>
    //   <i className={getIcon('ID')}></i>
    <Form.Item name='prefix' noStyle>
      <Select
        onChange={onChangePrefixHandler}
        // defaultValue={prefix}
        // defaultActiveFirstOption={prefix === 7}
        style={{ width: 100 }}
      >
        {options.map(option => option)}
      </Select>
    </Form.Item>
    // </>
  )

  const length = phonePrefixes.get(prefix)?.length

  const formMask = () => {
    return phonePrefixes.get(prefix)?.mask || ''
  }
  const formPlaceholder = () => {
    return phonePrefixes.get(prefix)?.placeholder
  }

  const formRegExp = () => {
    return new RegExp(String.raw`^[0-9]{${length}}$` /*, 'g'*/)
  }

  type TState = {
    numberValid: boolean
    mask: string
    placeholder: string | undefined
    regExp: RegExp
    //   codeValue: string
  }

  const state = useReactive<TState>({
    numberValid: false,
    mask: formMask(),
    placeholder: formPlaceholder(),
    regExp: formRegExp(),
    //   codeValue: null,
  })

  useEffect(() => {
    state.numberValid = false
    state.mask = formMask()
    state.placeholder = formPlaceholder()
    state.regExp = formRegExp()
  }, [length])

  const onPhoneNumberChange = (
    e: SyntheticEvent & { maskedValue: string; unmaskedValue: string }
  ) => {
    const newValue = e.unmaskedValue
    state.numberValid = /*newValue && */ state.regExp.test(newValue)
    // console.log(prefix + newValue)

    // state.numberValue = newValue
  }

  return (
    // <span className='ant-input-affix-wrapper css-dev-only-do-not-override-1rqnfsa ant-input-outlined ant-input-status-success'>
    // <>
    <Form.Item
      name='phone'
      noStyle
      //   initialValue={state.placeholder}
      hasFeedback
      validateStatus={state.numberValid ? 'success' : 'error'}
      rules={[
        {
          transform: value => {
            return value.replace(/\D/g, '')
          },
          required: true,
          len: length,
          //   pattern: state.regExp,
        },
      ]}
    >
      <MaskedInput
        ref={maskedInputRef}
        // value={state.placeholder}
        autoFocus
        mask={state.mask}
        onChange={onPhoneNumberChange}
        placeholder={state.placeholder}
        prefix={'+' + prefix}
        addonBefore={prefixSelector}
        pattern='[0-9]*'
        inputMode='numeric'
        status={state.numberValid ? '' : 'error'}
        //   onPressEnter={async () => {
        //     if (state.numberValid && state.cooldown == 0) {
        //       await onSendCode()
        //     }
        //   }}
      />
    </Form.Item>

    // </>
    //   <span className='ant-input-suffix'>
    //     <span className='ant-form-item-feedback-icon ant-form-item-feedback-icon-success'>
    //       <span
    //         role='img'
    //         aria-label='check-circle'
    //         className='anticon anticon-check-circle'
    //       >
    //         <svg
    //           viewBox='64 64 896 896'
    //           focusable='false'
    //           data-icon='check-circle'
    //           width='1em'
    //           height='1em'
    //           fill='currentColor'
    //           aria-hidden='true'
    //         >
    //           <path d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z'></path>
    //         </svg>
    //       </span>
    //     </span>
    //   </span>
    // </span>
  )
}
