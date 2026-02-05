import React, { useState, useEffect } from 'react';
import { 
  User, Lock, Bell, ShieldCheck, LogOut, Camera, 
  CheckCircle2, AlertCircle, RefreshCw, EyeOff, Eye
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john@marketspace.rw",
    bio: "Curating the best tech spaces in Kigali.",
    twoFactor: true
  });

  // Track changes to show "Discard/Save" bar
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setIsDirty(false);
    // You could trigger a global notification here
  };

  const menuItems = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'security', icon: Lock, label: 'Security' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'privacy', icon: ShieldCheck, label: 'Privacy' },
  ];

  return (
    <div className="flex-1 bg-zinc-950 h-screen overflow-hidden text-white flex">
      
      {/* LEFT: NAV */}
      <div className="w-64 border-r border-white/5 flex flex-col p-6 space-y-2 bg-zinc-950">
        <div className="mb-8 px-2">
          <h1 className="text-xl font-bold tracking-tight">Settings</h1>
          <p className="text-green-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Workspace</p>
        </div>

        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group
              ${activeTab === item.id 
                ? "bg-zinc-900 text-green-500 border border-white/10 shadow-[0_0_20px_rgba(34,197,94,0.05)]" 
                : "text-zinc-500 hover:text-white hover:bg-zinc-900/40"
              }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}

        <div className="mt-auto pt-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-all">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>

      {/* RIGHT: CONTENT */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-900/20 via-zinc-950 to-zinc-950 p-10">
        <div className="max-w-3xl mx-auto">
          
          {activeTab === 'profile' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
              
              <header className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">Public Profile</h3>
                  <p className="text-zinc-500 text-sm">This information will be displayed publicly.</p>
                </div>
                {isDirty && (
                  <div className="flex gap-3 animate-in zoom-in duration-300">
                    <button onClick={() => setIsDirty(false)} className="text-xs font-bold text-zinc-400 hover:text-white transition">Discard</button>
                    <button 
                      onClick={handleSave}
                      disabled={loading}
                      className="bg-green-500 text-black px-5 py-2 rounded-lg text-xs font-black uppercase flex items-center gap-2 hover:bg-green-400 disabled:opacity-50"
                    >
                      {loading ? <RefreshCw size={14} className="animate-spin" /> : "Save Changes"}
                    </button>
                  </div>
                )}
              </header>

              {/* Avatar Section */}
              <div className="p-8 bg-zinc-900/20 border border-white/5 rounded-3xl flex items-center gap-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                  <User size={120} />
                </div>
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-zinc-800 border border-white/10 overflow-hidden shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <label className="absolute -bottom-2 -right-2 p-2 bg-green-500 text-black rounded-lg cursor-pointer hover:scale-110 transition shadow-lg">
                    <Camera size={14} /><input type="file" className="hidden" />
                  </label>
                </div>
                <div>
                  <h4 className="font-bold">Profile Picture</h4>
                  <p className="text-xs text-zinc-500 mt-1 max-w-[200px]">We recommend an image of at least 400x400. Gifs are supported.</p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Full Name</label>
                  <input 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900/40 border border-white/5 rounded-xl px-4 py-3.5 text-sm focus:border-green-500/50 focus:bg-zinc-900/80 outline-none transition-all placeholder:text-zinc-700" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Account Email</label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900/40 border border-white/5 rounded-xl px-4 py-3.5 text-sm focus:border-green-500/50 outline-none transition-all" 
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Bio Description</label>
                  <textarea 
                    name="bio"
                    rows="4" 
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900/40 border border-white/5 rounded-xl px-4 py-3.5 text-sm focus:border-green-500/50 outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
               <h3 className="text-2xl font-bold">Security Controls</h3>
               
               <div className="bg-zinc-900/20 border border-white/5 rounded-3xl p-6 space-y-6">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                     <div className="p-3 bg-green-500/10 rounded-xl text-green-500"><ShieldCheck size={24} /></div>
                     <div>
                       <p className="text-sm font-bold">Two-Factor Authentication</p>
                       <p className="text-xs text-zinc-500">Currently active on your account.</p>
                     </div>
                   </div>
                   <button 
                    onClick={() => setFormData(p => ({...p, twoFactor: !p.twoFactor}))}
                    className={`w-12 h-6 rounded-full transition-colors relative ${formData.twoFactor ? 'bg-green-500' : 'bg-zinc-800'}`}
                   >
                     <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.twoFactor ? 'left-7' : 'left-1'}`} />
                   </button>
                 </div>
               </div>

               <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] ml-1">Password Update</p>
                  <div className="relative">
                    <input 
                      type={showPass ? "text" : "password"} 
                      placeholder="New Password" 
                      className="w-full bg-zinc-900/40 border border-white/5 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-green-500/50" 
                    />
                    <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-3.5 text-zinc-600 hover:text-zinc-300">
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}