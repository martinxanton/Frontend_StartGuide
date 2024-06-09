import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ModalSetting, ModalProfile, ModalAuth, ModalForms } from '../components';


function ChatPage() {
  const [showModalForm, setShowModalForm] = useState(true);
  const [showModalAuth, setShowModalAuth] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [activeConversation, setActiveConversation] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setShowModalAuth(true);
      setShowModalForm(false);
    } else {
      // Verificar el token
      const verifyToken = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/profile/protected", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to verify token");
          }
          return true;

        } catch (error) {
          console.error("Error verifying token:", error);
        }
      }
      // Obtener el perfil del usuario
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/profile`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch user profile");
          }

          const userProfileData = await response.json();
          setUserProfile(userProfileData);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };
      // Verificar si el usuario tiene información en su perfil
      const verifyInfoUserProfile = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/profile/exists`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to verify user profile");
          }
          return await response.json();
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
      console.log("Token:", token);

      if (!verifyToken()) {
        localStorage.removeItem("token");
        console.log("Token no verificado");
      } else {
        console.log("Token verificado");
        if (verifyInfoUserProfile()) {
          console.log("No hay información en el perfil");
          setShowModalForm(true);
        } else {
          console.log("Hay información en el perfil");
          setShowModalForm(false);
          fetchUserProfile();
        }
      }
      
    }
  }, [token]);

  
  const handleCloseModalForm = () => {
    setShowModalForm(false);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe y la página se recargue
    if (!currentMessage.trim()) return;

    const newMessages = [...messages, { user: "user", text: currentMessage }];
    setMessages(newMessages);
    setCurrentMessage("");
    setMessages([...newMessages, { user: "bot", loading: true, text: ""},]);
    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentMessage, userProfile: userProfile, }),
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
    console.log("Conversacion seleccionada:", index);
  };

  const conversationList = [
    "Conversacion 1",
    "Conversacion 2",
    "Conversacion 3",
    "Conversacion 4",
    "Conversacion 5",
    "Conversacion 6",
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");  // Redirigir a la página de inicio de sesión
  };
  

  return (
    <div className="flex h-screen w-screen bg-base-200">
      <div className="p-5 flex w-1/5 flex-col gap-4">
        <button className="btn btn-secondary rounded-full w-full flex justify-center">
          <span className="material-symbols-rounded">
                add
          </span>
          <span className="hidden xl:flex">
            Nueva conversación
          </span>
        </button>
        <ul className="menu bg-base-200 h-full">
          <li >
            <h2 className="menu-title px-0">
              Historial de conversaciones
            </h2>
            <ul className="mx-1">
              {conversationList.map((conversation, index) => (
                <li key={index} onClick={() => selectConversation(index)}>
                    <a className={`p-4 ${activeConversation === index ? "active" : ""}`}>
                      {conversation}
                    </a>  
                </li>
              ))}
            </ul>
          </li>
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
                <a className="py-2 font-medium" onClick={handleLogout}>
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
              <div className={`chat-bubble chat-bubble-secondary`}>
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
                <div className={`chat-bubble`}>
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
      <ModalProfile/>
      <ModalSetting/>
      <ModalAuth show={showModalAuth}/>
      <ModalForms show={showModalForm} handleClose={handleCloseModalForm}/>
    </div>
  );
}

export default ChatPage;
