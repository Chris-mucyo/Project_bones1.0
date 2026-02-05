import { useState, useMemo } from "react";
import { Bell, Settings, CheckCircle2 } from "lucide-react";

export default function NotificationPopup({
  followedShops = [],
  categoryHistory = []
}) {
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState([]);

  const notifications = useMemo(() => {
    const list = [];
    categoryHistory.forEach((cat) => {
      list.push({ id: `cat-${cat}`, message: `Trending shops in ${cat}`, time: "Now" });
    });
    followedShops.forEach((id) => {
      list.push({ id: `follow-${id}`, message: `Shop ${id} added new products`, time: "1h ago" });
    });
    return list;
  }, [followedShops, categoryHistory]);

  const unreadCount = notifications.filter((n) => !read.includes(n.id)).length;

  const markRead = (id) => {
    if (!read.includes(id)) setRead((prev) => [...prev, id]);
  };

  const markAllAsRead = () => setRead(notifications.map(n => n.id));

  return (
    <div className="relative">
      {/* BELL ICON - Updated to Green */}
      <button
        onClick={() => setOpen(!open)}
        className={`relative p-2 rounded-xl transition-all ${
          open ? "bg-zinc-900 text-green-500" : "text-green-500 hover:bg-zinc-900/60"
        }`}
      >
        <Bell size={22} fill={unreadCount > 0 ? "currentColor" : "none"} className={unreadCount > 0 ? "opacity-90" : ""} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 bg-white w-2 h-2 rounded-full border border-zinc-950"></span>
        )}
      </button>

      {/* POPUP PANEL */}
      {open && (
        <>
          {/* CLICK-AWAY OVERLAY - Removes the popup when clicking anywhere else */}
          <div 
            className="fixed inset-0 z-40 cursor-default" 
            onClick={() => setOpen(false)} 
          />
          
          <div className="absolute right-0 mt-3 w-80 bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            
            {/* HEADER */}
            <div className="flex justify-between items-center p-4 border-b border-white/5 bg-zinc-900/30">
              <div>
                <h3 className="font-bold text-sm tracking-tight text-white">Notifications</h3>
                <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">{unreadCount} New</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 
                  size={18} 
                  className="cursor-pointer text-zinc-500 hover:text-green-500 transition-colors" 
                  onClick={markAllAsRead}
                />
                <Settings size={18} className="cursor-pointer text-zinc-500 hover:text-white transition-colors" />
              </div>
            </div>

            {/* LIST */}
            <div className="max-h-[400px] overflow-y-auto no-scrollbar">
              {notifications.length === 0 ? (
                <div className="p-10 text-center">
                  <p className="text-xs text-zinc-600 italic">No notifications yet</p>
                </div>
              ) : (
                notifications.map((n) => {
                  const isRead = read.includes(n.id);
                  return (
                    <div
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className={`p-4 border-b border-white/5 cursor-pointer transition-all flex gap-3 relative
                        ${isRead ? "opacity-50" : "bg-zinc-900/40 hover:bg-zinc-900/60"}`}
                    >
                      {!isRead && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" />
                      )}
                      <div className="flex-1">
                        <p className={`text-xs leading-relaxed ${isRead ? "text-zinc-400" : "text-zinc-100 font-medium"}`}>
                          {n.message}
                        </p>
                        <p className="text-[10px] text-zinc-600 mt-1 font-bold">{n.time}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}