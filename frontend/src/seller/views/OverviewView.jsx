import { Plus, BarChart } from "lucide-react";
import MetricCard from "../components/MetricCard";

export default function OverviewView() {
  return (
    <div className="px-8 pb-16">

      <div className="flex justify-between items-end my-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Afternoon, <span className="text-green-400">Chris</span>
          </h1>
          <p className="text-zinc-500 text-xs mt-1">
            Your marketplace performance today
          </p>
        </div>

        <button className="bg-green-500 text-black px-5 py-2 rounded-full font-semibold text-xs flex items-center gap-2 hover:bg-green-400 transition">
          <Plus size={14} /> New Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MetricCard label="Revenue" value="845k" growth="+12%" isUp />
        <MetricCard label="Orders" value="1,429" growth="+8%" isUp />
        <MetricCard label="Returns" value="12" growth="-2%" />
      </div>

      <div className="mt-14">
        <div className="flex justify-between mb-6">
          <h2 className="text-sm font-semibold">Performance Stream</h2>
          <button className="text-[10px] uppercase font-semibold text-zinc-500 hover:text-green-400">
            Full Report
          </button>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl h-80 flex items-center justify-center opacity-20">
          <BarChart size={80} strokeWidth={1} />
        </div>
      </div>

    </div>
  );
}
