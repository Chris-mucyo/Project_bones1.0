import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { revenueData } from "../../../data/MockAnalytics";

export default function RevenueChart() {
  return (
    <div className="bg-zinc-900 p-4 rounded-2xl h-72">
      <h3 className="mb-2 font-semibold">Revenue Trend</h3>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={revenueData}>
          <XAxis dataKey="day" />
          <Tooltip />
          <Line type="monotone" dataKey="value" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
