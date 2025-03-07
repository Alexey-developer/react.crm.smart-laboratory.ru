export const formSkeleton = () => {
  const skeletonElements = []
  //   let height = 75
  skeletonElements.push(
    <rect key={1} x='2%' y='7.24%' rx='6' ry='6' width='70%' height='12' />
  )
  skeletonElements.push(
    <rect key={2} x='75%' y='7.24%' rx='6' ry='6' width='23%' height='12' />
  )
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

  for (let i = 0; i < 4; i++) {
    skeletonElements.push(
      <circle
        key={i + 1000}
        cx={i === 0 ? 18 + 10 : 10 + 18 + 18 * 2 * i}
        cy='69.36%'
        r='18'
      />
    )
  }
  skeletonElements.push(<circle key={25} cx={'10%'} cy='90.17%' r='18' />)
  skeletonElements.push(<circle key={26} cx={'38%'} cy='90.17%' r='18' />)
  skeletonElements.push(<circle key={27} cx={'62%'} cy='90.17%' r='18' />)
  skeletonElements.push(<circle key={28} cx={'90%'} cy='90.17%' r='18' />)

  return skeletonElements
}
