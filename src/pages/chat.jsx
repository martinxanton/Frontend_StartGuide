import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import "../App.css";
import "../Chat.css";
import ModalForm from "../components/ModalForm";

function ChatPage() {
  const [showModal, setShowModal] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSendMessage = async () => {
    if (currentMessage.trim() === "") return;

    const newMessages = [...messages, { user: "user", text: currentMessage }];
    setMessages(newMessages);
    setCurrentMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentMessage }),
      });
      const data = await response.json();
      setMessages([...newMessages, { user: "bot", text: data.response }]);
    } catch (error) {
      console.error("Error al obtener la respuesta del bot:", error);
      setMessages([...newMessages, { user: "bot", text: "Hubo un error al procesar tu mensaje." }]);
    }
  };

  return (
    <div className="h-100 w-100">
      <div className="col-md-8 offset-md-2 d-flex flex-column h-100 mw-100">
        <div id="chatbox" className="mb-3 flex-grow-1 overflow-auto">
          {messages.map((msg, index) => (
            <div className="message-container">
              <div key={index} className={`message ${msg.user}`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
        <div className="input-group">
          <input
            type="text"
            id="messageInput"
            className="form-control"
            placeholder="Escribe tu consulta"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button
            id="sendButton"
            className="btn btn-primary"
            onClick={handleSendMessage}
          >
            Enviar
          </button>
        </div>
      </div>
      <ModalForm show={showModal} handleClose={handleCloseModal} />
    </div>
  );
}

export default ChatPage;
