import type { ReactNode } from 'react'

export type ListCardSkeletonOptions = {
  /** Footer action circles (matches `actionIndexes.length`). */
  actionCount?: number
  /**
   * `IncludedEmployees` avatar circles.
   * 0 — no avatars (OperatorProfile, PhoneNumber, …).
   * 1 — WorkTimeRange; 3–4 — Project / Direction / Task.
   */
  employeeCount?: number
  /**
   * Progress bar + segmented metric strip (task completion %).
   * Default: `true` when `employeeCount >= 2` (workflow cards), else `false`.
   */
  showProgress?: boolean
}

/**
 * List-card loading skeleton for `DefaultCard`.
 * Shape must track the real `FormContent` — update when the card layout changes.
 *
 * - **Workflow** (Direction/Project/Task): progress + avatars + many actions.
 * - **Compact** (OperatorProfile, telephony, companies, profiles): title/body/date + actions only.
 * - **WTR**: compact tags + one avatar (`employeeCount: 1`, `showProgress: false`).
 */
export const formSkeleton = (
  actionCountOrOptions: number | ListCardSkeletonOptions = 4,
  employeeCountArg = 4
) => {
  const options: ListCardSkeletonOptions =
    typeof actionCountOrOptions === 'number'
      ? { actionCount: actionCountOrOptions, employeeCount: employeeCountArg }
      : actionCountOrOptions

  const actionCount = options.actionCount ?? 4
  const employeeCount = Math.max(0, options.employeeCount ?? 4)
  const showProgress = options.showProgress ?? employeeCount >= 2

  const skeletonElements: ReactNode[] = []

  // Header: title + ribbon/extra
  skeletonElements.push(
    <rect key={1} x='2%' y='7.24%' rx='6' ry='6' width='70%' height='12' />
  )
  skeletonElements.push(
    <rect key={2} x='75%' y='7.24%' rx='6' ry='6' width='23%' height='12' />
  )

  if (showProgress) {
    skeletonElements.push(
      <rect key={3} x='2%' y='29.47%' rx='6' ry='6' width='96%' height='12' />
    )
    skeletonElements.push(
      <rect key={4} x='2%' y='38.15%' rx='1' ry='1' width='16%' height='12' />
    )
    skeletonElements.push(
      <rect key={5} x='20%' y='38.15%' rx='1' ry='1' width='18%' height='12' />
    )
    skeletonElements.push(
      <rect key={6} x='40%' y='38.15%' rx='1' ry='1' width='18%' height='12' />
    )
    skeletonElements.push(
      <rect key={7} x='60%' y='38.15%' rx='1' ry='1' width='18%' height='12' />
    )
    skeletonElements.push(
      <rect key={8} x='80%' y='38.15%' rx='1' ry='1' width='18%' height='12' />
    )
    skeletonElements.push(
      <rect key={9} x='2%' y='53.75%' rx='6' ry='6' width='88%' height='8' />
    )
    skeletonElements.push(
      <rect key={10} x='92%' y='53.75%' rx='6' ry='6' width='6%' height='8' />
    )
  } else if (employeeCount === 1) {
    // WorkTimeRange: metric tags + date, then single avatar
    skeletonElements.push(
      <rect key={3} x='2%' y='28%' rx='6' ry='6' width='30%' height='14' />
    )
    skeletonElements.push(
      <rect key={4} x='36%' y='28%' rx='6' ry='6' width='26%' height='14' />
    )
    skeletonElements.push(
      <rect key={5} x='2%' y='44%' rx='10' ry='10' width='55%' height='14' />
    )
    skeletonElements.push(
      <rect key={6} x='2%' y='56%' rx='10' ry='10' width='40%' height='14' />
    )
  } else {
    // Compact (OperatorProfile / telephony / company / profile): h2, p, date tag
    skeletonElements.push(
      <rect key={3} x='2%' y='28%' rx='6' ry='6' width='72%' height='14' />
    )
    skeletonElements.push(
      <rect key={4} x='2%' y='42%' rx='6' ry='6' width='48%' height='12' />
    )
    skeletonElements.push(
      <rect key={5} x='2%' y='56%' rx='10' ry='10' width='42%' height='14' />
    )
  }

  for (let i = 0; i < employeeCount; i++) {
    skeletonElements.push(
      <circle
        key={i + 1000}
        cx={i === 0 ? 18 + 10 : 10 + 18 + 18 * 2 * i}
        cy={showProgress ? '69.36%' : '69%'}
        r='18'
      />
    )
  }

  for (let i = 0; i < actionCount; i++) {
    const cx =
      actionCount === 1 ? '50%' : `${10 + (80 * i) / (actionCount - 1)}%`
    skeletonElements.push(<circle key={28 + i} cx={cx} cy='90.17%' r='18' />)
  }

  return skeletonElements
}
