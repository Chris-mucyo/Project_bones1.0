import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";

export default function HomeLayout() {
  const [collapsed, setCollapsed] = useState(false);
  // 1. Create the search state here
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-screen flex flex-col bg-black overflow-hidden">
      
      {/* 2. Pass setSearchQuery to TopNav */}
      <TopNav 
        onToggleSidebar={() => setCollapsed(!collapsed)} 
        onSearch={(query) => setSearchQuery(query)}
      />

      <div className="flex flex-1 min-h-0">
        <SideNav collapsed={collapsed} />

        <main className="flex-1 overflow-y-auto bg-zinc-950 p-6">
          {/* 3. Use 'context' to pass the searchQuery down to the Home component */}
          <Outlet context={{ searchQuery }} />
        </main>
      </div>
    </div>
  );
}