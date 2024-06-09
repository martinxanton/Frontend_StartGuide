import React, { useEffect, useState } from "react";
import { Stepper, StepOne, StepTwo, StepThree, StepFour, StepFive } from "./modalFormsComponents";

const ModalForms = ({ show, handleClose }) => {
  /*
  const [formData, setFormData] = useState({
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
  */

  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {

    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    if (activeStep === 0) {
      prevButton.classList.add("invisible");
      prevButton.classList.remove("visible");
    }
    else {
      prevButton.classList.add("visible");
      prevButton.classList.remove("invisible");
    }
  }, [activeStep]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado");
    handleClose();
  }

  /*
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/user-profile", formData)
      .then((response) => {
        // Manejo de respuesta exitosa
        console.log(response.data);
        setFormData({
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
      .catch((error) => {
        // Manejo de errores
        console.error(error);
      });
  
  };
  */
  if (!show) return null;
  return (
    <div>
      <input
        type="checkbox"
        checked
        readOnly
        id="my_modal_7"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box w-3/5 h-5/6 max-w-full p-0 flex gap-7">
          <div className="w-1/3 flex items-center justify-center p-5">
            <Stepper index={activeStep}/>
          </div>
          <div className="w-2/3 flex flex-col justify-between bg-base-300 px-12 py-10">
            {activeStep === 0 ? (<StepOne />) : activeStep === 1 ? (<StepTwo />) : activeStep === 2 ? (<StepThree />) : activeStep === 3 ? (<StepFour />) : activeStep === 4 ? (<StepFive />) : null}
            <div id="sec-buttons" className="flex justify-between pt-4">
              <button id="prevButton" className="btn btn-secondary btn-circle invisible" onClick={prevStep}>
                <span className="material-symbols-rounded">chevron_left</span>
              </button>
              <button id="nextButton" className={`btn btn-secondary ${activeStep === 4 ? "rounded-full" : "btn-circle"}`} onClick={activeStep === 4 ? handleSubmit : nextStep } >
                {activeStep === 4 ? (<span>Finalizar</span>) : (<span className="material-symbols-rounded">chevron_right</span>)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/*<input type="checkbox" checked readOnly id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box w-2/3 max-w-full">
          <h2 className="text-2xl font-semibold pb-5">
            Hablemos de tu Startup
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4" 
          >
            <div  className="col-start-1 col-end-2">
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
                className="textarea textarea-bordered w-full resize-none"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descripción Breve de la Startup"
              ></textarea>
            </div>
            <div>
              <textarea
                className="textarea textarea-bordered w-full resize-none"
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
                className="textarea textarea-bordered w-full resize-none"
                id="neededResources"
                name="neededResources"
                value={formData.neededResources}
                onChange={handleChange}
                placeholder="Recursos Necesarios"
              ></textarea>
            </div>
            <div>
              <textarea
                className="textarea textarea-bordered w-full resize-none"
                id="mainCompetitors"
                name="mainCompetitors"
                value={formData.mainCompetitors}
                onChange={handleChange}
                placeholder="Competidores Principales"
              ></textarea>
            </div>
            <div>
              <textarea
                className="textarea textarea-bordered w-full resize-none"
                id="strengths"
                name="strengths"
                value={formData.strengths}
                onChange={handleChange}
                placeholder="Puntos Fuertes de la Startup"
              ></textarea>
            </div>
            <div>
              <textarea
                className="textarea textarea-bordered w-full resize-none"
                id="challenges"
                name="challenges"
                value={formData.challenges}
                onChange={handleChange}
                placeholder="Desafíos Actuales"
              ></textarea>
            </div>
          </form>
        </div>
        
      </div> */

export default ModalForms;
