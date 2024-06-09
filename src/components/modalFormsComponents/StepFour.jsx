import React from "react";

const StepFour = ({ values, handleInputChange }) => {
  return (
    <div className="w-full">
      <div id="header">
        <h1 id="title" className="text-2xl font-bold">
          Competencia y Mercado
        </h1>
        <span id="subtitle" className="text-sm text-gray-600 font-medium">
          Detallanos sobre tu competencia en el mercado.
        </span>
      </div>
      <div className="divider"></div>
      <div id="content" className="grid grid-cols-2 gap-3">
        <label className="form-control w-full col-span-2">
          <div className="label">
            <span className="label-text text-gray-400">
              Competidores Principales:
            </span>
          </div>
          <textarea
            className="textarea textarea-bordered w-full resize-none"
            id="mainCompetitors"
            name="mainCompetitors"
            value={values.mainCompetitors}
            onChange={(e) => handleInputChange("mainCompetitors", e.target.value)}
            placeholder="Ej: Competitor A, Competitor B."
          ></textarea>
        </label>
      </div>
    </div>
  );
};

export default StepFour;
