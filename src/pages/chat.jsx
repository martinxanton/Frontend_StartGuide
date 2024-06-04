import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ModalForm from "../components/ModalForm";
import ModalSetting from "../components/ModalSetting";
import ModalProfile from "../components/ModalProfile";
import ModalAuth from "../components/ModalAuth";

function ChatPage() {
  const [showModal, setShowModal] = useState(false);
  const [showModalAuth, setShowModalAuth] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [activeConversation, setActiveConversation] = useState(null);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
  };
  

  const handleSendMessage = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe y la página se recargue
    if (currentMessage.trim() === "") return;

    const newMessages = [...messages, { user: "user", text: currentMessage }];
    setMessages(newMessages);
    setCurrentMessage("");
    setMessages([...newMessages, { user: "bot", loading: true, text: ""},]);
    try {
      const response = await fetch("http://localhost:3000/api/chatI", {
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
      setMessages([
        ...newMessages,
        { user: "bot", text: "Hubo un error al responder tu mensaje." },
      ]);
    }
  };

  const selectConversation = (index) => {
    setActiveConversation(index);
  };

  const conversationList = [
    "Conversacion 1",
    "Conversacion 2",
    "Conversacion 3",
  ];

  return (
    <div className="flex h-screen w-screen bg-base-200">
      <div className="p-6 flex w-1/5 flex-col gap-4">
        <button className="btn btn-secondary rounded-full w-full flex justify-center">
        <span className="material-symbols-rounded">
              add
              </span>
          Nueva conversación
        </button>
        <h4 className="text-lg font-semibold text-start">
          Historial de conversaciones
        </h4>
        <ul className="menu p-0 h-full">
          {conversationList.map((conversation, index) => (
            <li key={index} onClick={() => selectConversation(index)}>
              <a className={activeConversation === index ? "active" : ""}>
                {conversation}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <div className="dropdown dropdown-top w-full">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost w-full rounded-lg gap-5 justify-start"
            >
              <div className="w-10 rounded-full">
                <img
                className="rounded-full"
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
              <h2 className="font-bold">Usuario</h2>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="py-2 font-medium" onClick={()=>document.getElementById('modal_profile').showModal()}>
                <span className="material-symbols-rounded">
                  person
                </span>
                  Perfil
                </a>
              </li>
              <li>
                <a className="py-2 font-medium" onClick={()=>document.getElementById('modal_settings').showModal()}>
                <span className="material-symbols-rounded">
                  settings
                </span>
                  Ajustes
                </a>
              </li>
              <li>
                <a className="py-2 font-medium" onClick={()=> navigate("/auth/login")}>
                <span className="material-symbols-rounded">
                  logout
                </span>
                  Cerrar sesion</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-base-300 rounded-box w-4/5 flex flex-col h-full p-4">
        <div className="flex-grow overflow-auto p-4 mb-4">
          {messages.map((msg, index) => (
            msg.user === "user" ? (
              <div key={index} className={`flex gap-5 py-2 pr-3 chat-end justify-end`}>
              <div className={`chat-bubble ${msg.color}`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
            ) : msg.user === "bot" ? (
              <div key={index} className={`flex gap-5 py-2 pr-3 chat-start justify-start`}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <div className={`chat-bubble ${msg.color}`}>
                  {msg.loading ? <span className="loading loading-dots loading-sm"></span> : null}
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ) : null
          ))}
        </div>
        <div className="flex justify-center">
          <form onSubmit={handleSendMessage} className="flex gap-2 w-3/5">
            <input
              type="text"
              id="messageInput"
              className="input input-bordered flex-grow rounded-full"
              placeholder="Escribe tu consulta"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
            />
            <button
              id="sendButton"
              className="btn btn-secondary btn-circle flex items-center justify-center"
              type="submit"
            >
              <span className="material-symbols-rounded">
              prompt_suggestion
              </span>
            </button>
          </form>
        </div>
        
      </div>
      <ModalForm show={showModal} handleClose={handleCloseModal} />
      <ModalProfile/>
      <ModalSetting/>
      <ModalAuth show={showModalAuth}/>
    </div>
  );
}

export default ChatPage;
