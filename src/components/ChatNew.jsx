import React from "react";
import { useState, useEffect } from "react";

const ChatNew = ({ handleSetCurrentMessage, token }) => {

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

  const option = [
    {
      title:
        "¿Cuáles son las tendencias emergentes en mi industria y cómo pueden afectar a mi startup?",
      img: "https://www.cimec.es/wp-content/uploads/2022/04/Tendencias-de-mercado-1.png",
    },
    {
      title: "¿Cuáles son los pasos para validar mi idea de negocio?",
      img: "https://www.grandespymes.com.ar/wp-content/uploads/2019/11/validar-idea-de-negocio.jpg",
    },
    {
      title: "¿Cómo puedo construir un producto mínimo viable (MVP)?",
      img: "https://static.mercadonegro.pe/wp-content/uploads/2020/10/09150412/Producto-Minimo-Viable.jpg",
    },
    {
      title: "¿Qué estrategias puedo usar para crecer mi base de clientes?",
      img: "https://www.grandespymes.com.ar/wp-content/uploads/2020/10/Cuales-pueden-ser-tus-primeros-pasos-para-fortalecer-y-hacer-crecer-tu-cartera-de-clientes.jpg",
    },
  ];

  const [theme, setTheme] = useState("night");

  useEffect(() => {
    const div = document.getElementById("theme-id");
    //document.documentElement.setAttribute("data-theme", theme);
    div.setAttribute("data-theme", theme);
    // Guarda el tema seleccionado en el localStorage
    // asignar el valor de la variable theme a un div que tiene el data-theme
  }, [theme]);

  return (
    <div className="flex-grow flex flex-col pt-10 gap-10 px-24">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">¡Hola! Soy tu asistente virtual</h1>
        <p className="text-base">
          Para comenzar, selecciona el asesor que mejor se adapte a tus necesidades:
        </p>
      </div>
      <div className="grid grid-cols-5 gap-5">
        {personality.map((person, index) => (
          <div key={index} className="lg:tooltip" data-tip={person.description}>
              <div
                onClick={() => {
                  setTheme(person.theme);
                }}
                className="group py-8 px-8 flex flex-col drop-shadow-md cursor-pointer bg-base-100 hover:bg-secondary rounded-xl shadow-lg sm:py-4 sm:flex justify-top items-center gap-3 min-h-full"
              >
                <img
                  className="block mx-auto h-16 sm:mx-0 sm:shrink-0"
                  src={person.img}
                  alt="Woman's Face"
                />
                <div className="text-center space-y-2 sm:text-center">
                  <div className="space-y-0.5">
                    <p className="text-lg text-base-content group-hover:text-white font-semibold">
                      {person.name}
                    </p>
                    <p className="text-slate-500 group-hover:text-white font-normal">
                      {person.role}
                    </p>
                  </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/*<div className="grid xl:grid-cols-4 md:grid-cols-2 gap-3 ">
        {option.map((opt, index) => (
          <div
            key={index}
            onClick={() => {
              handleSetCurrentMessage(opt.title);
            }}
            className={`hover:border transition ease-in-out delay-150 duration-200 card w-48 bg-base-100 shadow-xl hover:-translate-y-1 cursor-pointer image-full`}
          >
            <figure>
              <img src={opt.img} />
            </figure>
            <div className="card-body p-6">
              <h2 className="card-title text-sm">{opt.title}</h2>
            </div>
          </div>
        ))}
      </div> */

export default ChatNew;
