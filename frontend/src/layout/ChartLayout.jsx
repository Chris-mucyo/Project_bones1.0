// ChartLayout.jsx
import HomeLayout from "./HomeLayout.jsx";
import ChatSidebar from "../components/Chart.sideNav.jsx";
import ChatPage from "../pages/chart.jsx";
import { useState } from "react";

export default function ChatWrapper() {
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <HomeLayout>
      {/* Main content area inside HomeLayout */}
      <div className="flex flex-1 overflow-hidden h-full">
        {/* WhatsApp-style Chat Sidebar */}
        <ChatSidebar onSelectContact={setSelectedContact} />

        {/* Chat content area */}
        <ChatPage contact={selectedContact} />
      </div>
    </HomeLayout>
  );
}
