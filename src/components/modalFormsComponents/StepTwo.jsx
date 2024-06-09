import React from "react";

const StepTwo = () => {
  const rangeList = [
    "0",
    "10",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
    "90",
    "100",
  ];
  const developmentStageList = [
    "Idea",
    "Prototipo",
    "Producto Mínimo Viable (MVP)",
    "Crecimiento Inicial",
    "Escalamiento",
    "Otro",
  ];

  return (
    <div className="w-full">
      <div id="header">
        <h1 id="title" className="text-2xl font-bold">Detalles Operativos</h1>
        <span id="subtitle" className="text-sm text-gray-600 font-medium">
          Información sobre la operación diaria y ubicación
        </span>
      </div>
      <div className="divider"></div>
      <div id="content" className="grid grid-cols-2 gap-3">
        <label className="form-control w-full col-span-2">
          <div className="label">
            <span className="label-text text-gray-400">
              Número aproximado de empleados:
            </span>
          </div>
          <input type="range" min="0" max="100" className="range mt-2" step="5" />
          <div className="w-full flex justify-between text-xs ps-2">
            {rangeList.map((range, index) => (
              <div key={index} className="flex flex-col items-center">
                <span>|</span>
                <span>{range}</span>
              </div>
            ))}
          </div>
        </label>
        <label className="form-control w-full col-span-2">
          <div className="label">
            <span className="label-text text-gray-400">
              Ubicación
            </span>
          </div>
          <input
                type="text"
                className="input input-bordered w-full"
                id="location"
                name="location"
                placeholder="Ej: Lima, Perú."
              />
        </label>
      </div>
    </div>
  );
};

export default StepTwo;
