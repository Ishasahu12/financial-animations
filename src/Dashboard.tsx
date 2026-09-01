import { Sequence, AbsoluteFill } from "remotion";
import { BarChart } from "./BarChart";
import { PieChart } from "./PieChart";
import { LineChart } from "./LineChart";
import { NumberCounter } from "./NumberCounter";
import { AnimatedCard } from "./AnimatedCard";
import { SceneTransition } from "./SceneTransition";

const revenueData = [
  { label: "Jan", value: 45000, color: "#00d4aa" },
  { label: "Feb", value: 52000, color: "#00b894" },
  { label: "Mar", value: 61000, color: "#00a381" },
  { label: "Apr", value: 58000, color: "#008f6e" },
  { label: "May", value: 72000, color: "#007d5c" },
];

const expenseData = [
  { label: "Operations", value: 35000, color: "#ff6b6b" },
  { label: "Marketing", value: 28000, color: "#ffa502" },
  { label: "R&D", value: 22000, color: "#a29bfe" },
  { label: "Admin", value: 15000, color: "#74b9ff" },
];

const stockData = [
  { x: 0, y: 100 },
  { x: 1, y: 120 },
  { x: 2, y: 115 },
  { x: 3, y: 140 },
  { x: 4, y: 135 },
  { x: 5, y: 160 },
  { x: 6, y: 155 },
  { x: 7, y: 180 },
  { x: 8, y: 175 },
  { x: 9, y: 200 },
];

export const Dashboard: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f1a",
        padding: 40,
      }}
    >
      <Sequence from={0} durationInFrames={90}>
        <SceneTransition transitionType="fade">
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 40,
            }}
          >
            <AnimatedCard delay={0} direction="up">
              <div
                style={{
                  display: "flex",
                  gap: 30,
                  justifyContent: "center",
                }}
              >
                <NumberCounter
                  value={285000}
                  label="Total Revenue"
                  color="#00d4aa"
                  startFrame={15}
                  duration={60}
                />
                <NumberCounter
                  value={100000}
                  label="Total Expenses"
                  color="#ff6b6b"
                  startFrame={25}
                  duration={60}
                />
                <NumberCounter
                  value={185000}
                  label="Net Profit"
                  color="#a29bfe"
                  startFrame={35}
                  duration={60}
                />
              </div>
            </AnimatedCard>
          </AbsoluteFill>
        </SceneTransition>
      </Sequence>

      <Sequence from={90} durationInFrames={120}>
        <SceneTransition transitionType="slide">
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 40,
            }}
          >
            <AnimatedCard delay={0} direction="left">
              <BarChart
                data={revenueData}
                title="Monthly Revenue"
                maxValue={80000}
              />
            </AnimatedCard>
          </AbsoluteFill>
        </SceneTransition>
      </Sequence>

      <Sequence from={210} durationInFrames={120}>
        <SceneTransition transitionType="scale">
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 40,
            }}
          >
            <AnimatedCard delay={0} direction="right">
              <PieChart data={expenseData} title="Expense Breakdown" />
            </AnimatedCard>
          </AbsoluteFill>
        </SceneTransition>
      </Sequence>

      <Sequence from={330} durationInFrames={120}>
        <SceneTransition transitionType="fade">
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 40,
            }}
          >
            <AnimatedCard delay={0} direction="up">
              <LineChart
                data={stockData}
                title="Stock Performance"
                color="#00d4aa"
              />
            </AnimatedCard>
          </AbsoluteFill>
        </SceneTransition>
      </Sequence>
    </AbsoluteFill>
  );
};
