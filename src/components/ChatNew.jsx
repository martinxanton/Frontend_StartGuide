import React from "react";
import { useState, useEffect } from "react";

const ChatNew = ({ handleSetCurrentMessage, handleBotId }) => {
  const personality = [
    {
      name: "Finn",
      role: "Asesor general de startups",
      img: "src/assets/finn.png",
      theme: "night",
      description:
        "Experto en estrategias de lanzamiento de startups, desarrollo de productos y crecimiento empresarial.",
      questions: [
        "¿Cómo puedo validar mi idea de negocio antes de lanzarla al mercado?",
        "¿Qué pasos debo seguir para construir un producto mínimo viable (MVP)?",
        "¿Qué estrategias puedo usar para crecer mi base de clientes de manera efectiva?",
        "¿Cómo puedo mejorar la visibilidad de mi startup en línea?",
      ],
    },
    {
      name: "Mark",
      role: "Asesor de Mercado",
      img: "src/assets/mark.png",
      theme: "dracula",
      description:
        "Especialista en investigación de mercado, análisis de competencia y tendencias de la industria.",
      questions: [
        "¿Cómo puedo analizar a mis competidores directos e indirectos en el mercado?",
        "¿Qué tendencias emergentes debo considerar en mi industria?",
        "¿Cómo puedo identificar mi mercado objetivo de manera más efectiva?",
        "¿Qué estrategias de entrada al mercado me recomendarías para mi producto?",
      ],
    },
    {
      name: "Brianna",
      role: "Generadora de Planes de Negocio",
      img: "src/assets/brianna.png",
      theme: "dark",
      description:
        "Experta en estructuración y redacción de planes de negocio completos, incluyendo proyecciones financieras y análisis de mercado.",
      questions: [
        "¿Cómo estructuro un plan de negocio sólido para mi startup?",
        "¿Qué información necesito para hacer proyecciones financieras precisas?",
        "¿Cómo realizo un análisis de mercado detallado para mi plan de negocio?",
        "¿Qué estrategias de crecimiento debería incluir en mi plan de negocio?",
      ],
    },
    {
      name: "Maya",
      role: "Asesora de Marketing",
      img: "src/assets/maya.png",
      theme: "sunset",
      description:
        "Especialista en estrategias de marketing digital, campañas en redes sociales, SEO y análisis de rendimiento.",
      questions: [
        "¿Cómo creo una estrategia de marketing digital efectiva para mi startup?",
        "¿Qué técnicas de SEO debo utilizar para mejorar la visibilidad de mi sitio web?",
        "¿Cómo puedo diseñar una campaña en redes sociales que genere engagement?",
        "¿Qué herramientas de análisis de rendimiento recomendarías para mis campañas de marketing?",
      ],
    },
    {
      name: "Riley",
      role: "Asesor Financiero",
      img: "src/assets/riley.png",
      theme: "forest",
      description:
        "Experto en gestión financiera, presupuestos, búsqueda de fondos y optimización de recursos para startups.",
      questions: [
        "¿Cómo puedo crear un presupuesto inicial para mi startup?",
        "¿Cuáles son las mejores estrategias para buscar financiación para mi negocio?",
        "¿Qué métodos puedo usar para optimizar el uso de mis recursos financieros?",
        "¿Cómo interpreto y utilizo mis estados financieros para tomar decisiones estratégicas?",
      ],
    },
  ];

  const [selectedPersonality, setSelectedPersonality] = useState(null);


  return (
    <div className="flex-grow flex flex-col pt-4 gap-10 px-14">
      {!selectedPersonality ? (
        <>
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">
              ¡Hola! Soy tu asistente virtual
            </h1>
            <p className="text-base">
              Para comenzar, selecciona el asesor que mejor se adapte a tus
              necesidades:
            </p>
          </div>
          <div className="grid xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-5 ">
            {personality.map((person, index) => (
              <div
                key={index}
                className="lg:tooltip "
                data-tip={person.description}
              >
                <div
                  onClick={() => {
                    //setTheme(person.theme);
                    setSelectedPersonality(person);
                    handleBotId(index + 1);
                    console.log("botId " + (index + 1));
                  }}
                  className="group py-8 px-8 flex flex-col drop-shadow-none cursor-pointer bg-base-100 hover:bg-secondary rounded-lg sm:py-4 sm:flex justify-top items-center gap-3 min-h-full"
                >
                  <img
                    className="block mx-auto h-16 sm:mx-0 sm:shrink-0"
                    src={person.img}
                    alt={person.name}
                  />
                  <div className="text-center space-y-2 sm:text-center">
                    <div className="space-y-0.5">
                      <p className="text-lg text-base-content group-hover:text-white font-semibold">
                        {person.name}
                      </p>
                      <p className="text-slate-400 group-hover:text-white font-normal">
                        {person.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex gap-4 items-center">
            <img
              className="block mx-auto h-16 sm:mx-0 sm:shrink-0"
              src={selectedPersonality.img}
            />
            <div>
            <h2 className="text-2xl font-bold">
              {"Hola, me llamo " + selectedPersonality.name}
            </h2>
            <p className="text-sm">{"" + selectedPersonality.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {selectedPersonality.questions.map((question, index) => (
              <button
                key={index}
                className=" h-16 btn btn-secondary text-white"
                onClick={() => handleSetCurrentMessage(question)}
              >
                {question}
              </button>
            ))}
          </div>
          <button
            className="btn mt-4 py-2 px-4 btn-primary text-white rounded-md"
            onClick={() => setSelectedPersonality(null)}
          >
            Volver
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatNew;
