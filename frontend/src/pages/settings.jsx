import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Eye, 
  ShieldCheck, 
  LogOut,
  Camera,
  CheckCircle2
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const menuItems = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'security', icon: Lock, label: 'Security' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'privacy', icon: ShieldCheck, label: 'Privacy' },
  ];

  return (
    <div className="flex-1 bg-zinc-950 h-screen overflow-hidden text-white flex">
      
      {/* LEFT: SETTINGS NAVIGATION */}
      <div className="w-64 border-r border-white/5 flex flex-col p-6 space-y-2">
        <div className="mb-8 px-2">
          <h1 className="text-xl font-bold tracking-tight">Settings</h1>
          <p className="text-zinc-500 text-[11px] uppercase font-bold tracking-widest mt-1">Management</p>
        </div>

        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group
              ${activeTab === item.id 
                ? "bg-zinc-900 text-green-500 border border-white/5 shadow-lg" 
                : "text-zinc-500 hover:text-white hover:bg-zinc-900/40"
              }`}
          >
            <item.icon size={18} className={activeTab === item.id ? "text-green-500" : "group-hover:text-white"} />
            {item.label}
          </button>
        ))}

        <div className="mt-auto pt-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-all">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>

      {/* RIGHT: CONTENT AREA */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-10 bg-zinc-900/10">
        <div className="max-w-3xl">
          
          {/* PROFILE SECTION */}
          {activeTab === 'profile' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-400">
              <section>
                <h3 className="text-lg font-bold mb-6">General Information</h3>
                
                {/* Avatar Upload */}
                <div className="flex items-center gap-8 mb-10">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-zinc-800 border-2 border-white/5 overflow-hidden shadow-2xl">
                      <img 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200" 
                        alt="Profile" 
                        className="w-full h-full object-cover opacity-90"
                      />
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2.5 bg-green-500 text-black rounded-xl shadow-xl hover:scale-110 active:scale-95 transition-all">
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Profile Picture</h4>
                    <p className="text-xs text-zinc-500 mt-1">Must be at least 500x500px.<br/>Supported: JPG, PNG, WEBP.</p>
                  </div>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest ml-1">Display Name</label>
                    <input type="text" defaultValue="John Doe" className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-green-500/40 outline-none transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest ml-1">Email</label>
                    <input type="email" defaultValue="john@marketspace.rw" className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-green-500/40 outline-none transition" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest ml-1">Public Bio</label>
                    <textarea rows="4" className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-green-500/40 outline-none transition resize-none" placeholder="Write something about yourself..."></textarea>
                  </div>
                </div>
              </section>

              {/* ACTION FOOTER */}
              <div className="flex items-center justify-between pt-8 border-t border-white/5">
                <p className="text-[11px] text-zinc-600 italic font-medium">Your changes are private and secure.</p>
                <button 
                  onClick={handleSave}
                  className="bg-green-500 text-black px-10 py-3.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-green-400 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-green-500/10"
                >
                  {saved ? <><CheckCircle2 size={16}/> Applied</> : "Update Profile"}
                </button>
              </div>
            </div>
          )}

          {/* SECURITY SECTION */}
          {activeTab === 'security' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400">
               <h3 className="text-lg font-bold mb-6">Security Settings</h3>
               <div className="space-y-4">
                  <div className="p-4 bg-zinc-900/40 rounded-2xl border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold">Change Password</p>
                      <p className="text-xs text-zinc-500">Update your account password regularly.</p>
                    </div>
                    <button className="text-[10px] font-bold uppercase tracking-widest bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700 transition">Update</button>
                  </div>
                  <div className="p-4 bg-zinc-900/40 rounded-2xl border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold">Two-Factor Authentication (2FA)</p>
                      <p className="text-xs text-zinc-500">Add an extra layer of security to your account.</p>
                    </div>
                    <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full shadow-sm"></div>
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}