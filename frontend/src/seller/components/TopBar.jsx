import { Bell, Search } from "lucide-react";

export default function TopBar() {
  return (
    <header className="px-8 py-5 flex justify-between items-center sticky top-0 bg-black/70 backdrop-blur-md z-10 border-b border-green-900/20">

      {/* SEARCH */}
      <div className="relative group">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
        />
        <input
          placeholder="Search..."
          className="bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-9 pr-5 text-xs w-56 focus:w-72 outline-none"
        />
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-5">
        <button className="text-zinc-500 hover:text-green-400 transition relative">
          <Bell size={18} />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full" />
        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <span className="text-xs text-zinc-400 group-hover:text-zinc-200 transition">
            Chris Hughes
          </span>

          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-300">
            CH
          </div>
        </div>
      </div>

    </header>
  );
}
