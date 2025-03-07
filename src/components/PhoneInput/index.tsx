import React, { SyntheticEvent, useEffect, useRef } from 'react'

import { useTranslation } from 'react-i18next'

import { useReactive } from 'ahooks'

import { Form, Select } from 'antd'
import type { InputRef } from 'antd'
import { MaskedInput } from 'antd-mask-input'
const { Option } = Select

import { useDispatch, useSelector } from 'react-redux'
import { selectPrefix } from '@redux/PhonePrefix/selectors'
import { setPrefix } from '@redux/PhonePrefix/slice'
import type { Prefix } from '@redux/PhonePrefix/types'

import { getIcon } from '@utils/getIcon'

type PhoneInputProps = {
  nextInputRef?: React.RefObject<InputRef>
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ nextInputRef }) => {
  const [translated_phrase] = useTranslation('global')

  const dispatch = useDispatch()
  const prefix = useSelector(selectPrefix)

  const maskedInputRef = useRef<InputRef>(null)

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
    <>
      <i className={getIcon('PHONE')}></i>
      <Form.Item name='prefix' noStyle>
        <Select
          onChange={onChangePrefixHandler}
          // defaultValue={prefix}
          // defaultActiveFirstOption={prefix === 7}
          //   style={{ width: 130 }}
        >
          {options.map(option => option)}
        </Select>
      </Form.Item>
    </>
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

  useEffect(() => {
    if (nextInputRef?.current && state.numberValid) {
      nextInputRef.current.focus()
    }
  }, [nextInputRef, state.numberValid])

  const onPhoneNumberChange = (
    e: SyntheticEvent & { maskedValue: string; unmaskedValue: string }
  ) => {
    const newValue = e.unmaskedValue
    state.numberValid = /*newValue && */ state.regExp.test(newValue)
    // console.log(prefix + newValue)

    // state.numberValue = newValue
  }

  return (
    <Form.Item
      name='phone'
      noStyle
      //   initialValue={state.placeholder}
      hasFeedback
      label={translated_phrase('Form.phone')}
      validateStatus={state.numberValid ? 'success' : 'error'}
      rules={[
        {
          transform: value => {
            return value.replace(/\D/g, '')
          },
          required: true,
          len: length,
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
        //
        // pattern='[0-9]*'
        //  | novalidate
        inputMode='numeric'
        status={state.numberValid ? '' : 'error'}
        //   onPressEnter={async () => {
        //     if (state.numberValid && state.cooldown == 0) {
        //       await onSendCode()
        //     }
        //   }}
      />
    </Form.Item>
  )
}
