import { React, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const ChatHistory = ({ messages, botId }) => {
  const endOfListRef = useRef(null);
  useEffect(() => {
    // Desplaza el contenedor hasta el final cuando los items cambian
    endOfListRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  let img =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";

  if (botId == 1) {
    img = "src/assets/finn.png";
  } else if (botId == 2) {
    img = "src/assets/mark.png";
  } else if (botId == 3) {
    img = "src/assets/brianna.png";
  } else if (botId == 4) {
    img = "src/assets/maya.png";
  } else if (botId == 5) {
    img = "src/assets/riley.png";
  }

  return (
    <div className="flex-grow p-4 overflow-auto">
      {messages.map((msg, index) =>
        msg.role === "user" ? (
          <div
            key={index}
            className={`flex gap-5 py-2 pr-3 chat-end justify-end`}
          >
            <div
              className={`rounded-l-3xl rounded-tr-3xl rounded-br-sm bg-primary p-6`}
            >
              <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
            </div>
          </div>
        ) : msg.role === "bot" || msg.role === "model" ? (
          <div
            key={index}
            className={`flex gap-5 py-2 pr-3 chat-start justify-start`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component" src={img} />
              </div>
            </div>
            <div
              className={`rounded-r-3xl rounded-tl-3xl rounded-bl-sm bg-base-100 p-6 w-3/4 flex flex-col gap-5`}
            >
              <div className="flex gap-3 justify-end items-center">
                <span className="material-symbols-rounded-outlined cursor-pointer text-xl" onClick={() => {}}>
                  favorite
                </span>
              </div>
              <div>
                {msg.loading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : null}
                <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
              </div>
              <div className="flex gap-5 pt-2">
                <span className="material-symbols-rounded-outlined m-0 p-0 cursor-pointer text-xl">
                  thumb_up
                </span>
                <span className="material-symbols-rounded-outlined m-0 p-0 cursor-pointer text-xl">
                  thumb_down
                </span>
              </div>
            </div>
          </div>
        ) : null
      )}
      <div ref={endOfListRef}></div>
    </div>
  );
};

export default ChatHistory;
