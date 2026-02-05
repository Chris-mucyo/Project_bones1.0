import { useState } from "react";
import { Link } from "react-router-dom"; // Added Link
import { FaBars, FaSearch } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io"; // Swapped IoIosCart for IoIosSettings
import NotificationPopup from "./notification";

export default function TopNav({ onToggleSidebar, onSearch }) {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (onSearch) {
        onSearch(query);
      }
      setShowSearch(false); 
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur border-b border-white/5">
      <div className="w-full px-6 py-3 flex items-center justify-between">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3 z-50">
          <button onClick={onToggleSidebar} className="text-white hover:text-green-500 transition">
            <FaBars size={22} />
          </button>
          <span className="text-white font-bold text-lg hidden sm:block tracking-tight">MarketSpace</span>
        </div>

        {/* Center Search (Desktop) */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <div className="flex items-center bg-zinc-900/60 border border-white/10 rounded-xl px-4 h-11 w-full max-w-xl focus-within:border-green-500/50 transition">
            <input
              className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-sm"
              placeholder="Search products, sellers, spaces..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <FaSearch 
              className="text-white/50 cursor-pointer hover:text-green-500 transition-colors" 
              onClick={handleSearch}
            />
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
          
          <NotificationPopup className="text-green-500 text-xl" />
          
          {/* Swapped Cart for Settings + Link to /settings */}
          <Link 
            to="/settings"
            className="group bg-zinc-900/60 border border-white/10 p-2 rounded-xl hover:border-green-500/50 transition-all flex items-center justify-center"
          >
            <IoIosSettings className="text-white text-xl group-hover:rotate-90 transition-transform duration-500" />
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      {showSearch && (
        <div className="md:hidden px-6 pb-4 animate-in slide-in-from-top duration-200">
          <div className="flex items-center bg-zinc-900/60 border border-white/10 rounded-xl px-4 h-11 focus-within:border-green-500/50 transition">
            <input
              className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-sm"
              placeholder="Search..."
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <FaSearch 
              className="text-white/50" 
              onClick={handleSearch}
            />
          </div>
        </div>
      )}
    </header>
  );
}