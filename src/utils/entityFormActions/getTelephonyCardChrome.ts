import type { TColorType } from '@api/common/types/TColorType'

type Translate = (key: string) => string

export type TelephonyCardChrome = {
  ribbonText: string
  ribbonClassName: TColorType
  extraText?: string
  extraClassName?: TColorType
}

const asBool = (value: unknown): boolean => value === true || value === 1 || value === '1'

/** Call: direction + answered/missed. */
export const isCallListEntity = (entity: Record<string, unknown>): boolean =>
  typeof entity.direction === 'string' &&
  typeof entity.source === 'string' &&
  ('is_answered' in entity || 'session_id' in entity)

/** PhoneNumber: morph owner type. */
export const isPhoneNumberListEntity = (entity: Record<string, unknown>): boolean =>
  typeof entity.phoneable_type === 'string' && typeof entity.e164 === 'string'

/** OperatorProfile: Vox user flags. */
export const isOperatorProfileListEntity = (
  entity: Record<string, unknown>
): boolean =>
  typeof entity.vox_username === 'string' && 'softphone_enabled' in entity

/** CallExtension: internal code + target. */
export const isCallExtensionListEntity = (
  entity: Record<string, unknown>
): boolean =>
  typeof entity.code === 'string' && typeof entity.target_type === 'string'

/** CompanyDialNumber: inbound mode. */
export const isCompanyDialNumberListEntity = (
  entity: Record<string, unknown>
): boolean =>
  typeof entity.inbound_mode === 'string' && typeof entity.e164 === 'string'

/** BlockedPhoneNumber: e164 without phoneable / inbound_mode. */
export const isBlockedPhoneNumberListEntity = (
  entity: Record<string, unknown>
): boolean =>
  typeof entity.e164 === 'string' &&
  !('phoneable_type' in entity) &&
  !('inbound_mode' in entity) &&
  'is_active' in entity &&
  !('vox_username' in entity)

export const getTelephonyCardChrome = (
  entity: Record<string, unknown>,
  translate: Translate
): TelephonyCardChrome | null => {
  if (isCallListEntity(entity)) {
    const answered = asBool(entity.is_answered)
    const missed = asBool(entity.is_missed)

    return {
      ribbonText: translate(`Types.Call.${entity.direction}`),
      ribbonClassName:
        entity.direction === 'inbound' ? 'success' : 'warning',
      extraText: answered
        ? translate('Calls.answered')
        : missed
          ? translate('Calls.missed')
          : undefined,
      extraClassName: answered ? 'success' : missed ? 'danger' : undefined,
    }
  }

  if (isPhoneNumberListEntity(entity)) {
    return {
      ribbonText: translate(`Types.PhoneNumber.${entity.phoneable_type}`),
      ribbonClassName: 'transparent',
      extraText: asBool(entity.is_primary)
        ? translate('Form.EntitiesFields.is_primary')
        : undefined,
      extraClassName: 'success',
    }
  }

  if (isOperatorProfileListEntity(entity)) {
    const active = asBool(entity.is_active)
    return {
      ribbonText: active
        ? translate('Form.EntitiesFields.is_active')
        : `${translate('Form.EntitiesFields.is_active')}: off`,
      ribbonClassName: active ? 'success' : 'danger',
      extraText: asBool(entity.softphone_enabled)
        ? translate('Form.EntitiesFields.softphone_enabled')
        : undefined,
      extraClassName: 'success',
    }
  }

  if (isCallExtensionListEntity(entity)) {
    const active = asBool(entity.is_active)
    return {
      ribbonText: translate(`Types.CallExtension.${entity.target_type}`),
      ribbonClassName: 'transparent',
      extraText: translate('Form.EntitiesFields.is_active'),
      extraClassName: active ? 'success' : 'danger',
    }
  }

  if (isCompanyDialNumberListEntity(entity)) {
    const active = asBool(entity.is_active)
    return {
      ribbonText: translate(`Types.CompanyDialNumber.${entity.inbound_mode}`),
      ribbonClassName: 'transparent',
      extraText: translate('Form.EntitiesFields.is_active'),
      extraClassName: active ? 'success' : 'danger',
    }
  }

  if (isBlockedPhoneNumberListEntity(entity)) {
    const active = asBool(entity.is_active)
    return {
      ribbonText: translate('Form.EntitiesFields.is_active'),
      ribbonClassName: active ? 'success' : 'danger',
    }
  }

  return null
}
