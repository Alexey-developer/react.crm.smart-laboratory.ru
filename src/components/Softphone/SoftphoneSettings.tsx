import React from 'react'

import { useReactive } from 'ahooks'

import { useTranslation } from 'react-i18next'

import {
  TelephonySoftphoneGroup,
  type TSoftphonePreferences,
} from '@api/models/telephonySoftphone/queryGroup'
import { useAPIMutation } from '@api/useAPIMutation'
import { useAPIQuery } from '@api/useAPIQuery'

import { AllowSwitch } from '@components/AllowSwitch'

import { formatE164Display } from '@utils/phoneE164'

import styles from './settings.module.scss'

type SoftphoneSettingsProps = {
  onPreferencesChanged?: () => void
}

const SoftphoneSettingsComponent: React.FC<SoftphoneSettingsProps> = ({
  onPreferencesChanged,
}) => {
  const [translated_phrase] = useTranslation('global')

  const { data, refetch } = useAPIQuery(
    TelephonySoftphoneGroup,
    'preferences',
    {},
    true
  )

  const { mutateAsync, isPending } = useAPIMutation(
    TelephonySoftphoneGroup,
    'updatePreferences',
    {}
  )

  const ui = useReactive({
    softphoneSaving: false,
    mobileSaving: false,
  })

  const prefs = data as TSoftphonePreferences | undefined

  if (!prefs?.has_operator_profile || !prefs.is_active) {
    return null
  }

  const apply = async (patch: {
    softphone_enabled?: boolean
    mobile_dialer_enabled?: boolean
  }) => {
    await mutateAsync(patch)
    await refetch()
    onPreferencesChanged?.()
  }

  const onSoftphone = async (checked: boolean) => {
    ui.softphoneSaving = true
    try {
      await apply({ softphone_enabled: checked })
    } finally {
      ui.softphoneSaving = false
    }
  }

  const onMobile = async (checked: boolean) => {
    ui.mobileSaving = true
    try {
      await apply({ mobile_dialer_enabled: checked })
    } finally {
      ui.mobileSaving = false
    }
  }

  return (
    <div className={styles.settings}>
      <div className={styles.title}>
        {translated_phrase('Softphone.settings_title')}
      </div>
      <AllowSwitch
        label={translated_phrase('Softphone.accept_crm')}
        checked={prefs.softphone_enabled}
        loading={ui.softphoneSaving || isPending}
        onChange={checked => void onSoftphone(checked)}
      />
      <AllowSwitch
        label={translated_phrase('Softphone.accept_mobile')}
        checked={prefs.mobile_dialer_enabled}
        loading={ui.mobileSaving || isPending}
        disabled={prefs.mobile_dialer_locked}
        onChange={checked => void onMobile(checked)}
      />
      {prefs.phone_e164 ? (
        <div className={styles.phone_hint}>
          {translated_phrase('Softphone.operator_phone', {
            phone: formatE164Display(prefs.phone_e164),
          })}
        </div>
      ) : null}
    </div>
  )
}

export const SoftphoneSettings = React.memo(SoftphoneSettingsComponent)
