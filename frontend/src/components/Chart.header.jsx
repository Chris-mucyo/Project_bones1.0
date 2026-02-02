// ChatHeader.jsx
import { IoCall, IoEllipsisHorizontal } from "react-icons/io5";

export default function ChatHeader({ contact }) {
  // default contact if not passed
  const currentContact = contact || {
    name: "Alice",
    avatar: "",
    status: "online",
  };

  return (
  <div className="flex items-center justify-between p-4 bg-black border-b border-gray-800 shadow-md">
  <div className="flex items-center space-x-4">
    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold text-lg">
      {currentContact.avatar ? <img src={currentContact.avatar} alt={currentContact.name} className="w-full h-full rounded-full object-cover" /> : currentContact.name[0]}
    </div>
    <div className="flex flex-col">
      <span className="font-semibold text-white">{currentContact.name}</span>
      <span className="text-sm text-green-500">{currentContact.status}</span>
    </div>
  </div>

  <div className="flex items-center space-x-3">
    <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-all">
      <IoCall size={20} />
    </button>
    <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-all">
      <IoEllipsisHorizontal size={20} />
    </button>
  </div>
</div>
  );
}
