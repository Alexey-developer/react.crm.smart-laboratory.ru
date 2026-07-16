import type { TCurrency } from '@api/models/currency/type/TCurrency'
import type { TFinancialProjection } from '@api/models/financialProjection/type/TFinancialProjection'
import { convert2string } from '@utils/helpers'

export type TProjectionMoneyField = 'total_costs_auto' | 'total_penalty_funds'

/** Billing-contour amount (single currency). */
export const formatBillingMoney = (
  amount: number,
  currency?: TCurrency | null,
  suffix = ''
): string => convert2string(amount, `${currency?.symbol ?? ''}${suffix}`.trimEnd())

/** Payroll costs/penalties: one amount per currency, never summed across FX. */
export const formatProjectionMoney = (
  projections: TFinancialProjection[] | undefined,
  field: TProjectionMoneyField,
  fallbackSymbol = ''
): string => {
  if (!projections?.length) {
    return convert2string(0, fallbackSymbol)
  }

  return projections
    .map((projection) =>
      convert2string(
        Number(projection[field] ?? 0),
        projection.currency?.symbol ?? fallbackSymbol
      )
    )
    .join(' · ')
}

/**
 * Auto costs − billing costs only when a single projection matches billing currency.
 * Otherwise show payroll costs and billing costs separately (no false FX diff).
 */
export const formatCostsAutoVsBilling = (
  projections: TFinancialProjection[] | undefined,
  billingCosts: number,
  billingCurrency?: TCurrency | null
): string => {
  const billingSymbol = billingCurrency?.symbol ?? ''
  const payrollPart = formatProjectionMoney(projections, 'total_costs_auto', billingSymbol)
  const billingPart = formatBillingMoney(billingCosts, billingCurrency)

  const matching =
    projections?.length === 1 &&
    billingCurrency != null &&
    projections[0].currency_id === billingCurrency.id
      ? projections[0]
      : null

  if (!matching) {
    return `${payrollPart} / ${billingPart}`
  }

  const auto = Number(matching.total_costs_auto ?? 0)
  return (
    convert2string(auto, `${billingSymbol} - `) +
    convert2string(billingCosts, `${billingSymbol} = `) +
    convert2string(auto - billingCosts, billingSymbol)
  )
}

export const formatIncomeToCostRatio = (
  incomes: number,
  projections: TFinancialProjection[] | undefined
): string => {
  if (projections?.length !== 1) {
    return '—'
  }

  const costsAuto = Number(projections[0].total_costs_auto ?? 0)
  if (!costsAuto) {
    return '—'
  }

  return (incomes / costsAuto).toFixed(2)
}
