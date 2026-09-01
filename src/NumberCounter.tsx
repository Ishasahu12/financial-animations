import { useCurrentFrame, interpolate, Easing } from "remotion";

type NumberCounterProps = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  color?: string;
  startFrame?: number;
  duration?: number;
};

export const NumberCounter: React.FC<NumberCounterProps> = ({
  value,
  label,
  prefix = "$",
  suffix = "",
  color = "#00d4aa",
  startFrame = 0,
  duration = 60,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  const currentValue = Math.round(progress * value);

  const containerOpacity = interpolate(
    frame,
    [startFrame, startFrame + 15],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const scale = interpolate(
    frame,
    [startFrame, startFrame + 20],
    [0.8, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 40,
        backgroundColor: "#1a1a2e",
        borderRadius: 20,
        opacity: containerOpacity,
        transform: `scale(${scale})`,
        boxShadow: `0 10px 40px ${color}20`,
        border: `1px solid ${color}30`,
      }}
    >
      <div
        style={{
          color: "#8888aa",
          fontSize: 18,
          fontFamily: "Arial, sans-serif",
          marginBottom: 10,
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: color,
          fontSize: 64,
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
          textShadow: `0 0 30px ${color}40`,
        }}
      >
        {prefix}
        {currentValue.toLocaleString()}
        {suffix}
      </div>
      {progress >= 1 && (
        <div
          style={{
            color: "#00ff88",
            fontSize: 16,
            fontFamily: "Arial, sans-serif",
            marginTop: 10,
            opacity: interpolate(
              frame,
              [startFrame + duration, startFrame + duration + 10],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            ),
          }}
        >
          +12.5% from last month
        </div>
      )}
    </div>
  );
};
