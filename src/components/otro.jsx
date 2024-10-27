import React, { useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.API_URL;
function ModalForm({ show, handleClose }) {
  const [formData, setFormData] = useState({
    userName: "",
    startupName: "",
    description: "",
    industry: "",
    developmentStage: "",
    numberOfEmployees: "",
    location: "",
    mainGoals: "",
    neededResources: "",
    mainCompetitors: "",
    strengths: "",
    challenges: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`https://${apiUrl}/api/user-profile`, formData)
      .then((response) => {
        // Manejo de respuesta exitosa
        console.log(response.data);
        setFormData({
          userName: "",
          startupName: "",
          description: "",
          industry: "",
          developmentStage: "",
          numberOfEmployees: "",
          location: "",
          mainGoals: "",
          neededResources: "",
          mainCompetitors: "",
          strengths: "",
          challenges: "",
        });
        handleClose(); // Cierra el modal después de enviar el formulario
      })
      .catch((error) => {
        // Manejo de errores
        console.error(error);
      });
  };

  if (!show) return null;

  return (
    <div  className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden w-full max-w-4xl p-8">
        <div className="pb-5 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Configuración y Personalización de Perfil
          </h2>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <input
                type="text"
                className="input input-bordered w-full"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Nombre del Usuario"
              />
            </div>
            <div>
              <input
                type="text"
                className="input input-bordered w-full"
                id="startupName"
                name="startupName"
                value={formData.startupName}
                onChange={handleChange}
                placeholder="Nombre de la Startup"
              />
            </div>
            <div>
              <textarea
                className="textarea textarea-bordered w-full"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descripción Breve de la Startup"
              ></textarea>
            </div>
            <div>
              <textarea
                className="textarea textarea-bordered w-full"
                id="mainGoals"
                name="mainGoals"
                value={formData.mainGoals}
                onChange={handleChange}
                placeholder="Objetivos Principales de la Startup"
              ></textarea>
            </div>
            <div>
              <select
                className="select select-bordered w-full"
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              >
                <option value="">Selecciona la Industria</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Salud">Salud</option>
                <option value="Educación">Educación</option>
                <option value="Finanzas">Finanzas</option>
                <option value="Comercio Electrónico">
                  Comercio Electrónico
                </option>
                <option value="Entretenimiento">Entretenimiento</option>
                <option value="Turismo">Turismo</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div>
              <select
                className="select select-bordered w-full"
                id="developmentStage"
                name="developmentStage"
                value={formData.developmentStage}
                onChange={handleChange}
              >
                <option value="">Selecciona la Etapa de Desarrollo</option>
                <option value="Idea">Idea</option>
                <option value="Prototipo">Prototipo</option>
                <option value="Producto Mínimo Viable (MVP)">
                  Producto Mínimo Viable (MVP)
                </option>
                <option value="Crecimiento Inicial">Crecimiento Inicial</option>
                <option value="Escalamiento">Escalamiento</option>
                <option value="Consolidación">Consolidación</option>
              </select>
            </div>
            <div>
              <select
                className="select select-bordered w-full"
                id="numberOfEmployees"
                name="numberOfEmployees"
                value={formData.numberOfEmployees}
                onChange={handleChange}
              >
                <option value="">Número de Empleados</option>
                <option value="1-5">1-5</option>
                <option value="6-10">6-10</option>
                <option value="11-20">11-20</option>
                <option value="21-50">21-50</option>
                <option value="Más de 50">Más de 50</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                className="input input-bordered w-full"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ubicación Geográfica"
              />
            </div>
            <div>
              <textarea
                className="textarea textarea-bordered w-full"
                id="neededResources"
                name="neededResources"
                value={formData.neededResources}
                onChange={handleChange}
                placeholder="Recursos Necesarios"
              ></textarea>
            </div>
            <div>
              <textarea
                className="textarea textarea-bordered w-full"
                id="mainCompetitors"
                name="mainCompetitors"
                value={formData.mainCompetitors}
                onChange={handleChange}
                placeholder="Competidores Principales"
              ></textarea>
            </div>
            <div>
              <textarea
                className="textarea textarea-bordered w-full"
                id="strengths"
                name="strengths"
                value={formData.strengths}
                onChange={handleChange}
                placeholder="Puntos Fuertes de la Startup"
              ></textarea>
            </div>
            <div>
              <textarea
                className="textarea textarea-bordered w-full"
                id="challenges"
                name="challenges"
                value={formData.challenges}
                onChange={handleChange}
                placeholder="Desafíos Actuales"
              ></textarea>
            </div>
            <button onClick={handleSubmit} className="btn btn-primary col-span-2">
              Guardar Perfil
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalForm;
