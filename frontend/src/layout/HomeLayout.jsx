import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";

export default function HomeLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Real-time Ready: Placeholder for the authenticated user
  // This will eventually be fetched from Supabase/Firebase/Auth
  const [user] = useState({
    id: "current_user_1",
    name: "User Name",
    email: "user@example.com",
    avatar: null
  });

  return (
    <div className="h-screen flex flex-col bg-black overflow-hidden">
      
      {/* Pass search and user context to TopNav */}
      <TopNav 
        onToggleSidebar={() => setCollapsed(!collapsed)} 
        onSearch={(query) => setSearchQuery(query)}
        user={user} 
      />

      <div className="flex flex-1 min-h-0">
        <SideNav collapsed={collapsed} />

        <main className="flex-1 overflow-y-auto bg-zinc-950 p-6">
          {/* Providing an object in context allows you to pass 
            the searchQuery and the user profile to the Home page 
            without breaking the layout.
          */}
          <Outlet context={{ searchQuery, user }} />
        </main>
      </div>
    </div>
  );
}