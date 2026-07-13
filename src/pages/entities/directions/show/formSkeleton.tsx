export const formSkeletonTop = () => {
  const skeletonElements = []
  skeletonElements.push(
    <rect key={1} x='.5%' y='0' rx='8' ry='8' width='24%' height='95' />
  )
  skeletonElements.push(
    <rect key={2} x='25.5%' y='0' rx='8' ry='8' width='24%' height='95' />
  )
  skeletonElements.push(
    <rect key={3} x='50.5%' y='0' rx='8' ry='8' width='24%' height='95' />
  )
  skeletonElements.push(
    <rect key={4} x='75.5%' y='0' rx='8' ry='8' width='24%' height='95' />
  )

  return skeletonElements
}
export const formSkeletonBottom = () => {
  const skeletonElements = []
  skeletonElements.push(
    <rect key={1} x='.5%' y='8' rx='8' ry='8' width='99%' height='46' />
  )
  skeletonElements.push(
    <rect key={2} x='.5%' y='70' rx='8' ry='8' width='99%' height='46' />
  )
  skeletonElements.push(
    <rect key={3} x='.5%' y='132' rx='8' ry='8' width='99%' height='46' />
  )
  skeletonElements.push(
    <rect key={4} x='.5%' y='194' rx='8' ry='8' width='99%' height='46' />
  )
  skeletonElements.push(
    <rect key={5} x='.5%' y='256' rx='8' ry='8' width='99%' height='46' />
  )
  skeletonElements.push(
    <rect key={6} x='.5%' y='318' rx='8' ry='8' width='99%' height='46' />
  )

  return skeletonElements
}
