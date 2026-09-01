import "./index.css";
import { Composition } from "remotion";
import { Dashboard } from "./Dashboard";
import { BarChart } from "./BarChart";
import { PieChart } from "./PieChart";
import { LineChart } from "./LineChart";
import { NumberCounter } from "./NumberCounter";

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

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Dashboard"
        component={Dashboard}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="BarChart"
        component={() => (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#0f0f1a",
              padding: 40,
            }}
          >
            <BarChart data={revenueData} title="Monthly Revenue" maxValue={80000} />
          </div>
        )}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="PieChart"
        component={() => (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#0f0f1a",
              padding: 40,
            }}
          >
            <PieChart data={expenseData} title="Expense Breakdown" />
          </div>
        )}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="LineChart"
        component={() => (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#0f0f1a",
              padding: 40,
            }}
          >
            <LineChart data={stockData} title="Stock Performance" />
          </div>
        )}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="NumberCounter"
        component={() => (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#0f0f1a",
              padding: 40,
            }}
          >
            <NumberCounter
              value={185000}
              label="Net Profit"
              color="#00d4aa"
              startFrame={0}
              duration={60}
            />
          </div>
        )}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
