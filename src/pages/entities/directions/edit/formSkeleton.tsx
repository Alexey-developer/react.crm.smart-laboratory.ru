export const formSkeleton = () => {
  const skeletonElements = []

  for (let i = 0; i < 12; i++) {
    skeletonElements.push(
      <rect
        key={`label-${i}`}
        x='0'
        y={String(i * 72)}
        rx='6'
        ry='6'
        width='20%'
        height='22'
      />
    )
    skeletonElements.push(
      <rect
        key={`field-${i}`}
        x='0'
        y={String(i * 72 + 30)}
        rx='6'
        ry='6'
        width='100%'
        height={i === 7 || i === 8 || i === 9 ? '53' : '32'}
      />
    )
  }

  skeletonElements.push(
    <rect key='submit' x='0' y='880' rx='6' ry='6' width='15%' height='32' />
  )

  return skeletonElements
}
