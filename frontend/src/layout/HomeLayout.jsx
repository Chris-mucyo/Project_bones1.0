import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/sideNav";
import TopNav from "../components/topNav";

export default function HomeLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-black">
      {/* TOP NAV */}
      <TopNav onToggleSidebar={() => setCollapsed(!collapsed)} />

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden mt-8">
        <SideNav collapsed={collapsed} />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
