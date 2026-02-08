import { topProducts } from "../../../data/MockAnalytics";

export default function TopProducts() {
  return (
    <div className="bg-zinc-900 rounded-2xl p-4">
      <h3 className="font-semibold mb-3">Top Products</h3>

      {topProducts.map((p, i) => (
        <div
          key={i}
          className="flex justify-between py-2 border-b border-zinc-800"
        >
          <span>{p.name}</span>
          <span className="text-zinc-400">{p.sales} sales</span>
        </div>
      ))}
    </div>
  );
}
