import React from "react";

const StepThree = ({ values, handleInputChange }) => {

  return (
    <div className="w-full">
      <div id="header">
        <h1 id="title" className="text-2xl font-bold">Objetivos y Recursos Necesarios</h1>
        <span id="subtitle" className="text-sm text-gray-600 font-medium">
          Identifica tus objetivos principales y los recursos necesarios
        </span>
      </div>
      <div className="divider"></div>
      <div id="content" className="grid grid-cols-2 gap-3">
        <label className="form-control w-full col-span-2">
          <div className="label">
            <span className="label-text text-gray-400">
              Objetivos Principales de la Startup:
            </span>
          </div>
          <textarea
                className="textarea textarea-bordered w-full resize-none"
                id="mainGoals"
                name="mainGoals"
                value={values.mainGoals}
                onChange={(e) => handleInputChange("mainGoals", e.target.value)}
                placeholder="Ej: Expandir al mercado internacional, lanzar nuevo producto."
              ></textarea>
        </label>
        <label className="form-control w-full col-span-2">
          <div className="label">
            <span className="label-text text-gray-400">
            Recursos Necesarios:
            </span>
          </div>
          <textarea
                className="textarea textarea-bordered w-full resize-none"
                id="neededResources"
                name="neededResources"
                value={values.neededResources}
                onChange={(e) => handleInputChange("neededResources", e.target.value)}
                placeholder="Ej: Inversión de capital, talento técnico."
              ></textarea>
        </label>
      </div>
    </div>
  );
};

export default StepThree;
