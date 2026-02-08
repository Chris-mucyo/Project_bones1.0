import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { ordersData } from "../../../data/MockAnalytics";

export default function OrdersChart() {
  return (
    <div className="bg-zinc-900 p-4 rounded-2xl h-72">
      <h3 className="mb-2 font-semibold">Orders</h3>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={ordersData}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="orders" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
