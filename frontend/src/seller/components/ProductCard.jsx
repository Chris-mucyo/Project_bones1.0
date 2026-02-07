import { Package, MoreVertical } from "lucide-react";

export default function ProductCard({ item }) {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-5 group hover:border-green-500/20 transition-all">

      <div className="flex justify-between items-start mb-4">
        <div className="h-10 w-10 bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-500 group-hover:text-green-400 transition">
          <Package size={20} />
        </div>

        <button className="text-zinc-600 hover:text-white transition">
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-zinc-200 truncate">
          {item.name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white">
            RWF {item.price}
          </span>

          <span
            className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${
              item.status === "Live"
                ? "bg-green-500/10 text-green-400"
                : "bg-zinc-800 text-zinc-500"
            }`}
          >
            {item.status}
          </span>
        </div>
      </div>

    </div>
  );
}
