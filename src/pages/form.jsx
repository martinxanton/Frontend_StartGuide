import React, { useState } from "react";
import axios from "axios";

function UserProfileForm() {
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
    axios.post('http://localhost:3000/api/user-profile', formData)
      .then(response => {
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
      })
      .catch(error => {
        // Manejo de errores
        console.error(error);
      });
  };

  return (
    <div className="h-100">
      <form className="row gap-2 justify-content-between" onSubmit={handleSubmit}>
        <div className="col-md-5">
          <label htmlFor="userName" className="form-label">
            Nombre del Usuario
          </label>
          <input
            type="text"
            className="form-control"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Nombre del Usuario"
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="startupName" className="form-label">
            Nombre de la Startup
          </label>
          <input
            type="text"
            className="form-control"
            id="startupName"
            name="startupName"
            value={formData.startupName}
            onChange={handleChange}
            placeholder="Nombre de la Startup"
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="description" className="form-label">
            Descripción Breve de la Startup
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción Breve de la Startup"
          ></textarea>
        </div>
        <div className="col-md-5">
          <label htmlFor="mainGoals" className="form-label">
            Objetivos Principales de la Startup
          </label>
          <textarea
            className="form-control"
            id="mainGoals"
            name="mainGoals"
            value={formData.mainGoals}
            onChange={handleChange}
            placeholder="Objetivos Principales de la Startup"
          ></textarea>
        </div>
        <div className="col-md-3">
          <label htmlFor="industry" className="form-label">
            Industria
          </label>
          <select
            className="form-select"
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
            <option value="Comercio Electrónico">Comercio Electrónico</option>
            <option value="Entretenimiento">Entretenimiento</option>
            <option value="Turismo">Turismo</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="developmentStage" className="form-label">
            Etapa de Desarrollo
          </label>
          <select
            className="form-select"
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
        <div className="col-md-3">
          <label htmlFor="numberOfEmployees" className="form-label">
            Número de Empleados
          </label>
          <select
            className="form-select"
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

        <div className="col-md-5">
          <label htmlFor="location" className="form-label">
            Ubicación Geográfica
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ubicación Geográfica"
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="neededResources" className="form-label">
            Recursos Necesarios
          </label>
          <textarea
            className="form-control"
            id="neededResources"
            name="neededResources"
            value={formData.neededResources}
            onChange={handleChange}
            placeholder="Recursos Necesarios"
          ></textarea>
        </div>

        <div className="col-md-3">
          <label htmlFor="mainCompetitors" className="form-label">
            Competidores Principales
          </label>
          <textarea
            className="form-control"
            id="mainCompetitors"
            name="mainCompetitors"
            value={formData.mainCompetitors}
            onChange={handleChange}
            placeholder="Competidores Principales"
          ></textarea>
        </div>

        <div className="col-md-4">
          <label htmlFor="strengths" className="form-label">
            Puntos Fuertes de la Startup
          </label>
          <textarea
            className="form-control"
            id="strengths"
            name="strengths"
            value={formData.strengths}
            onChange={handleChange}
            placeholder="Puntos Fuertes de la Startup"
          ></textarea>
        </div>

        <div className="col-md-3">
          <label htmlFor="challenges" className="form-label">
            Desafíos Actuales
          </label>
          <textarea
            className="form-control"
            id="challenges"
            name="challenges"
            value={formData.challenges}
            onChange={handleChange}
            placeholder="Desafíos Actuales"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar Perfil
        </button>
      </form>
    </div>
  );
}

export default UserProfileForm;
