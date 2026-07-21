export const formSkeleton = () => {
  const elements = []

  for (let i = 0; i < 3; i++) {
    elements.push(
      <rect
        key={`thumb-${i}`}
        x={i * 128}
        y={0}
        rx='8'
        ry='8'
        width='120'
        height='72'
      />
    )
  }

  for (let i = 0; i < 3; i++) {
    const y = 92 + i * 56
    elements.push(
      <rect
        key={`icon-${i}`}
        x={0}
        y={y}
        rx='8'
        ry='8'
        width='36'
        height='36'
      />
    )
    elements.push(
      <rect
        key={`title-${i}`}
        x={48}
        y={y + 4}
        rx='3'
        ry='3'
        width='220'
        height='10'
      />
    )
    elements.push(
      <rect
        key={`meta-${i}`}
        x={48}
        y={y + 22}
        rx='3'
        ry='3'
        width='140'
        height='8'
      />
    )
    elements.push(
      <rect
        key={`action-${i}`}
        x={400}
        y={y + 10}
        rx='3'
        ry='3'
        width='64'
        height='12'
      />
    )
  }

  return elements
}
