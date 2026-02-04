import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";

export default function HomeLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    // Main Wrapper: Column layout so TopNav stays on top
    <div className="h-screen flex flex-col bg-black overflow-hidden">
      
      {/* 1. TopNav: Now spans 100% width automatically */}
      <TopNav onToggleSidebar={() => setCollapsed(!collapsed)} />

      {/* 2. Lower Area: Sidebar + Content */}
      <div className="flex flex-1 min-h-0">
        
        {/* Sidebar: Sits below the TopNav */}
        <SideNav collapsed={collapsed} />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-zinc-950 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}