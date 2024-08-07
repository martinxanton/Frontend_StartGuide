import React from "react";

const StepFive = ({ values, handleInputChange }) => {
  return (
    <div className="w-full">
      <div id="header">
        <h1 id="title" className="text-2xl font-bold">
          Fortalezas y Desafíos
        </h1>
        <span id="subtitle" className="text-sm text-gray-600 font-medium">
          Identifica las fortalezas de tu startup y los desafíos que enfrenta
        </span>
      </div>
      <div className="divider"></div>
      <div id="content" className="grid grid-cols-2 gap-3">
        <label className="form-control w-full col-span-2">
          <div className="label">
            <span className="label-text text-gray-400">
              Fortalezas de la Startup:
            </span>
          </div>
          <textarea
            className="textarea textarea-bordered w-full resize-none"
            id="strengths"
            name="strengths"
            value={values.strengths}
            onChange={(e) => handleInputChange("strengths", e.target.value)}
            placeholder="Ej: Equipo experimentado, tecnología innovadora."
          ></textarea>
        </label>
        <label className="form-control w-full col-span-2">
          <div className="label">
            <span className="label-text text-gray-400">Desafíos:</span>
          </div>
          <textarea
            className="textarea textarea-bordered w-full resize-none"
            id="challenges"
            name="challenges"
            value={values.challenges}
            onChange={(e) => handleInputChange("challenges", e.target.value)}
            placeholder="Ej: Competencia intensa, financiamiento limitado."
          ></textarea>
        </label>
      </div>
    </div>
  );
};

export default StepFive;
