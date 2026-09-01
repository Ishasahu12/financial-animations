import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { evolvePath } from "@remotion/paths";

type DataPoint = {
  x: number;
  y: number;
};

type LineChartProps = {
  data: DataPoint[];
  title: string;
  color?: string;
  width?: number;
  height?: number;
};

const generateLinePath = (points: DataPoint[], width: number, height: number): string => {
  if (points.length < 2) return "";

  const padding = 60;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const minX = Math.min(...points.map((p) => p.x));
  const maxX = Math.max(...points.map((p) => p.x));
  const minY = Math.min(...points.map((p) => p.y));
  const maxY = Math.max(...points.map((p) => p.y));

  const normalizedPoints = points.map((p) => ({
    x: padding + ((p.x - minX) / (maxX - minX)) * chartWidth,
    y: height - padding - ((p.y - minY) / (maxY - minY)) * chartHeight,
  }));

  return normalizedPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
};

export const LineChart: React.FC<LineChartProps> = ({
  data,
  title,
  color = "#00d4aa",
  width = 800,
  height = 400,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const path = generateLinePath(data, width, height);

  const progress = interpolate(frame, [0, 2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const { strokeDasharray, strokeDashoffset } = evolvePath(progress, path);

  const glowOpacity = interpolate(frame, [2 * fps, 2.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const padding = 60;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const minX = Math.min(...data.map((p) => p.x));
  const maxX = Math.max(...data.map((p) => p.x));
  const minY = Math.min(...data.map((p) => p.y));
  const maxY = Math.max(...data.map((p) => p.y));

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
    const y = height - padding - ratio * chartHeight;
    const value = Math.round(minY + ratio * (maxY - minY));
    return { y, value };
  });

  const labels = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
    const x = padding + ratio * chartWidth;
    const value = Math.round(minX + ratio * (maxX - minX));
    return { x, value };
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 40,
        backgroundColor: "#1a1a2e",
        borderRadius: 20,
        width: "100%",
        height: "100%",
      }}
    >
      <h2
        style={{
          color: "#ffffff",
          fontSize: 32,
          marginBottom: 40,
          fontFamily: "Arial, sans-serif",
          fontWeight: 600,
        }}
      >
        {title}
      </h2>
      <svg width={width} height={height}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity={0.6} />
            <stop offset="100%" stopColor={color} stopOpacity={1} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {gridLines.map((line, i) => (
          <g key={`grid-${i}`}>
            <line
              x1={padding}
              y1={line.y}
              x2={width - padding}
              y2={line.y}
              stroke="#333355"
              strokeWidth={1}
              strokeDasharray="5,5"
            />
            <text
              x={padding - 10}
              y={line.y + 4}
              fill="#8888aa"
              fontSize={12}
              textAnchor="end"
              fontFamily="Arial, sans-serif"
            >
              ${line.value.toLocaleString()}
            </text>
          </g>
        ))}

        {labels.map((label, i) => (
          <text
            key={`label-${i}`}
            x={label.x}
            y={height - padding + 30}
            fill="#8888aa"
            fontSize={12}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
          >
            {label.value}
          </text>
        ))}

        <path
          d={path}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth={4}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          opacity={glowOpacity}
        />

        {data.map((point, i) => {
          const pointProgress = interpolate(
            progress,
            [i / data.length, (i + 1) / data.length],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          const px =
            padding + ((point.x - minX) / (maxX - minX)) * chartWidth;
          const py =
            height - padding - ((point.y - minY) / (maxY - minY)) * chartHeight;

          return (
            <circle
              key={i}
              cx={px}
              cy={py}
              r={6 * pointProgress}
              fill={color}
              stroke="#1a1a2e"
              strokeWidth={2}
              opacity={pointProgress}
            />
          );
        })}
      </svg>
    </div>
  );
};
