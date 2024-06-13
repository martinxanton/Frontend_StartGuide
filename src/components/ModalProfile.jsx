import React from "react";


const ModalProfile = () => {

  return (
    <dialog id="modal_profile" className="modal">
      <div className="modal-box h-4/5">
        <h3 className="font-bold text-lg">Perfil</h3>
        <p className="py-4">
          Acá puedes editar la información sobre tu startup.
        </p>
        <div className="modal-action">
          <form method="dialog" className="grid grid-cols-2 gap-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-gray-400">
                  Ingresa el nombre de tu startup
                </span>
              </div>
              <input
                type="text"
                id="startupName"
                placeholder="Ej: Tech Innovations Inc."
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-gray-400">
                  Describe brevemente tu startup
                </span>
              </div>
              <textarea
                className="textarea textarea-bordered w-full resize-none"
                id="description"
                name="description"
                placeholder="Ej: Desarrollamos software innovador para la gestión empresarial."
              ></textarea>
            </label>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalProfile;
