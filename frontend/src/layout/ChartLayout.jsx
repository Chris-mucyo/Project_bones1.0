import React, { useState } from 'react';
import SideNav from '../components/sideNav';
import Chat from '../pages/chart';

const ChatLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="flex h-screen w-full bg-zinc-950 overflow-hidden">
      {/* 1. Global Side Navigation */}
      <SideNav collapsed={isCollapsed} />

      {/* 2. The Chat Application */}
      <div className="flex-1 flex overflow-hidden">
        <Chat />
      </div>
    </div>
  );
};

export default ChatLayout;