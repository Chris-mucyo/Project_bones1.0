import { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { IoIosNotifications, IoIosCart } from "react-icons/io";

export default function TopNav({ onToggleSidebar }) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="relative px-4 py-2 flex items-center justify-between">
      
      {/* LEFT */}
      <div className="flex items-center gap-8 ml-3">
        <button
          onClick={onToggleSidebar}
          className="text-white text-2xl"
        >
          <FaBars />
        </button>

        <span className="text-white font-bold text-xl hidden sm:block">
          ShopHub
        </span>
      </div>

      {/* CENTER (Desktop search) */}
      <div className="hidden md:flex flex-1 justify-center px-6">
        <div className="flex items-center bg-gray-900 rounded-full px-4 h-11 w-full max-w-xl">
          <input
            className="flex-1 bg-transparent text-white outline-none"
            placeholder="Search"
          />
          <FaSearch className="text-white" />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        {/* Mobile search icon */}
        <button
          className="md:hidden text-white text-xl"
          onClick={() => setShowSearch(!showSearch)}
        >
          <FaSearch />
        </button>

        <div className="bg-gray-900 p-2 rounded-full">
          <IoIosNotifications className="text-green-500 text-xl" />
        </div>
        <div className="bg-gray-900 p-2 rounded-full">
          <IoIosCart className="text-green-500 text-xl" />
        </div>
      </div>

      {/* MOBILE SEARCH OVERLAY */}
      {showSearch && (
        <div className="absolute top-full left-0 w-full p-3 md:hidden z-50">
          <div className="flex bg-gray-900 rounded-full px-4 h-10">
            <input
              className="flex-1 bg-transparent text-white outline-none"
              placeholder="Search"
              autoFocus
            />
            <FaSearch className="text-white mt-2" />
          </div>
        </div>
      )}
    </header>
  );
}
