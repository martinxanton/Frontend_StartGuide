import React, { useState } from "react";
import "../App.css";
import "../Chat.css";
import ModalForm from "../components/ModalForm"


function ChatPage() {

  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="h-100 w-100">
      <div className="col-md-8 offset-md-2 d-flex flex-column h-100 mw-100">
        <h1>Chatbot</h1>

        <div id="chatbox" className="mb-3 flex-grow-1 "></div>
        <div className="input-group">
          <input
            type="text"
            id="messageInput"
            className="form-control"
            placeholder="Escribe tu consulta"
          />
          <button id="sendButton" className="btn btn-primary">
            Enviar
          </button>
        </div>
      </div>
      <ModalForm show={showModal} handleClose={handleCloseModal} />
    </div>
  );
}

export default ChatPage;
