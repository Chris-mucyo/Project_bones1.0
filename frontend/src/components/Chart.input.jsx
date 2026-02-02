// ChatInput.jsx
import { useState } from "react";
import { IoSend } from "react-icons/io5";

export default function ChatInput({ onSend, onTyping }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center p-3 bg-black border-t border-gray-800">
      <textarea
        rows={1}
        placeholder="Type a message"
        className="flex-1 max-h-32 p-3 rounded-full bg-gray-900 text-white placeholder-gray-400 border border-gray-700 resize-none focus:outline-none focus:border-green-500 text-sm"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          onTyping();
        }}
        onKeyDown={handleKeyDown}
      />

      <button
        onClick={handleSend}
        className="ml-3 bg-green-600 p-3 rounded-full text-white hover:bg-green-500 transition-colors flex items-center justify-center"
      >
        <IoSend size={20} />
      </button>
    </div>
  );
}
