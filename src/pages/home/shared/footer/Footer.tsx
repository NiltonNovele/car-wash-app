import { useState } from 'react';
import { FaTwitter, FaDribbble, FaBehance, FaYoutube } from 'react-icons/fa';

const Footer = () => {

    const [currentDateTime] = useState(new Date());
    const year = currentDateTime.getFullYear();

    return (
        <footer className="bg-black text-gray-300 py-10 px-5 font-serif">
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* Secção Sobre */} 
                <div>
                    <h5 className="text-white font-semibold mb-4">SOBRE</h5>
                    <p className="text-sm">
                        A (Vamos escolher ainda) é um serviço ecológico de lavagem e detalhamento manual de carros, com base em Maputo.
                    </p>
                    <img
                        src="/logo.png"
                        alt="Logótipo"
                        className="h-10 mt-4"
                    />
                </div>

                {/* Secção Serviços */}
                <div>
                    <h5 className="text-white font-semibold mb-4">SERVIÇOS</h5>
                    <ul className="space-y-2">
                        <li>Lavagem Manual Exterior</li>
                        <li>Secagem Manual com Toalha</li>
                        <li>Aplicação de Produto nos Pneus</li>
                        <li>Brilho nas Jantes</li>
                        <li>Aspirador Interior</li>
                        <li>Cera Manual com Selante</li>
                    </ul>
                </div>

                {/* Secção Empresa */}
                <div>
                    <h5 className="text-white font-semibold mb-4">EMPRESA</h5>
                    <ul className="space-y-2">
                        <li>Sobre Nós</li>
                        <li>Blogue</li>
                        <li>Galeria</li>
                        <li>Os Nossos Serviços</li>
                        <li>Marca a Tua Lavagem</li>
                        <li>Contacto</li>
                    </ul>
                </div>

                {/* Secção Newsletter */}
                <div>
                    <h5 className="text-white font-semibold mb-4">NEWSLETTER</h5>
                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="Endereço de e-mail:"
                            className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button className="px-4 py-2 w-full bg-gray-700 text-white rounded hover:bg-green-500 transition duration-300">
                            Subscrever
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-6 text-center py-4 space-y-8">
                {/* Ícones de Redes Sociais */}
                <div className="flex space-x-6 text-gray-400 justify-center text-xl">
                    <FaTwitter className="hover:text-white cursor-pointer" />
                    <FaDribbble className="hover:text-white cursor-pointer" />
                    <FaBehance className="hover:text-white cursor-pointer" />
                    <FaYoutube className="hover:text-white cursor-pointer" />
                </div>

                <p className="text-sm text-gray-500 mt-4 md:mt-0">
                    Desenvolvido Pela SyncTechX | KinesisMz © {year} . Todos os direitos reservados
                </p>
            </div>
        </footer>
    );
};

export default Footer;
