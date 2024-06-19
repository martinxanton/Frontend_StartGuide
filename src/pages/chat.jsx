import React, { useEffect, useState } from "react";

import { useParams,useNavigate } from "react-router-dom";
import {
  ModalSetting,
  ModalProfile,
  ModalAuth,
  ModalForms,
  ChatNew,
  ChatHistory,
} from "../components";
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from "uuid";
import { set } from "firebase/database";

function ChatPage({ modeChat }) {
  const [showModalForm, setShowModalForm] = useState(false);
  const [showModalAuth, setShowModalAuth] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");   // Mensaje a enviar
  const [activeConversation, setActiveConversation] = useState(null); // Indice de la conversación activa
  const [userProfile, setUserProfile] = useState(null);
  const [chatMode, setChatMode] = useState(1);
  const [userId, setUserId] = useState(null);
  const [botId, setBotId] = useState(1); // [1, 2, 3, 4]
  const [conversations, setConversations] = useState([]); // Lista de conversaciones
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { uuid } = useParams();


  useEffect(() => {
    if (modeChat === 1) {
      setMessages([]);
    }
  }, [modeChat]);

  useEffect(() => {
    setChatMode(modeChat);
  }, [modeChat]);

  useEffect(() => {
    const initializeChat = async () => {
      if (!token) {
        setShowModalForm(false);
        setShowModalAuth(true);
        //console.log("No hay token");
        setLoading(false); // Finaliza la carga
        return;
      }
      //console.log("Token:", token);
      try {
        const isValidToken = await verifyToken();
        if (!isValidToken) {
          //console.log("Token no verificado");
          localStorage.removeItem("token");
          setLoading(false);
          return;
        }
        //console.log("Token verificado");
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.user.id);

        const hasUserProfile = await verifyInfoUserProfile();
        if (!hasUserProfile) {
          //console.log("No hay información en el perfil");
          setShowModalForm(true);
        } else {
          //console.log("Hay información en el perfil");
          setShowModalForm(false);
          await fetchUserProfile();
          await fetchConversations();
          if (uuid) {
            selectConversation(uuid);
            console.log("UUID :", uuid);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    initializeChat();
  }, [token]);

  // Update userProfile and userID
  useEffect(() => {
    if (!userProfile) return;
  }, [userProfile, userId]);

  const verifyToken = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/profile/verify-token",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to verify token");
      }

      const data = await response.json();
      //console.log("Token Validity:", data.valid);
      return data.valid;
    } catch (error) {
      //console.error("Error verifying token:", error);
      return false;
    }
  };

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
      //console.log("Fetched user profile data:", userProfileData);
      setUserProfile(userProfileData);
    } catch (error) {
      //console.error("Error fetching user profile:", error);
    }
  };

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

      const data = await response.json();
      console.log("Data:", data.valid);
      return data.valid;
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchConversations = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/chat/conversations`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Token:", token);

      if (!response.ok) {
        throw new Error("Failed to fetch conversations");
      }

      const data = await response.json();
      console.log("Fetched conversations:", data.conversations);
      setConversations(data.conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const handleCloseModalForm = () => {
    setShowModalForm(false);
  };

  const handleBotId = (id) => {
    setBotId(id);
  };

  const handleSetCurrentMessage = (message) => {
    setCurrentMessage(message);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!currentMessage.trim()) return;
    setMessages([])
    console.log("messages:", messages)
    const newMessages = [...messages, { role: "user", parts: [{text: currentMessage }] }];
    setMessages(newMessages);
    setCurrentMessage("");
    setMessages([...newMessages, { role: "bot", loading: true, parts: [{text: ""}]} ]);
    
    let newUUID = "";
    if (!uuid) {
      console.log("No hay UUID");
      newUUID = uuidv4();
      console.log("Nuevo UUID:", newUUID);
    } else {
      newUUID = uuid;
      console.log("UUID existente:", newUUID);
    }
    

    navigate(`/${newUUID}`);
    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentMessage,
          userProfile: userProfile,
          userId: userId,
          uuid: newUUID,
          botId: botId,
        }),
      });

      console.log("enviado:", currentMessage, userProfile, userId);
      const data = await response.json();
      setMessages([...newMessages, { role: "bot", parts: [{text: data.response}]}]);
    } catch (error) {
      console.error("Error al obtener la respuesta del bot:", error);
      setMessages([
        ...newMessages,
        { role: "bot", parts: [{ text: "Error al obtener la respuesta del bot" }]},
      ]);
    }


  };

  const selectConversation = async (uuid) => {
    setActiveConversation(uuid);
    setMessages([]);
    console.log("Conversacion seleccionada:", uuid);
    try {
      const response = await fetch(`http://localhost:3000/api/chat/history/${uuid}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch conversation history");
      }
      console.log("Trayendo historial de conversación de: ", uuid);
      const data = await response.json();
      console.log("Fetched conversation history:", data.history.slice(2));
      setMessages(data.history.slice(2));  
      navigate(`/${uuid}`);
    } catch (error) {
      console.error("Error fetching conversation history:", error);
    }
  };

  useEffect(() => {
    conversationList;
  },[conversations]);

  const conversationList = conversations.map((conversation, index) => (
    <li key={index} onClick={() => selectConversation(conversation.uuid)}>
      <a className={`p-4 text-wrap   ${activeConversation === conversation.uuid ? "active" : ""}`}>
        {conversation.title}
      </a>
    </li>
  ));

  const handleLogout = () => {
    navigate("/logout");
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen bg-base-200 justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div
      className="flex h-screen w-screen bg-base-200"
      id="theme-id"
      data-theme="night"
    >
      <div
        className={`p-5 flex w-1/5 flex-col gap-4 ${
          token === null ? "blur-sm" : ""
        }`}
      >
        <button
          className={`btn btn-secondary rounded-full ${
            chatMode === 1 ? "btn-disabled" : ""
          } w-full flex justify-center`}
          onClick={() => {navigate("/"), setActiveConversation(null)} }
        >
          <span className="material-symbols-rounded">add</span>
          <span className="hidden xl:flex">Nueva conversación</span>
        </button>
        <ul className="menu bg-base-200 h-full ">
          <li>
            <h2 className="menu-title px-0 overflow-hidden">Historial de conversaciones</h2>
            <ul className="mx-1">
              {conversationList}
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
              <h2 className="font-bold">
                {token !== null ? (
                  userProfile !== null ? (
                    <p>{userProfile.startupName}</p>
                  ) : (
                    <p>Usuario</p>
                  )
                ) : (
                  <p>Usuario</p>
                )}
              </h2>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a
                  className="py-2 font-medium"
                  onClick={() =>
                    document.getElementById("modal_profile").showModal()
                  }
                >
                  <span className="material-symbols-rounded">person</span>
                  Perfil
                </a>
              </li>
              <li>
                <a
                  className="py-2 font-medium"
                  onClick={() =>
                    document.getElementById("modal_settings").showModal()
                  }
                >
                  <span className="material-symbols-rounded">settings</span>
                  Ajustes
                </a>
              </li>
              <li>
                <a className="py-2 font-medium" onClick={handleLogout}>
                  <span className="material-symbols-rounded">logout</span>
                  Cerrar sesion
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className={`bg-base-300 rounded-box w-4/5 flex flex-col h-full p-4 ${
          token === null ? "blur-sm" : ""
        }`}
      >
        {chatMode === 1 ? (
          <ChatNew
            handleSetCurrentMessage={handleSetCurrentMessage}
            handleBotId={handleBotId}
          />
        ) : (
          <ChatHistory messages={messages} />
        )}
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
              onClick={() => setChatMode(2)}
            >
              <span className="material-symbols-rounded">
                prompt_suggestion
              </span>
            </button>
          </form>
        </div>
      </div>
      <ModalProfile />
      <ModalSetting />
      <ModalAuth show={showModalAuth} />
      <ModalForms show={showModalForm} handleClose={handleCloseModalForm} />
    </div>
  );
}

export default ChatPage;
