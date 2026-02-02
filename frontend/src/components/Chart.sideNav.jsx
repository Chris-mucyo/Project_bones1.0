// Sidebar.jsx
import { useState } from "react";

const contacts = [
  { id: 1, name: "Alice", lastMessage: "Hey there!", online: true },
  { id: 2, name: "Bob", lastMessage: "How are you?", online: false },
  { id: 3, name: "Charlie", lastMessage: "Let's meet tomorrow.", online: true },
  { id: 4, name: "Dana", lastMessage: "Check this out!", online: false },
];

export default function Sidebar({ onSelectContact }) {
  const [activeChat, setActiveChat] = useState(1);
  const [search, setSearch] = useState("");

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (c) => {
    setActiveChat(c.id);
    if (onSelectContact) onSelectContact(c);
  };

  return (
    <div className="w-80 bg-black flex flex-col border-r border-gray-800 h-screen">
      {/* Search bar */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search contacts"
          className="w-full p-2 rounded-full bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-green-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Contacts list */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((c) => (
          <div
            key={c.id}
            onClick={() => handleSelect(c)}
            className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${
              activeChat === c.id ? "bg-gray-800" : "hover:bg-gray-900"
            }`}
          >
            {/* Avatar */}
            <div className="relative w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-lg">
              {c.name[0]}
              {c.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
              )}
            </div>

            {/* Name + last message */}
            <div className="ml-4 flex flex-col flex-1 overflow-hidden">
              <span className="text-white font-semibold truncate">{c.name}</span>
              <span className="text-gray-400 text-sm truncate">{c.lastMessage}</span>
            </div>
          </div>
        ))}
        {filteredContacts.length === 0 && (
          <div className="text-gray-500 text-center mt-6">No contacts found</div>
        )}
      </div>
    </div>
  );
}
