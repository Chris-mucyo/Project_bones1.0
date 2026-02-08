import StatBubble from "../components/seller/analytics/StatBubble";
import RevenueChart from "../components/seller/analytics/RevenueChart";
import OrdersChart from "../components/seller/analytics/OrdersChart";
import TrafficSources from "../components/seller/analytics/TrafficSources";
import TopProducts from "../components/seller/analytics/TopProducts";

export default function AnalyticsView() {
  return (
    <div className="p-6 text-white space-y-6">

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBubble title="Revenue Today" value="$320" />
        <StatBubble title="Orders" value="18" />
        <StatBubble title="Visitors" value="1,204" />
        <StatBubble title="Conversion" value="3.4%" />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <RevenueChart />
        <OrdersChart />
        <TrafficSources />
        <TopProducts />
      </div>
    </div>
  );
}
