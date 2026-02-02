import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Video, 
  Paperclip, 
  Smile, 
  SendHorizontal, 
  Circle 
} from 'lucide-react';

const Chat = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'other', text: 'Hey there!', time: '2:30 PM' },
    { id: 2, sender: 'me', text: "Hi Chris I'm good, how about you?", time: '2:31 PM' },
    { id: 3, sender: 'other', text: 'Am good. Do you want some space?', time: '2:33 PM' },
  ]);

  const contacts = [
    { id: 1, name: 'Chris', lastMsg: 'Hey! How are you doing?', time: '2:34 PM', unread: 5, color: 'bg-green-800' },
    { id: 2, name: 'Mi customer', lastMsg: 'Thanks for the help!', time: '1:15 PM', color: 'bg-blue-800' },
    { id: 3, name: 'Emma Wiwacu', lastMsg: 'See you tomorrow!', time: '12:45 PM', online: true, color: 'bg-orange-500' },
    { id: 4, name: 'Total places', lastMsg: 'Meeting at 3 PM', time: '11:20 AM', unread: 5, color: 'bg-gray-600' },
    { id: 5, name: 'Dave leather', lastMsg: 'Perfect, thanks!', time: '10:30 AM', color: 'bg-red-600' },
    { id: 6, name: 'Lisa accesories', lastMsg: 'Sounds good!', time: 'Yesterday', color: 'bg-purple-700' },
    { id: 7, name: 'Alex marketting', lastMsg: 'Got it, thanks!', time: 'Yesterday', color: 'bg-cyan-600' },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    setTyping(e.target.value.length > 0);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setMessage('');
    setTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-white font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-80 border-r border-zinc-800 flex flex-col bg-zinc-950">
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-1.5 rounded-full">
              <Circle className="w-5 h-5 fill-white" />
            </div>
            <h1 className="text-xl font-semibold">Telegram</h1>
          </div>
          <div className="flex gap-4 text-zinc-400">
            <Plus className="w-5 h-5 cursor-pointer" />
            <MoreVertical className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        {/* Search */}
        <div className="px-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full bg-zinc-900/80 py-2 pl-10 pr-4 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Contact List */}
        <div className=" bg-zinc-950 flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className={`flex items-center p-3 hover:bg-zinc-900 cursor-pointer transition-colors ${contact.id === 1 ? 'bg-zinc-900' : ''}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium relative ${contact.color}`}>
                {contact.name.split(' ').map(n => n[0]).join('')}
                {contact.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-950 rounded-full"></div>
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{contact.name}</span>
                  <span className="text-xs text-zinc-500">{contact.time}</span>
                </div>
                <div className="flex justify-between items-center mt-0.5">
                  <p className="text-xs text-zinc-400 truncate w-40">{contact.lastMsg}</p>
                  {contact.unread && (
                    <span className="bg-green-600 text-[10px] text-white px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative">
        
        {/* Chat Header */}
        <header className="p-4 flex items-center justify-between border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center font-medium">CH</div>
            <div>
              <h2 className="text-sm font-semibold">Chris</h2>
              <p className="text-xs text-zinc-500">{typing ? 'typing...' : 'online'}</p>
            </div>
          </div>
          <div className="flex gap-6 text-zinc-400">
            <Search className="w-5 h-5 cursor-pointer" />
            <Video className="w-5 h-5 cursor-pointer" />
            <MoreVertical className="w-5 h-5 cursor-pointer" />
          </div>
        </header>

        {/* Message Area */}
        <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto">
          {messages.map(msg => (
            <div key={msg.id} className={`flex flex-col max-w-[70%] ${msg.sender === 'me' ? 'items-end self-end' : 'items-start'}`}>
              <div className={`${msg.sender === 'me' ? 'bg-green-500 text-black rounded-xl rounded-tr-none' : 'bg-zinc-900 rounded-xl rounded-tl-none'} p-3`}>
                <p className="text-sm font-medium">{msg.text}</p>
                <span className="text-[10px] opacity-70 mt-1 block text-right">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <footer className="p-4">
          <div className="flex items-center gap-4 max-w-5xl mx-auto">
            <div className="flex items-center gap-4 bg-zinc-900 rounded-lg flex-1 px-4 py-2 border border-zinc-800">
              <Plus className="w-5 h-5 text-zinc-500 cursor-pointer" />
              <Paperclip className="w-5 h-5 text-zinc-500 cursor-pointer rotate-45" />
              <textarea
                placeholder="Type a message..." 
                className="bg-transparent flex-1 text-sm resize-none focus:outline-none"
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <Smile className="w-5 h-5 text-zinc-500 cursor-pointer" />
            </div>
            <button 
              onClick={handleSend}
              className="bg-green-500 p-2.5 rounded-lg hover:bg-green-600 transition-colors"
            >
              <SendHorizontal className="w-5 h-5 text-black" />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Chat;
