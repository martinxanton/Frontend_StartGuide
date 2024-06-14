import React from "react";
import { useState, useEffect } from "react";

const ModalSetting = () => {

  const [theme, setTheme] = useState("night");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(theme === 'night' ? 'fantasy' : 'night');
  };

  return (
    <dialog id="modal_settings" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Ajustes</h3>
        <p className="py-4">
          Acá va información relacionada al modal de ajustes
        </p>
        <div className="modal-action">
          <form method="dialog">
            <input
              type="checkbox"
              onChange={handleThemeChange}
              className="toggle theme-controller"
            />
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalSetting;
