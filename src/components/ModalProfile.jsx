import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.API_URL;

const ModalProfile = ({userProfile, show, handleCloseModalProfile}) => {
  const token = localStorage.getItem("token");
  if(!token) {
    return null;
  }

  const [formValues, setFormValues] = useState({
    startupName: "",
    description: "",
    industry: "",
    developmentStage: "",
    numberOfEmployees: "",
    location: "",
    mainGoals: "",
    neededResources: "",
    mainCompetitors: "",
  });

  useEffect(() => {
    setFormValues({
      startupName: userProfile.startupName,
      description: userProfile.description,
      industry: userProfile.industry,
      developmentStage: userProfile.developmentStage,
      numberOfEmployees: userProfile.numberOfEmployees,
      location: userProfile.location,
      mainGoals: userProfile.mainGoals,
      neededResources: userProfile.neededResources,
      mainCompetitors: userProfile.mainCompetitors,
      strengths: userProfile.strengths,
      challenges: userProfile.challenges,
    });
  }, []);

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

  

  const handleInputChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValues.startupName || !formValues.description || !formValues.industry || !formValues.developmentStage || !formValues.numberOfEmployees || !formValues.location || !formValues.mainGoals || !formValues.neededResources || !formValues.mainCompetitors || !formValues.strengths || !formValues.challenges) {
      console.log(formValues);
      alert("Por favor, completa todos los campos");
      return;
    } else {
      axios
      .put(`${apiUrl}/api/profile/`, formValues, { headers: { Authorization: `Bearer ${token}` }})
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    }
    handleCloseModalProfile();
  };
  
  if(!show) {
    return null;
  }  

  return (
    <dialog id="modal_profile" className="modal modal-open">
      <div className="modal-box h-4/5">
        <h3 className="font-bold text-lg">Perfil</h3>
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
                value={formValues.startupName}
                onChange={(e) =>
                  handleInputChange("startupName", e.target.value)
                }
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
                value={formValues.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
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
                value={formValues.industry}
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
                value={formValues.developmentStage}
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
            <label className="form-control w-full col-span-2">
              <div className="label">
                <span className="label-text text-gray-400">
                  Número aproximado de empleados:
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                className="range mt-2"
                step="5"
                value={formValues.numberOfEmployees}
                onChange={(e) =>
                  handleInputChange("numberOfEmployees", e.target.value)
                }
              />
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
                <span className="label-text text-gray-400">Ubicación</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full"
                id="location"
                name="location"
                value={formValues.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Ej: Lima, Perú."
              />
            </label>
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
                value={formValues.mainGoals}
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
                value={formValues.neededResources}
                onChange={(e) =>
                  handleInputChange("neededResources", e.target.value)
                }
                placeholder="Ej: Inversión de capital, talento técnico."
              ></textarea>
            </label>
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
                value={formValues.mainCompetitors}
                onChange={(e) =>
                  handleInputChange("mainCompetitors", e.target.value)
                }
                placeholder="Ej: Competitor A, Competitor B."
              ></textarea>
            </label>
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
            value={formValues.strengths}
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
            value={formValues.challenges}
            onChange={(e) => handleInputChange("challenges", e.target.value)}
            placeholder="Ej: Competencia intensa, financiamiento limitado."
          ></textarea>
        </label>
            <button className="btn btn-primary col-span-2" method="dialog" onClick={handleSubmit}>Guardar</button>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=> {handleCloseModalProfile()}}>
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalProfile;
