export type TCurrentUserParams = {
  /** Country calling code (UI). Backend builds E.164 from prefix + phone. */
  prefix: number
  /** National number / mask value from PhoneInput. */
  phone: string
  password: string
  /** crm → worker_profile phones; cabinet → customer_profile phones. */
  context?: 'crm' | 'cabinet'
}
