import {
  IoIosHome,
  IoIosCompass,
  IoIosHeart,
  IoIosChatbubbles,
  IoIosSettings,
} from "react-icons/io";

export default function SideNav({ collapsed }) {
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

      <div className="mb-4 px-3">
        <NavItem
          icon={<IoIosSettings className="group-hover:rotate-180 transition" />}
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
      <span className="text-green-500 text-xl">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </button>
  );
}
