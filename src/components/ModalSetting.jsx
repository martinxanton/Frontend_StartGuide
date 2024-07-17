import React from "react";
import { useState, useEffect } from "react";

const ModalSetting = () => {
  const [theme, setTheme] = useState("myDark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(theme === "myDark" ? "myLight" : "myDark");
  };

  return (
    <dialog id="modal_settings" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Ajustes</h3>
        <div className="modal-action">
          <form method="dialog" className="grid gap-4 w-full">
            <div className="flex items-center justify-between">
              <label className="cursor-pointer label">
                <span className="label-text">Tema Oscuro</span>
              </label>
              <input
                type="checkbox"
                onChange={handleThemeChange}
                className="toggle theme-controller"
              />
            </div>

            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                document
                  .getElementById("modal_settings")
                  .classList.remove("modal-open");
              }}
            >
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalSetting;
