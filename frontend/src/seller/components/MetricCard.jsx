import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function MetricCard({ label, value, growth, isUp }) {
  return (
    <div className="group flex flex-col">
      <p className="text-[9px] font-semibold text-zinc-600 uppercase tracking-wider mb-2">
        {label}
      </p>

      <div className="flex items-end gap-2">
        <h3 className="text-3xl font-semibold tracking-tight">{value}</h3>

        <div
          className={`flex items-center text-[10px] font-semibold mb-1 ${
            isUp ? "text-green-400" : "text-red-400"
          }`}
        >
          {isUp ? (
            <ArrowUpRight size={12} />
          ) : (
            <ArrowDownRight size={12} />
          )}
          {growth}
        </div>
      </div>

      <div className="h-[2px] w-full bg-zinc-900 mt-4 overflow-hidden rounded-full">
        <div className="h-full bg-zinc-700 group-hover:bg-green-500 transition-all duration-700 w-1/3 group-hover:w-full" />
      </div>
    </div>
  );
}
