// ChatMessages.jsx
import { useEffect, useRef } from "react";

export default function ChatMessages({ messages, typing }) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Helper: format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const h = hours % 12 || 12;
    const m = minutes < 10 ? "0" + minutes : minutes;
    return `${h}:${m} ${ampm}`;
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-black flex flex-col space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex flex-col max-w-xs break-words ${
            msg.sender === "me" ? "self-end items-end" : "self-start items-start"
          }`}
        >
          {/* Message bubble */}
          <div
            className={`p-3 rounded-xl text-white text-sm ${
              msg.sender === "me"
                ? "bg-green-600 rounded-br-none"
                : "bg-gray-800 rounded-bl-none"
            }`}
          >
            {msg.text}
          </div>

          {/* Timestamp */}
          <span className="text-gray-500 text-xs mt-1">
            {formatTime(msg.timestamp || Date.now())}
          </span>
        </div>
      ))}

      {/* Typing indicator */}
      {typing && (
        <div className="self-start flex items-center space-x-2">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></div>
          <span className="text-gray-400 text-sm">{typing}</span>
        </div>
      )}

      <div ref={messagesEndRef}></div>
    </div>
  );
}
