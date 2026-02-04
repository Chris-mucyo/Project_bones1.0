import React, { useEffect, useState } from 'react';
import { 
  Search, Plus, MoreVertical, Video, Paperclip, 
  Smile, SendHorizontal, Circle, ChevronLeft, Info
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [allContacts, setAllContacts] = useState([
    { id: 1, name: 'Chris', lastMsg: 'Is the price negotiable?', time: '2:34 PM', unread: 2, color: 'bg-green-800' },
    { id: 2, name: 'Emma Wiwacu', lastMsg: 'See you tomorrow!', time: '12:45 PM', online: true, color: 'bg-orange-500' },
    { id: 3, name: 'Dave leather', lastMsg: 'Perfect, thanks!', time: '10:30 AM', color: 'bg-red-600' },
  ]);

  const [activeContact, setActiveContact] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null); // Track the item being discussed
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'other', text: 'Hello! Are you interested in the item?', time: '2:30 PM' },
  ]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sellerName = params.get('seller');
    const itemName = params.get('item');
    const itemPrice = params.get('price');

    if (sellerName) {
      // Set the product context
      if (itemName) {
        setActiveProduct({ name: itemName, price: itemPrice });
      }

      const existing = allContacts.find(c => c.name.toLowerCase() === sellerName.toLowerCase());
      if (existing) {
        setActiveContact(existing);
      } else {
        const newContact = {
          id: Date.now(),
          name: sellerName,
          lastMsg: itemName ? `Inquiry: ${itemName}` : 'New Message',
          time: 'Just now',
          color: 'bg-zinc-700',
          online: true
        };
        setAllContacts(prev => [newContact, ...prev]);
        setActiveContact(newContact);
      }
    } else if (!activeContact && allContacts.length > 0) {
      setActiveContact(allContacts[0]);
    }
  }, [location]);

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
  };

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="flex h-screen bg-zinc-950 text-white font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-80 border-r border-zinc-800 flex flex-col bg-zinc-950">
        <div className="p-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-900 rounded-full md:hidden">
            <ChevronLeft />
          </button>
          <h1 className="text-xl font-bold tracking-tight">Messages</h1>
          <div className="flex gap-2">
             <Plus className="w-5 h-5 text-zinc-400 cursor-pointer" />
             <MoreVertical className="w-5 h-5 text-zinc-400 cursor-pointer" />
          </div>
        </div>

        <div className="px-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search sellers..." 
              className="w-full bg-zinc-900 py-2 pl-10 pr-4 rounded-xl text-sm focus:outline-none border border-transparent focus:border-zinc-700 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {allContacts.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map((contact) => (
            <div 
              key={contact.id} 
              onClick={() => setActiveContact(contact)}
              className={`flex items-center p-4 cursor-pointer transition-all ${activeContact?.id === contact.id ? 'bg-zinc-900 border-l-4 border-green-500' : 'hover:bg-zinc-900/50 border-l-4 border-transparent'}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold relative shrink-0 ${contact.color}`}>
                {getInitials(contact.name)}
                {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-950 rounded-full"></div>}
              </div>
              <div className="ml-3 flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm truncate">{contact.name}</span>
                  <span className="text-[10px] text-zinc-500">{contact.time}</span>
                </div>
                <p className="text-xs text-zinc-400 truncate mt-0.5">{contact.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        {activeContact ? (
          <>
            {/* Main Header */}
            <header className="p-4 flex items-center justify-between border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${activeContact.color}`}>
                  {getInitials(activeContact.name)}
                </div>
                <div>
                  <h2 className="text-sm font-bold">{activeContact.name}</h2>
                  <p className="text-[10px] text-green-500 uppercase tracking-widest font-bold">Online</p>
                </div>
              </div>
              <div className="flex gap-5 text-zinc-400">
                <Video className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                <Info className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              </div>
            </header>

            {/* PRODUCT PREVIEW BAR */}
            {activeProduct && (
              <div className="bg-zinc-900/90 border-b border-white/5 p-3 flex items-center justify-between px-6 animate-in slide-in-from-top duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center border border-white/10">
                    <Paperclip size={16} className="text-zinc-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">Discussing Product</p>
                    <p className="text-sm font-bold text-green-500">{activeProduct.name}</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-xs font-black">{activeProduct.price} RWF</p>
                   <button className="text-[10px] text-blue-400 hover:underline">View Item</button>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto no-scrollbar pb-24">
              <div className="mx-auto bg-zinc-900/50 px-4 py-1 rounded-full text-[10px] text-zinc-500 mb-4 border border-white/5 uppercase tracking-widest">
                Today
              </div>
              {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col max-w-[75%] ${msg.sender === 'me' ? 'items-end self-end' : 'items-start'}`}>
                  <div className={`${msg.sender === 'me' ? 'bg-green-600 text-white rounded-2xl rounded-tr-none' : 'bg-zinc-900 text-zinc-200 rounded-2xl rounded-tl-none'} p-3.5 shadow-xl`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <span className="text-[9px] opacity-40 mt-1 block text-right font-bold">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <footer className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent">
              <div className="flex items-center gap-3 max-w-4xl mx-auto bg-zinc-900 rounded-2xl px-4 py-2 border border-white/10 shadow-2xl focus-within:border-zinc-600 transition-all">
                <Smile className="w-5 h-5 text-zinc-500 cursor-pointer hover:text-zinc-300" />
                <input
                  placeholder="Type your message..." 
                  className="bg-transparent flex-1 text-sm outline-none py-3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend} 
                  className={`p-2 rounded-xl transition-all ${message.trim() ? 'bg-green-500 text-black scale-100' : 'bg-zinc-800 text-zinc-600 scale-90'}`}
                  disabled={!message.trim()}
                >
                  <SendHorizontal className="w-5 h-5" />
                </button>
              </div>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-600">
            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-white/5">
                <Circle size={40} className="opacity-20" />
            </div>
            <p className="font-bold tracking-tight">Select a conversation</p>
            <p className="text-xs opacity-50">Choose a seller to start negotiating</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Chat;