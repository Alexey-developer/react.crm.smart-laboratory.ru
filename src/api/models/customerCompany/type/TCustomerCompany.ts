import { TEntityBaseModel } from '@api/common/types/TEntityBaseModel'
import { TCurrency } from '@api/models/currency/type/TCurrency'
import { TOrganizationalLegalForm } from '@api/models/organizationalLegalForm/type/TOrganizationalLegalForm'

export type TCustomerCompany = TEntityBaseModel & {
  name: string
  description: string | null
  INN: string
  bank: string | null
  checking_account: string | null
  correspondent_account: string | null
  BIK: string | null
  country: string
  city: string | null
  street: string | null
  house_number: string | null
  office_number: string | null
  index: string | null
  organizational_legal_form_id: number
  currency_id: number
  currency?: TCurrency
  organizational_legal_form?: TOrganizationalLegalForm
}
