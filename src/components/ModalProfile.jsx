import React from 'react';

const ModalProfile = () => {
    return (
    <dialog  id="modal_profile" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Perfil</h3>
        <p className="py-4">Acá va información relacionada al modal de perfil</p>
        <div className="modal-action">
          <form method="dialog">
            
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
        </div>
      </div>
    </dialog>
    );
};

export default ModalProfile;