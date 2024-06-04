import React from 'react';

const ModalSetting = () => {
    return (
        <dialog  id="modal_settings" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Ajustes</h3>
          <p className="py-4">Acá va información relacionada al modal de ajustes</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
        </div>
      </dialog>
    );
};

export default ModalSetting;