interface SparklineProps {
  data: number[]
  positive: boolean
  width?: number
  height?: number
}

export default function Sparkline({ data, positive, width = 80, height = 32 }: SparklineProps) {
  if (!data || data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * height
    return `${x},${y}`
  })

  const pathD = `M ${points.join(' L ')}`
  const color = positive ? '#05B169' : '#CF2030'

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <path d={pathD} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
