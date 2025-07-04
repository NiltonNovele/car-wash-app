import { useState } from "react";
import ServiceCard from "./ServiceCard";

const FeaturedServices = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [veiculoSelecionado, setVeiculoSelecionado] = useState("Todos");

  const categorias = ["Todos", "LAVAGEM & CERA", "DETALHAMENTO", "MANUTENÇÃO"];
  const tiposDeVeiculo = [
    "Todos",
    "Citadino",
    "Sedan/Carrinha",
    "Sedan Luxo",
    "SUV Crossover",
  ];

  const servicos = [
    {
      title: "LAVAGEM EXPRESSO",
      price: "MZN 600",
      duration: "25 Minutos",
      description: "Ver o que está incluído",
      linkText: "Ver o que está incluído",
      link: "/services/express-car-wash",
      category: "LAVAGEM & CERA",
      vehicleType: "Citadino",
    },
    {
      title: "LAVAGEM & CERA EXPRESSO",
      price: "MZN 1400",
      duration: "1 hora e 15 minutos",
      description: "Ver o que está incluído",
      linkText: "Ver o que está incluído",
      link: "/services/express-car-wash-wax",
      category: "LAVAGEM & CERA",
      vehicleType: "Sedan/Carrinha",
    },
    {
      title: "LAVAGEM & CERA DELUXE",
      price: "MZN 1600",
      duration: "1 hora e 30 minutos",
      description: "Ver o que está incluído",
      linkText: "Ver o que está incluído",
      link: "/services/deluxe-car-wash-wax",
      category: "LAVAGEM & CERA",
      vehicleType: "Sedan/Carrinha",
    },
    {
      title: "LAVAGEM & CERA PREMIUM",
      price: "MZN 1800",
      duration: "1 hora e 45 minutos",
      description: "Ver o que está incluído",
      linkText: "Ver o que está incluído",
      link: "/services/premium-car-wash-wax",
      category: "LAVAGEM & CERA",
      vehicleType: "SUV",
    },
    {
      title: "LAVAGEM & CERA COMPLETA",
      price: "MZN 2000",
      duration: "2 horas",
      description: "Ver o que está incluído",
      linkText: "Ver o que está incluído",
      link: "/services/ultimate-car-wash-wax",
      category: "LAVAGEM & CERA",
      vehicleType: "SUV",
    },
    {
      title: "LAVAGEM & CERA BÁSICA",
      price: "MZN 1200",
      duration: "1 hora",
      description: "Ver o que está incluído",
      linkText: "Ver o que está incluído",
      link: "/services/basic-car-wash-wax",
      category: "LAVAGEM & CERA",
      vehicleType: "Sedan/Carrinha",
    },
  ];

  const servicosFiltrados = servicos.filter(
    (servico) =>
      (categoriaSelecionada === "Todos" ||
        servico.category === categoriaSelecionada) &&
      (veiculoSelecionado === "Todos" ||
        servico.vehicleType === veiculoSelecionado)
  );

  return (
    <section
      className="relative min-h-screen w-full bg-cover bg-center flex flex-col justify-center items-center py-10 lg:py-16"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/Z6z7zH2/man-cleaning-red-sports-car-with-power-washer-rainy-afternoon-garage-area-1090747-488.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Secção de Categorias */}
        <div className="mb-8 space-y-4">
          <div className="flex justify-center mb-4 gap-2">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaSelecionada(categoria)}
                className={`lg:px-4 px-2 lg:text-base text-[8px] py-1 lg:py-2 rounded-full border-2 ${
                  categoriaSelecionada === categoria
                    ? "bg-green-500 text-white"
                    : "text-green-500 border-green-500"
                } transition duration-300`}
              >
                {categoria}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            {tiposDeVeiculo.map((tipo) => (
              <button
                key={tipo}
                onClick={() => setVeiculoSelecionado(tipo)}
                className={`lg:px-4 px-2 lg:text-base text-[8px] py-1 lg:py-2 rounded-full border-2 ${
                  veiculoSelecionado === tipo
                    ? "bg-green-500 text-white"
                    : "text-green-500 border-green-500"
                } transition duration-300`}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>

        {/* Cartões de Serviço */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicosFiltrados.map((servico, index) => (
            <ServiceCard
              key={index}
              title={servico.title}
              price={servico.price}
              duration={servico.duration}
              description={servico.description}
              linkText={servico.linkText}
              link={servico.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
