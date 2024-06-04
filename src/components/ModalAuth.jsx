import React from 'react';

const ModalAuth = ({ show, handleClose }) => {
  if (!show) return null;

  return (
    <div>
      <input type="checkbox" checked readOnly id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box w-1/5">
          <h3 className="font-bold text-lg text-center">Bienvenido</h3>
          <p className="py-4 text-center">Inicia sesión o registrate para guardar tu progreso</p>
          <div className="flex flex-col gap-2">
            <a href="/auth/login" className="btn btn-primary">Iniciar sesión</a>
            <a href="/auth/register" className="btn btn-outline btn-secondary">Registrarme</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAuth;