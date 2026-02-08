import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { trafficData } from "../../../data/MockAnalytics.js";

export default function TrafficSources() {
  return (
    <div className="bg-zinc-900 p-4 rounded-2xl h-72">
      <h3 className="mb-2 font-semibold">Traffic Sources</h3>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie data={trafficData} dataKey="value" outerRadius={80} />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
