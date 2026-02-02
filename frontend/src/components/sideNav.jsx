import {
  IoIosHome,
  IoIosCompass,
  IoIosHeart,
  IoIosChatbubbles,
  IoIosSettings,
} from "react-icons/io";
import { IoLogInOutline, IoPersonCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
export default function SideNav({ collapsed }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const syncToken = () => {
      setToken(localStorage.getItem("token"));
    };

    syncToken();

    window.addEventListener("storage", syncToken);
    window.addEventListener("auth-change", syncToken);

    return () => {
      window.removeEventListener("storage", syncToken);
      window.removeEventListener("auth-change", syncToken);
    };
  }, []);

  // ✅ SAFE auth check (fixes "null" / "undefined" strings)
  const isLoggedIn =
    token && token !== "null" && token !== "undefined" && token !== "";

  return (
    <aside
      className={`hidden md:flex flex-col  border-r border-gray-800
      transition-all duration-300
      ${collapsed ? "w-20" : "w-56"}`}
    >
      <nav className="flex-1 mt-4 space-y-2 px-3">
        <NavItem icon={<IoIosHome />} label="Home" collapsed={collapsed} />
        <NavItem icon={<IoIosCompass />} label="Explore" collapsed={collapsed} />
        <NavItem icon={<IoIosHeart />} label="Wishlist" collapsed={collapsed} />
        <NavItem icon={<IoIosChatbubbles />} label="Chat" collapsed={collapsed} />
      </nav>

      <hr className=" text-gray-700" />

      <div className="space-y-5 mb-4 px-3">
        {isLoggedIn ? (
          <NavItem
            icon={<IoPersonCircleOutline />}
            label="Profile"
            collapsed={collapsed} />
        ) : (
          <Link to="/auth/signin"
            collapsed={collapsed}
            className=" flex gap-4 space-x-1 ml-2 text-white"
          >
            <IoLogInOutline className="text-green-500 text-2xl" />Login
          </Link>



        )}

        <NavItem
          icon={
            <IoIosSettings className="group-hover:rotate-180 text-red-600 transition" />
          }
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
      className={`group flex items-center gap-4 w-full px-3 py-2 rounded-lg
      text-white hover:bg-gray-900 transition
      ${collapsed ? "justify-center" : ""}`}
    >
      {icon && <span className="text-green-500 text-xl">{icon}</span>}
      {!collapsed && <span>{label}</span>}
    </button>
  );
}
