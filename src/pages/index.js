
import { FaGift, FaHeart, FaMap, FaCheckCircle } from "react-icons/fa";
import NavBar from "@/components/navbar";
import Hero from "@/components/hero";
import Card from "@/components/card";
import Footer from "@/components/Footer";
import HomeCardContent from "@/components/HomeCardContent";

const itens = [
  {
    icon: <FaHeart />,
    title: "oo",
    text: "Depois de 7 anos juntos, resolvemos dar mais um passo: juntar as escovas de dentes e transformar nossos sonhos em realidade! Esse novo começo só faz sentido ao lado de pessoas especiais, e por isso queremos dividir esse momento com cada um de vocês, que fizeram e fazem parte da nossa história.",
    color: "bg-white",
  },
  {
    icon: <FaMap />,
    title: "Local",
    text: "R. João Cecheto, 261 - Vila Cardim Matão - SP",
    color: "bg-orange-50",
    btnLink: "Ver Mapa",
    link: "https://maps.app.goo.gl/QF8dnGXLsY5HWb3W9",
  },

  {
    icon: <FaCheckCircle />,
    title: "Confirmar presença",
    text: "Por favor, confirme sua presença para celebrarmos juntos este momento único.",
    color: "bg-white",
    option: "Confirmar",
    link: "/confirmation",
    btnColor: "bg-orange-50 hover:cursor-pointer hover:opacity-60 hover:border-2 border-amber-400 font-mono text-sm px-8 py-4",
  },
  {
    icon: <FaGift />,
    title: "Lista de presentes",
    text: "O melhor presente é a sua presença. Se desejar nos mimar, preparamos uma lista especial.",
    color: "bg-orange-50",
    link: "/gifts",
    option: "Lista de presentes",
    btnColor: "bg-orange-100 hover:cursor-pointer hover:opacity-60 hover:border-2 border-amber-400 font-mono text-sm px-8 py-4",
  },
];


export default function Index() {
  return (
    <div className="">
      <NavBar />
      <div className="flex flex-col md:flex-row md:mt-25 mb-30 md:h-[80vh]">
        <div className="md:w-1/2 pt-15 md:pt-5 flex justify-center items-center">
          <Hero />
        </div>
        <div className="md:w-1/2 ">
          <Card>
            {itens.map((item, index) => (
              <div
                key={index}
                className={`${item.color} flex flex-col p-10 mt-10 mx-10 md:mx-30 items-center text-center justify-center`}
              >
                <h1 className="text-2xl">
                  {item.icon}
                </h1>

                <h1 className="text-xl md:text-2xl font-serif py-5">
                  {item.title}
                </h1>

                <h1 className="font-mono text-sm md:text-lg px-6 mb-10">
                  {item.text}
                </h1>

                {item.btnLink && (
                  <a className="text-blue-600 underline pt-10" href={item.link}>
                    {item.btnLink}
                  </a>
                )}
                {item.option && (
                  <a href={item.link} className={`${item.btnColor} hover:cursor-pointer hover:opacity-60 hover:border-2 border-amber-400 font-mono text-sm px-8 py-4`}>
                    {item.option}
                  </a>
                )}
              </div>
            ))}
          </Card>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full">
        <Footer />
      </div>
    </div>

  );
}
