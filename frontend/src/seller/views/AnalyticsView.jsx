import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 120000, orders: 30, customers: 12 },
  { month: "Feb", revenue: 220000, orders: 52, customers: 21 },
  { month: "Mar", revenue: 180000, orders: 41, customers: 18 },
  { month: "Apr", revenue: 340000, orders: 78, customers: 35 },
  { month: "May", revenue: 410000, orders: 96, customers: 48 },
  { month: "Jun", revenue: 520000, orders: 120, customers: 60 },
];

export default function AnalyticsView() {
  const totalRevenue = data.reduce((a, b) => a + b.revenue, 0);
  const totalOrders = data.reduce((a, b) => a + b.orders, 0);
  const totalCustomers = data.reduce((a, b) => a + b.customers, 0);

  return (
    <div className="px-8 pb-16">

      {/* HEADER */}
      <h1 className="text-2xl font-semibold my-8">Analytics</h1>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <StatCard title="Total Revenue" value={`RWF ${totalRevenue.toLocaleString()}`} />
        <StatCard title="Orders" value={totalOrders} />
        <StatCard title="Customers" value={totalCustomers} />

      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-8">

        <ChartCard title="Revenue Trend">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data}>
              <Line type="monotone" dataKey="revenue" strokeWidth={3} />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Orders Trend">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data}>
              <Line type="monotone" dataKey="orders" strokeWidth={3} />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Customer Growth">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data}>
              <Line type="monotone" dataKey="customers" strokeWidth={3} />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>
    </div>
  );
}








function StatCard({ title, value }) {
  return (
    <div className="bg-zinc-900/20 border border-zinc-800 rounded-3xl p-6">
      <p className="text-xs text-zinc-500">{title}</p>
      <h2 className="text-2xl font-semibold mt-2">{value}</h2>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-zinc-900/20 border border-zinc-800 rounded-3xl p-6">
      <h3 className="text-sm mb-4 text-zinc-400">{title}</h3>
      {children}
    </div>
  );
}
