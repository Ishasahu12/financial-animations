import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

type BarData = {
  label: string;
  value: number;
  color: string;
};

type BarChartProps = {
  data: BarData[];
  title: string;
  maxValue?: number;
};

const STAGGER_DELAY = 5;

export const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  maxValue,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const max = maxValue || Math.max(...data.map((d) => d.value));

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
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-around",
          width: "100%",
          height: 400,
          paddingBottom: 60,
          position: "relative",
        }}
      >
        {data.map((item, i) => {
          const heightProgress = spring({
            frame,
            fps,
            delay: i * STAGGER_DELAY,
            config: { damping: 200 },
          });

          const barHeight = heightProgress * (item.value / max) * 300;

          const labelOpacity = interpolate(
            frame,
            [i * STAGGER_DELAY + 15, i * STAGGER_DELAY + 25],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          return (
            <div
              key={item.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  color: "#ffffff",
                  fontSize: 18,
                  fontFamily: "Arial, sans-serif",
                  opacity: labelOpacity,
                }}
              >
                ${item.value.toLocaleString()}
              </div>
              <div
                style={{
                  width: 80,
                  height: barHeight,
                  backgroundColor: item.color,
                  borderRadius: "8px 8px 0 0",
                  boxShadow: `0 0 20px ${item.color}40`,
                }}
              />
              <div
                style={{
                  color: "#8888aa",
                  fontSize: 14,
                  fontFamily: "Arial, sans-serif",
                  position: "absolute",
                  bottom: 0,
                  transform: "translateY(30px)",
                }}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
