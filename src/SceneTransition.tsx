import { useCurrentFrame, interpolate, Easing } from "remotion";

type SceneTransitionProps = {
  children: React.ReactNode;
  transitionType?: "fade" | "slide" | "scale";
  duration?: number;
};

export const SceneTransition: React.FC<SceneTransitionProps> = ({
  children,
  transitionType = "fade",
  duration = 30,
}) => {
  const frame = useCurrentFrame();

  const getTransition = () => {
    switch (transitionType) {
      case "fade":
        return {
          opacity: interpolate(frame, [0, duration], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.quad),
          }),
          transform: "none",
        };
      case "slide":
        return {
          opacity: interpolate(frame, [0, duration], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `translateX(${interpolate(
            frame,
            [0, duration],
            [100, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.quad),
            }
          )}px)`,
        };
      case "scale":
        return {
          opacity: interpolate(frame, [0, duration], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `scale(${interpolate(
            frame,
            [0, duration],
            [0.8, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.quad),
            }
          )})`,
        };
    }
  };

  const transition = getTransition();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        ...transition,
      }}
    >
      {children}
    </div>
  );
};
