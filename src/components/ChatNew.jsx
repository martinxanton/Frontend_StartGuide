import React from "react";

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



const ChatNew = ( {handleSetCurrentMessage, token } ) => {
  return (
    <div className="flex-grow flex flex-col justify-center gap-5 w-4/5 m-auto">
      <div>
        <h1 className="text-3xl font-bold">¡Hola! Soy tu asistente virtual</h1>
        <p className="text-base">¿En qué puedo ayudarte hoy?</p>
      </div>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-3 ">
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
      </div>
    </div>
  );
};

export default ChatNew;
