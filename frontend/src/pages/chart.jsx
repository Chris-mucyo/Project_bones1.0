import { useState } from "react";
import Sidebar from "../components/Chart.sideNav.jsx";
import ChatHeader from "../components/Chart.header.jsx";
import ChatMessages from "../components/Chart.messages.jsx";
import ChatInput from "../components/Chart.input.jsx";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there!", sender: "other" },
    { id: 2, text: "Hi! How are you?", sender: "me" },
  ]);
  const [typing, setTyping] = useState("");

  const handleSend = (text) => {
    const newMessage = { id: Date.now(), text, sender: "me" };
    setMessages((prev) => [...prev, newMessage]);
    setTyping("");
  };

  const handleTyping = () => setTyping("You are typing...");

  return (
  <div className="flex h-screen bg-black text-white">
  <Sidebar onSelectContact={(contact) => console.log("Selected:", contact)} />
  <div className="flex flex-col flex-1">
    <ChatHeader contact={{ name: "Alice", online: true }} />
    <ChatMessages messages={messages} typing={typing} />
    <ChatInput onSend={handleSend} onTyping={handleTyping} />
  </div>
</div>
  );
}