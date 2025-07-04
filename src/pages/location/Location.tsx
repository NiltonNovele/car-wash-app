const Location = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat mt-16"
            style={{
                backgroundImage:
                    "url('https://i.ibb.co.com/TMWsr7f/car-is-being-washed-automatic-car-wash-36682-368241.jpg')",
            }}
        >
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-4xl w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Encontre um Car Wash Perto de Si
                </h1>

                {/* Mapa */}
                <div className="h-64 mb-6">
                    <img
                        src="https://i.ibb.co/7bz9Z2B/Screenshot-2024-09-09-213457.png"
                        alt="Mapa"
                        className="h-full w-full object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Lista de Localizações */}
                <div className="p-4">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">As Nossas Localizações</h2>
                    <ul className="space-y-4">
                        <li className="border-b pb-4">
                            <h3 className="text-lg font-medium text-gray-800">Lavagem de Carros Baixa</h3>
                            <p className="text-gray-600">Avenida 25 de Setembro, Baixa, Maputo</p>
                            <p className="text-gray-600">Telefone: (+258) 84 123 4567</p>
                            <a
                                href="https://www.google.com/maps/dir/?api=1&destination=Avenida+25+de+Setembro,+Maputo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Ver Direções
                            </a>
                        </li>
                        <li className="border-b pb-4">
                            <h3 className="text-lg font-medium text-gray-800">Lavagem de Carros Sommerchield</h3>
                            <p className="text-gray-600">Rua da Rádio, Sommerchield, Maputo</p>
                            <p className="text-gray-600">Telefone: (+258) 86 987 6543</p>
                            <a
                                href="https://www.google.com/maps/dir/?api=1&destination=Rua+da+Rádio,+Maputo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Ver Direções
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Location;
