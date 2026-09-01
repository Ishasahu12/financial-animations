import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

type AnimatedCardProps = {
  children: React.ReactNode;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
};

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  direction = "up",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideProgress = spring({
    frame,
    fps,
    delay,
    config: { damping: 200 },
  });

  const getTranslate = () => {
    const distance = 100;
    switch (direction) {
      case "left":
        return { x: interpolate(slideProgress, [0, 1], [-distance, 0]), y: 0 };
      case "right":
        return { x: interpolate(slideProgress, [0, 1], [distance, 0]), y: 0 };
      case "up":
        return { x: 0, y: interpolate(slideProgress, [0, 1], [distance, 0]) };
      case "down":
        return { x: 0, y: interpolate(slideProgress, [0, 1], [-distance, 0]) };
    }
  };

  const translate = getTranslate();
  const opacity = interpolate(slideProgress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translate(${translate.x}px, ${translate.y}px)`,
        opacity,
      }}
    >
      {children}
    </div>
  );
};
