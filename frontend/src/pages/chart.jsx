import React, { useEffect, useState, useRef } from 'react';
import { 
  Search, Plus, MoreVertical, Video, Paperclip, 
  Smile, SendHorizontal, Circle, ChevronLeft, Info
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  // --- REAL-WORLD STATE STRUCTURE ---
  // In a ready-to-use app, these would eventually come from a Database/API
  const [conversations, setConversations] = useState([]); // List of people you are talking to
  const [activeChatId, setActiveChatId] = useState(null); // ID of the currently open chat
  const [messagesByChat, setMessagesByChat] = useState({}); // Messages grouped by Chat ID: { chatId: [messages] }
  
  const [searchTerm, setSearchTerm] = useState('');
  const [messageText, setMessageText] = useState('');

  // --- HANDLE INCOMING PRODUCT CLICKS ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sellerName = params.get('seller');
    const itemName = params.get('item');
    const itemPrice = params.get('price');

    if (sellerName) {
      // Logic: If conversation exists, open it. If not, create a new one.
      setConversations(prev => {
        const existing = prev.find(c => c.name.toLowerCase() === sellerName.toLowerCase());
        
        if (existing) {
          setActiveChatId(existing.id);
          // Update product context if it's a new item click
          existing.activeProduct = itemName ? { name: itemName, price: itemPrice } : existing.activeProduct;
          return [...prev];
        }

        const newChat = {
          id: `chat_${Date.now()}`,
          name: sellerName,
          lastMsg: itemName ? `Interested in ${itemName}` : 'New Message',
          time: 'Just now',
          color: 'bg-zinc-700',
          online: true,
          activeProduct: itemName ? { name: itemName, price: itemPrice } : null
        };

        setActiveChatId(newChat.id);
        return [newChat, ...prev];
      });
    }
  }, [location]);

  // --- SEND MESSAGE LOGIC ---
  const handleSend = () => {
    if (!messageText.trim() || !activeChatId) return;

    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // 1. Add message to the specific chat's history
    setMessagesByChat(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage]
    }));

    // 2. Update the sidebar preview
    setConversations(prev => prev.map(c => 
      c.id === activeChatId ? { ...c, lastMsg: messageText, time: 'Now' } : c
    ));

    setMessageText('');
  };

  // --- HELPERS ---
  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : "?";
  const activeChat = conversations.find(c => c.id === activeChatId);
  const currentMessages = messagesByChat[activeChatId] || [];

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
              placeholder="Search conversations..." 
              className="w-full bg-zinc-900 py-2 pl-10 pr-4 rounded-xl text-sm focus:outline-none border border-transparent focus:border-zinc-700 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {conversations.length === 0 ? (
            <div className="p-8 text-center text-zinc-600 text-xs italic">
              No active conversations yet.
            </div>
          ) : (
            conversations
              .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((contact) => (
                <div 
                  key={contact.id} 
                  onClick={() => setActiveChatId(contact.id)}
                  className={`flex items-center p-4 cursor-pointer transition-all ${activeChatId === contact.id ? 'bg-zinc-900 border-l-4 border-green-500' : 'hover:bg-zinc-900/50 border-l-4 border-transparent'}`}
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
              ))
          )}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        {activeChat ? (
          <>
            <header className="p-4 flex items-center justify-between border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${activeChat.color}`}>
                  {getInitials(activeChat.name)}
                </div>
                <div>
                  <h2 className="text-sm font-bold">{activeChat.name}</h2>
                  <p className="text-[10px] text-green-500 uppercase tracking-widest font-bold">Online</p>
                </div>
              </div>
              <div className="flex gap-5 text-zinc-400">
                <Video className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                <Info className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              </div>
            </header>

            {activeChat.activeProduct && (
              <div className="bg-zinc-900/90 border-b border-white/5 p-3 flex items-center justify-between px-6 animate-in slide-in-from-top duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center border border-white/10">
                    <Paperclip size={16} className="text-zinc-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">Discussing Product</p>
                    <p className="text-sm font-bold text-green-500">{activeChat.activeProduct.name}</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-xs font-black">{activeChat.activeProduct.price} RWF</p>
                   <button className="text-[10px] text-blue-400 hover:underline">View Item</button>
                </div>
              </div>
            )}

            <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto no-scrollbar pb-24">
              {currentMessages.length === 0 && (
                <div className="mx-auto bg-zinc-900/50 px-6 py-2 rounded-xl text-[10px] text-zinc-500 mb-4 border border-white/5 text-center">
                  Start of your conversation with {activeChat.name}
                </div>
              )}
              {currentMessages.map(msg => (
                <div key={msg.id} className={`flex flex-col max-w-[75%] ${msg.sender === 'me' ? 'items-end self-end' : 'items-start'}`}>
                  <div className={`${msg.sender === 'me' ? 'bg-green-600 text-white rounded-2xl rounded-tr-none' : 'bg-zinc-900 text-zinc-200 rounded-2xl rounded-tl-none'} p-3.5 shadow-xl`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <span className="text-[9px] opacity-40 mt-1 block text-right font-bold">{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>

            <footer className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent">
              <div className="flex items-center gap-3 max-w-4xl mx-auto bg-zinc-900 rounded-2xl px-4 py-2 border border-white/10 shadow-2xl focus-within:border-zinc-600 transition-all">
                <Smile className="w-5 h-5 text-zinc-500 cursor-pointer hover:text-zinc-300" />
                <input
                  placeholder="Type your message..." 
                  className="bg-transparent flex-1 text-sm outline-none py-3"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend} 
                  className={`p-2 rounded-xl transition-all ${messageText.trim() ? 'bg-green-500 text-black scale-100' : 'bg-zinc-800 text-zinc-600 scale-90'}`}
                  disabled={!messageText.trim()}
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
            <p className="font-bold tracking-tight text-zinc-400">Inbox</p>
            <p className="text-xs opacity-50">Select a seller or click a product to start chatting</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Chat;