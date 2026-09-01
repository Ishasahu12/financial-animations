import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

type SegmentData = {
  label: string;
  value: number;
  color: string;
};

type PieChartProps = {
  data: SegmentData[];
  title: string;
};

export const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const radius = 150;
  const strokeWidth = 60;
  const center = 200;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const progress = interpolate(frame, [0, 2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  let accumulatedOffset = 0;

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
      <div style={{ position: "relative" }}>
        <svg width={center * 2} height={center * 2}>
          {data.map((segment, i) => {
            const segmentLength = (segment.value / total) * circumference;
            const segmentProgress = interpolate(
              progress,
              [i / data.length, (i + 1) / data.length],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );

            const offset = interpolate(
              segmentProgress,
              [0, 1],
              [segmentLength, 0]
            );

            const rotation = (accumulatedOffset / total) * 360 - 90;
            accumulatedOffset += segment.value;

            return (
              <circle
                key={segment.label}
                r={radius}
                cx={center}
                cy={center}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${segmentLength} ${circumference}`}
                strokeDashoffset={offset}
                transform={`rotate(${rotation} ${center} ${center})`}
                style={{ filter: `drop-shadow(0 0 10px ${segment.color}60)` }}
              />
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontSize: 36,
              fontWeight: "bold",
              fontFamily: "Arial, sans-serif",
            }}
          >
            ${total.toLocaleString()}
          </div>
          <div
            style={{
              color: "#8888aa",
              fontSize: 14,
              fontFamily: "Arial, sans-serif",
            }}
          >
            Total
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 30,
          marginTop: 40,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {data.map((segment, i) => {
          const legendOpacity = interpolate(
            frame,
            [2 * fps + i * 5, 2 * fps + i * 5 + 10],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          return (
            <div
              key={segment.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                opacity: legendOpacity,
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 4,
                  backgroundColor: segment.color,
                }}
              />
              <span
                style={{
                  color: "#ffffff",
                  fontSize: 16,
                  fontFamily: "Arial, sans-serif",
                }}
              >
                {segment.label}: {((segment.value / total) * 100).toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
