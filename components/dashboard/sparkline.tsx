/**
 * Pure-SVG sparkline. Zero deps. Renders a smooth area + line.
 */
export function Sparkline({
  values,
  width = 220,
  height = 60,
  stroke = "#2563eb",
  fill = "rgba(37,99,235,0.12)",
  className,
}: {
  values: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  className?: string;
}) {
  if (!values.length) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = width / Math.max(1, values.length - 1);

  const points = values.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * height;
    return [x, y] as const;
  });

  // Smooth via simple bezier between points
  const d = points
    .map(([x, y], i, a) => {
      if (i === 0) return `M ${x},${y}`;
      const [px, py] = a[i - 1];
      const cx = (px + x) / 2;
      return `Q ${cx},${py} ${(cx + x) / 2},${(py + y) / 2} T ${x},${y}`;
    })
    .join(" ");

  const area = `${d} L ${width},${height} L 0,${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden>
      <path d={area} fill={fill} />
      <path d={d} stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
