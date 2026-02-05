export default function NavItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-2 py-1 cursor-pointer group relative"
    >
      <span
        className={`transition ${
          active
            ? "text-green-400"
            : "text-zinc-600 group-hover:text-zinc-200"
        }`}
      >
        {icon}
      </span>

      <span
        className={`text-xs font-medium hidden lg:block transition ${
          active
            ? "text-zinc-100"
            : "text-zinc-600 group-hover:text-zinc-200"
        }`}
      >
        {label}
      </span>

      {active && (
        <div className="absolute -left-4 w-1 h-5 bg-green-500 rounded-r-full shadow-[4px_0_10px_rgba(34,197,94,0.4)]" />
      )}
    </div>
  );
}
