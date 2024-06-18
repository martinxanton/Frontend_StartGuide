import React from "react";

const StepOne = ({ values, handleInputChange }) => {
  const industryList = [
    "Tecnología",
    "Salud",
    "Educación",
    "Finanzas",
    "Comercio Electrónico",
    "Entretenimiento",
    "Turismo",
    "Otro",
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
        <h1 id="title" className="text-2xl font-bold">
          Información General
        </h1>
        <span id="subtitle" className="text-sm text-gray-600 font-medium">
          Proporcione los detalles básicos sobre su startup
        </span>
      </div>
      <div className="divider"></div>
      <div id="content" className="grid grid-cols-2 gap-3">
        <label className="form-control w-full col-span-2">
          <div className="label">
            <span className="label-text text-gray-400">
              Ingresa el nombre de tu startup
            </span>
          </div>
          <input
            type="text"
            id="startupName"
            value={values.startupName}
            onChange={(e) => handleInputChange("startupName", e.target.value)}
            placeholder="Ej: Tech Innovations Inc."
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full col-span-2">
          <div className="label">
            <span className="label-text text-gray-400">
              Describe brevemente tu startup
            </span>
          </div>
          <textarea
            className="textarea textarea-bordered w-full resize-none"
            id="description"
            value={values.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            name="description"
            placeholder="Ej: Desarrollamos software innovador para la gestión empresarial."
          ></textarea>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-400">
              ¿Qué tipo de industria representa tu startup?
            </span>
          </div>
          <select
            className="select select-bordered w-full"
            id="industry"
            name="industry"
            value={values.industry}
            onChange={(e) => handleInputChange("industry", e.target.value)}
          >
            <option value="" disabled>
              Selecciona la Industria
            </option>
            {industryList.map((industry, index) => (
              <option key={index} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-400">
              ¿En qué etapa de desarrollo se encuentra tu startup?
            </span>
          </div>
          <select
            className="select select-bordered w-full"
            id="developmentStage"
            name="developmentStage"
            value={values.developmentStage}
            onChange={(e) =>
              handleInputChange("developmentStage", e.target.value)
            }
          >
            <option value="" disabled>
              Selecciona la Etapa de Desarrollo
            </option>
            {developmentStageList.map((developmentStage, index) => (
              <option key={index} value={developmentStage}>
                {developmentStage}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default StepOne;
