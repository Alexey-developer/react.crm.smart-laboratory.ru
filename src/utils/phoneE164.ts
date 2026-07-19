import type { Prefix } from '@redux/PhonePrefix/types'

/** Known country calling codes, longest first (for split). */
export const PHONE_PREFIXES: readonly Prefix[] = [994, 7]

export type PhonePrefixMeta = {
  length: number
  mask: string
  placeholder: string
}

export const PHONE_PREFIX_META: Record<Prefix, PhonePrefixMeta> = {
  7: {
    length: 10,
    mask: '(000)-000-00-00',
    placeholder: '(___)-___-__-__',
  },
  994: {
    length: 9,
    mask: '(00)-000-00-00',
    placeholder: '(__)-___-__-__',
  },
}

export const digitsOnly = (value: string | number | null | undefined): string =>
  String(value ?? '').replace(/\D/g, '')

export const composeE164 = (
  prefix: number | string,
  nationalPhone: string
): string | null => {
  const prefixDigits = digitsOnly(prefix)
  const nationalDigits = digitsOnly(nationalPhone)

  if (!prefixDigits || !nationalDigits) {
    return null
  }

  const e164 = `+${prefixDigits}${nationalDigits}`

  return isValidE164(e164) ? e164 : null
}

export const isValidE164 = (e164: string): boolean =>
  /^\+[1-9]\d{7,14}$/.test(e164)

export const splitE164 = (
  e164: string | null | undefined
): { prefix: Prefix; national: string } | null => {
  const digits = digitsOnly(e164)

  if (!digits) {
    return null
  }

  for (const prefix of PHONE_PREFIXES) {
    const prefixStr = String(prefix)
    if (!digits.startsWith(prefixStr)) {
      continue
    }

    const national = digits.slice(prefixStr.length)
    const meta = PHONE_PREFIX_META[prefix]

    if (national.length === meta.length) {
      return { prefix, national }
    }
  }

  return null
}

/** Fill PhoneInput mask `0` slots with national digits: `(966)-867-83-39`. */
export const applyPhoneMask = (national: string, mask: string): string => {
  let i = 0

  return mask.replace(/0/g, () => national[i++] ?? '')
}

/**
 * Display E.164 for UI (not for API/storage).
 * Uses the same grouping as PhoneInput masks, site-style spacing:
 * `+79668678339` → `+7 (966) 867-83-39`
 * `+994…` → `+994 (12) 345-67-89`
 */
export const formatE164Display = (
  e164: string | null | undefined
): string => {
  if (e164 == null || e164 === '') {
    return ''
  }

  const parts = splitE164(e164)

  if (!parts) {
    return isValidE164(e164) ? e164 : String(e164)
  }

  const masked = applyPhoneMask(
    parts.national,
    PHONE_PREFIX_META[parts.prefix].mask
  )
  // `(966)-867-83-39` → `(966) 867-83-39`
  const nationalDisplay = masked.replace(/\)-/, ') ')

  return `+${parts.prefix} ${nationalDisplay}`
}
