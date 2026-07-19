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
import {
  PHONE_PREFIX_META,
  PHONE_PREFIXES,
  composeE164,
  digitsOnly,
  splitE164,
} from '@utils/phoneE164'

type PhoneInputProps = {
  nextInputRef?: React.RefObject<InputRef | null>
  autoFocus?: boolean
  /**
   * `national` — login / Form fields `prefix` + `phone` (backend builds E.164).
   * `e164` — antd Form control for entity CRUD (`value`/`onChange` = `+…`).
   */
  mode?: 'national' | 'e164'
  value?: string
  onChange?: (e164: string) => void
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  nextInputRef,
  autoFocus = false,
  mode = 'national',
  value,
  onChange,
}) => {
  const [translated_phrase] = useTranslation('global')
  const dispatch = useDispatch()
  const prefix = useSelector(selectPrefix)
  const maskedInputRef = useRef<InputRef>(null)
  const isE164 = mode === 'e164'

  const meta = PHONE_PREFIX_META[prefix]
  const length = meta.length

  const state = useReactive<{
    numberValid: boolean
    mask: string
    placeholder: string
    regExp: RegExp
    nationalDisplay: string
  }>({
    numberValid: false,
    mask: meta.mask,
    placeholder: meta.placeholder,
    regExp: new RegExp(String.raw`^[0-9]{${length}}$`),
    nationalDisplay: '',
  })

  const options: React.ReactNode[] = PHONE_PREFIXES.map(code => (
    <Option key={code} value={code}>
      +{code}
    </Option>
  ))

  const emitE164 = (nextPrefix: Prefix, national: string) => {
    if (!isE164) {
      return
    }

    const e164 = composeE164(nextPrefix, national)
    onChange?.(e164 ?? '')
  }

  const onChangePrefixHandler = (nextPrefix: Prefix) => {
    dispatch(setPrefix(nextPrefix))
    maskedInputRef.current?.focus()
    emitE164(nextPrefix, digitsOnly(state.nationalDisplay))
  }

  const prefixSelector = (
    <span className='phone-input-prefix'>
      <i className={getIcon('PHONE')}></i>
      {isE164 ? (
        <Select
          value={prefix}
          onChange={onChangePrefixHandler}
          allowClear={false}
          variant='borderless'
        >
          {options}
        </Select>
      ) : (
        <Form.Item name='prefix' noStyle>
          <Select
            onChange={onChangePrefixHandler}
            allowClear={false}
            variant='borderless'
          >
            {options}
          </Select>
        </Form.Item>
      )}
    </span>
  )

  useEffect(() => {
    const nextMeta = PHONE_PREFIX_META[prefix]
    state.numberValid = false
    state.mask = nextMeta.mask
    state.placeholder = nextMeta.placeholder
    state.regExp = new RegExp(String.raw`^[0-9]{${nextMeta.length}}$`)
  }, [prefix])

  useEffect(() => {
    if (!isE164 || !value) {
      return
    }

    const parts = splitE164(value)
    if (!parts) {
      return
    }

    if (parts.prefix !== prefix) {
      dispatch(setPrefix(parts.prefix))
    }

    state.nationalDisplay = parts.national
    state.numberValid =
      parts.national.length === PHONE_PREFIX_META[parts.prefix].length
  }, [isE164, value])

  useEffect(() => {
    if (nextInputRef?.current && state.numberValid) {
      nextInputRef.current.focus()
    }
  }, [nextInputRef, state.numberValid])

  const onPhoneNumberChange = (
    e: SyntheticEvent & { maskedValue: string; unmaskedValue: string }
  ) => {
    const newValue = e.unmaskedValue
    state.nationalDisplay = newValue
    state.numberValid = state.regExp.test(newValue)
    emitE164(prefix, newValue)
  }

  const maskedInput = (
    <MaskedInput
      ref={maskedInputRef}
      autoFocus={autoFocus}
      mask={state.mask}
      onChange={onPhoneNumberChange}
      placeholder={state.placeholder}
      value={isE164 ? state.nationalDisplay : undefined}
      prefix={'+' + prefix}
      addonBefore={prefixSelector}
      inputMode='numeric'
      status={state.numberValid ? '' : 'error'}
    />
  )

  if (isE164) {
    return maskedInput
  }

  return (
    <Form.Item
      name='phone'
      noStyle
      hasFeedback
      label={translated_phrase('Form.phone')}
      validateStatus={state.numberValid ? 'success' : 'error'}
      rules={[
        {
          transform: value => {
            return String(value ?? '').replace(/\D/g, '')
          },
          required: true,
          len: length,
        },
      ]}
    >
      {maskedInput}
    </Form.Item>
  )
}
