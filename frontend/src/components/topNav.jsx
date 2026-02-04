import { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { IoIosNotifications, IoIosCart } from "react-icons/io";

export default function TopNav({ onToggleSidebar }) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur">
      <div className="w-full px-6 py-3 flex items-center justify-between">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3 z-50">
          <button onClick={onToggleSidebar} className="text-white hover:text-green-500 transition">
            <FaBars size={22} />
          </button>
          <span className="text-white font-bold text-lg hidden sm:block">MarketSpace</span>
        </div>

        {/* Center Search */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <div className="flex items-center bg-zinc-900/60 border border-white/10 rounded-xl px-4 h-11 w-full max-w-xl focus-within:border-green-500/50 transition">
            <input
              className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-sm"
              placeholder="Search products, sellers, spaces..."
            />
            <FaSearch className="text-white/50" />
          </div>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-white hover:text-green-500 transition"
            onClick={() => setShowSearch(!showSearch)}
          >
            <FaSearch size={18} />
          </button>
          <button className="bg-zinc-900/60 border border-white/10 p-2 rounded-xl hover:border-green-500/50 transition">
            <IoIosNotifications className="text-green-500 text-xl" />
          </button>
          <button className="bg-zinc-900/60 border border-white/10 p-2 rounded-xl hover:border-green-500/50 transition">
            <IoIosCart className="text-green-500 text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile search */}
      {showSearch && (
        <div className="md:hidden px-6 pb-4">
          <div className="flex items-center bg-zinc-900/60 border border-white/10 rounded-xl px-4 h-11 focus-within:border-green-500/50 transition">
            <input
              className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-sm"
              placeholder="Search..."
              autoFocus
            />
            <FaSearch className="text-white/50" />
          </div>
        </div>
      )}
    </header>
  );
}
