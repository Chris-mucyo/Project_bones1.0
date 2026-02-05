import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosHome, IoIosCompass, IoIosHeart, IoIosChatbubbles, IoIosSettings } from "react-icons/io";
import { IoLogInOutline, IoPersonCircleOutline } from "react-icons/io5";

export default function SideNav({ collapsed }) {
  const [token, setToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const syncToken = () => setToken(localStorage.getItem("token"));
    syncToken();
    window.addEventListener("storage", syncToken);
    window.addEventListener("auth-change", syncToken);
    return () => {
      window.removeEventListener("storage", syncToken);
      window.removeEventListener("auth-change", syncToken);
    };
  }, []);

  const isLoggedIn = token && token !== "null" && token !== "undefined" && token !== "";

  return (
    <aside
      className={`flex flex-col bg-zinc-950 transition-all duration-300 border-r border-white/5 h-screen shrink-0
    ${collapsed ? "w-20" : "w-56"}`}
    >
      {/* TOP NAVIGATION */}
      <nav className="flex-1 mt-6 space-y-1 px-3">
        <NavItem to="/" icon={<IoIosHome />} label="Home" collapsed={collapsed} active={location.pathname === "/"} />
        <NavItem to="/explore" icon={<IoIosCompass />} label="Explore" collapsed={collapsed} active={location.pathname === "/explore"} />
        <NavItem to="/wishlist" icon={<IoIosHeart />} label="Wishlist" collapsed={collapsed} active={location.pathname === "/wishlist"} />
        <NavItem to="/chat" icon={<IoIosChatbubbles />} label="Chat" collapsed={collapsed} active={location.pathname === "/chat"} />
      </nav>

      <div className="border-t border-white/10 my-4" />

      {/* BOTTOM SECTION */}
      <div className="space-y-1 mb-6 px-3">
        {isLoggedIn ? (
          <NavItem to="/profile" icon={<IoPersonCircleOutline />} label="Profile" collapsed={collapsed} active={location.pathname === "/profile"} />
        ) : (
          <Link
            to="/auth/signin"
            className={`group flex items-center gap-4 px-3 py-2 rounded-xl
              text-white hover:bg-zinc-900/60 transition mb-1
              ${collapsed ? "justify-center" : ""}`}
          >
            <div className="flex items-center justify-center w-6 shrink-0">
              <IoLogInOutline className="text-green-500 text-xl" />
            </div>
            {!collapsed && <span className="text-sm font-medium">Login</span>}
          </Link>
        )}
      </div>
    </aside>
  );
}

function NavItem({ icon, label, collapsed, to, active, isSettingsItem }) {
  return (
    <Link
      to={to}
      className={`group flex items-center gap-4 w-full px-3 py-2 rounded-xl
        transition border border-transparent
        ${active ? "bg-zinc-900 text-white border-white/5" : "text-white/80 hover:text-white hover:bg-zinc-900/60"}
        ${collapsed ? "justify-center" : ""}`}
    >
      <div className="flex items-center justify-center w-6 shrink-0">
        {icon && (
          <span className={`text-xl transition-colors ${
            active 
              ? "text-green-400" // Green when selected
              : (isSettingsItem ? "text-white" : "text-green-500") // White if it's settings at home, green for others
          }`}>
            {icon}
          </span>
        )}
      </div>
      
      {!collapsed && <span className="text-sm font-medium whitespace-nowrap">{label}</span>}
    </Link>
  );
}