import {
  LayoutDashboard,
  Box,
  BarChart,
  Users2,
  Settings2
} from "lucide-react";

import NavItem from "./NavItem";

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-20 lg:w-60 border-r border-green-900/20 flex flex-col items-center lg:items-start py-6">

      <div className="px-6 mb-10">
        <h1 className="text-lg font-semibold text-zinc-100 hidden lg:block">
          <span className="text-green-400">Shop</span>Hub
        </h1>
        <h1 className="text-green-400 font-bold text-sm lg:hidden">SH</h1>
      </div>

      <nav className="w-full px-4 space-y-5">
        <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active={activeTab==="Overview"} onClick={()=>setActiveTab("Overview")}/>
        <NavItem icon={<Box size={18} />} label="Products" active={activeTab==="Products"} onClick={()=>setActiveTab("Products")}/>
        <NavItem icon={<BarChart size={18} />} label="Analytics" active={activeTab==="Analytics"} onClick={()=>setActiveTab("Analytics")}/>
        <NavItem icon={<Users2 size={18} />} label="Customers" active={activeTab==="Customers"} onClick={()=>setActiveTab("Customers")}/>
        <NavItem icon={<Settings2 size={18} />} label="Settings" active={activeTab==="Settings"} onClick={()=>setActiveTab("Settings")}/>
      </nav>

    </aside>
  );
}
