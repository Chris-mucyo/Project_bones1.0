import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosHome, IoIosCompass, IoIosHeart, IoIosChatbubbles, IoIosSettings } from "react-icons/io";
import { IoLogInOutline, IoPersonCircleOutline } from "react-icons/io5";

export default function SideNav({ collapsed }) {
  const [token, setToken] = useState(null);

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
      className={`flex flex-col bg-zinc-950 transition-all duration-300
    ${collapsed ? "w-20" : "w-56"}`}
    >
      <nav className="flex-1 mt-6 space-y-1 px-3">
        <NavItem icon={<IoIosHome />} label="Home" collapsed={collapsed} />
        <NavItem icon={<IoIosCompass />} label="Explore" collapsed={collapsed} />
        <NavItem icon={<IoIosHeart />} label="Wishlist" collapsed={collapsed} />
        <NavItem icon={<IoIosChatbubbles />} label="Chat" collapsed={collapsed} />
      </nav>

      <div className="border-t border-white/10 my-4" />

      <div className="space-y-1 mb-6 px-3">
        {isLoggedIn ? (
          <NavItem icon={<IoPersonCircleOutline />} label="Profile" collapsed={collapsed} />
        ) : (
          <Link
            to="/auth/signin"
            className={`group flex items-center gap-4 px-3 py-2 rounded-xl
              text-white hover:bg-zinc-900/60 transition
              ${collapsed ? "justify-center" : ""}`}
          >
            <IoLogInOutline className="text-green-500 text-xl" />
            {!collapsed && <span className="text-sm">Login</span>}
          </Link>
        )}
        <NavItem
          icon={<IoIosSettings className="group-hover:rotate-180 transition-transform duration-300" />}
          label="Settings"
          collapsed={collapsed}
        />
      </div>
    </aside>
  );
}

function NavItem({ icon, label, collapsed }) {
  return (
    <button
      className={`group flex items-center gap-4 w-full px-3 py-2 rounded-xl
        text-white/80 hover:text-white hover:bg-zinc-900/60
        border border-transparent hover:border-white/10
        transition
        ${collapsed ? "justify-center" : ""}`}
    >
      {icon && <span className="text-green-500 text-xl">{icon}</span>}
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
}
