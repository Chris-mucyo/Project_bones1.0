import React from "react";
import {
  LayoutDashboard,
  Box,
  BarChart,
  Users2,
  Settings2,
  Bell,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Search
} from "lucide-react";

export default function SellerDashboard() {
  return (
    <div className="flex h-screen bg-black text-zinc-200 overflow-hidden font-sans">

      {/* SIDEBAR */}
      <aside className="w-20 lg:w-60 border-r border-green-900/20 flex flex-col items-center lg:items-start py-6 transition-all">

        {/* LOGO */}
        <div className="px-6 mb-10">
          <h1 className="text-lg font-semibold tracking-tight text-zinc-100 hidden lg:block">
            <span className="text-green-400">Shop</span>Hub
          </h1>
          <h1 className="text-green-400 font-bold text-sm lg:hidden">
            SH
          </h1>
        </div>

        <nav className="w-full px-4 space-y-5">
          <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active />
          <NavItem icon={<Box size={18} />} label="Products" />
          <NavItem icon={<BarChart size={18} />} label="Analytics" />
          <NavItem icon={<Users2 size={18} />} label="Customers" />
          <NavItem icon={<Settings2 size={18} />} label="Settings" />
        </nav>

        <div className="mt-auto px-6 w-full">
          <div className="p-3 bg-zinc-900/60 rounded-2xl border border-green-900/20 hidden lg:block">
            <p className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">
              Plan
            </p>
            <p className="text-xs font-semibold text-green-400">
              Pro Merchant
            </p>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto relative">

        {/* GREEN GLOW */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-green-500/10 blur-[140px] -z-10 pointer-events-none" />

        {/* TOP BAR */}
        <header className="px-8 py-5 flex justify-between items-center sticky top-0 bg-black/70 backdrop-blur-md z-10 border-b border-green-900/20">

          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-green-400 transition"
              size={14}
            />
            <input
              placeholder="Search..."
              className="bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-9 pr-5 text-xs w-56 focus:w-72 transition-all outline-none focus:border-green-500/40"
            />
          </div>

          <div className="flex items-center gap-5">
            <button className="text-zinc-500 hover:text-green-400 transition relative">
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full" />
            </button>

            <div className="h-6 w-[1px] bg-zinc-800" />

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-zinc-400">
                Chris Hughes
              </span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-zinc-700" />
            </div>
          </div>
        </header>

        {/* CONTENT */}
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

            <button className="bg-green-500 text-black px-5 py-2 rounded-full font-semibold text-xs flex items-center gap-2 hover:bg-green-400 transition active:scale-95">
              <Plus size={14} /> New Product
            </button>
          </div>

          {/* METRICS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MetricCard label="Revenue" value="845k" growth="+12%" isUp />
            <MetricCard label="Orders" value="1,429" growth="+8%" isUp />
            <MetricCard label="Returns" value="12" growth="-2%" />
          </div>

          {/* ACTIVITY */}
          <div className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold tracking-tight">
                Performance Stream
              </h2>

              <button className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider hover:text-green-400 transition">
                Full Report
              </button>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-1 h-80 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <BarChart size={80} strokeWidth={1} />
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}


/* COMPONENTS */

function NavItem({ icon, label, active }) {
  return (
    <div className="flex items-center gap-3 px-2 py-1 cursor-pointer group relative">
      <span className={`${active ? "text-green-400" : "text-zinc-600 group-hover:text-zinc-200"} transition`}>
        {icon}
      </span>

      <span className={`text-xs font-medium lg:block hidden ${active ? "text-zinc-100" : "text-zinc-600 group-hover:text-zinc-200"}`}>
        {label}
      </span>

      {active && (
        <div className="absolute -left-4 w-1 h-5 bg-green-500 rounded-r-full shadow-[4px_0_10px_rgba(34,197,94,0.4)]" />
      )}
    </div>
  );
}

function MetricCard({ label, value, growth, isUp }) {
  return (
    <div className="group flex flex-col">
      <p className="text-[9px] font-semibold text-zinc-600 uppercase tracking-wider mb-2">
        {label}
      </p>

      <div className="flex items-end gap-2">
        <h3 className="text-3xl font-semibold tracking-tight">
          {value}
        </h3>

        <div className={`flex items-center text-[10px] font-semibold mb-1 ${isUp ? "text-green-400" : "text-red-400"}`}>
          {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {growth}
        </div>
      </div>

      <div className="h-[2px] w-full bg-zinc-900 mt-4 overflow-hidden">
        <div className="h-full bg-zinc-700 group-hover:bg-green-500 transition-all duration-700 w-1/3 group-hover:w-full" />
      </div>
    </div>
  );
}
