import React from "react";
import ReactMarkdown from "react-markdown";

const ChatHistory = ({ messages }) => {
  return (
    <div className="flex-grow overflow-auto p-4 mb-4">
      {messages.map((msg, index) =>
        msg.role === "user" ? (
          <div
            key={index}
            className={`flex gap-5 py-2 pr-3 chat-end justify-end`}
          >
            <div className={`chat-bubble chat-bubble-secondary`}>
              <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
            </div>
          </div>
        ) : msg.role === "bot" || msg.role === "model"  ? (
          <div
            key={index}
            className={`flex gap-5 py-2 pr-3 chat-start justify-start`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className={`chat-bubble`}>
              {msg.loading ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : null}
              <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default ChatHistory;
