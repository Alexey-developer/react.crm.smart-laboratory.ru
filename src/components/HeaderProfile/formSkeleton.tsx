export const formSkeleton = () => {
  const skeletonElements = []
  let height = 75
  skeletonElements.push(
    <rect key={1} x='90' y='7' rx='3' ry='3' width='135' height='8' />
  )
  skeletonElements.push(
    <rect key={2} x='90' y='25' rx='3' ry='3' width='90' height='8' />
  )
  skeletonElements.push(<circle key={3} cx='30' cy='20' r='20' />)
  for (let i = 0; i < 6; i++) {
    if (i === 2 || i === 5) {
      height += 27
    }
    skeletonElements.push(
      <rect
        key={i + 50}
        x='35'
        y={height}
        rx='3'
        ry='3'
        width='185'
        height='6'
      />
    )
    skeletonElements.push(
      <circle key={i + 100} cx='20' cy={height + 2} r='10' />
    )
    height += 27
  }
  return skeletonElements
}
