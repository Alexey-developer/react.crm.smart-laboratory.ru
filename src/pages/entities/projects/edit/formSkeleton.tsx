export const formSkeleton = () => {
  const skeletonElements = []

  skeletonElements.push(
    <rect key={1} x='0' y='0' rx='6' ry='6' width='20%' height='22' />
  )
  skeletonElements.push(
    <rect key={2} x='0' y='30' rx='6' ry='6' width='100%' height='32' />
  )

  skeletonElements.push(
    <rect key={3} x='0' y='86' rx='6' ry='6' width='20%' height='22' />
  )
  skeletonElements.push(
    <rect key={4} x='0' y='116' rx='6' ry='6' width='100%' height='32' />
  )

  skeletonElements.push(
    <rect key={5} x='0' y='172' rx='6' ry='6' width='20%' height='22' />
  )
  skeletonElements.push(
    <rect key={6} x='0' y='202' rx='6' ry='6' width='100%' height='53' />
  )

  skeletonElements.push(
    <rect key={7} x='0' y='279' rx='6' ry='6' width='15%' height='32' />
  )

  return skeletonElements
}
