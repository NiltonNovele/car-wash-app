import { FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Address = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-12 lg:h-64 items-center gap-10 lg:gap-0 bg-white shadow-md">
            {/* Secção de Contacto Telefónico */}
            <div className="flex items-center space-x-4">
                <FaPhone className="text-blue-500 text-3xl" />
                <div>
                    <h3 className="text-lg font-semibold">LIGUE PARA NÓS</h3>
                    <p className="text-gray-600">(+258) 84 123 4567</p>
                    <p className="text-gray-600">(+258) 86 987 6543</p>
                </div>
            </div>
            
            {/* Secção de Morada */}
            <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-blue-500 text-3xl" />
                <div>
                    <h3 className="text-lg font-semibold">A NOSSA MORADA</h3>
                    <p className="text-gray-600">Av. Julius Nyerere, Nº 2450</p>
                    <p className="text-gray-600">Maputo, Moçambique</p>
                </div>
            </div>

            {/* Secção de Horário de Funcionamento */}
            <div className="flex items-center space-x-4">
                <FaClock className="text-blue-500 text-3xl" />
                <div>
                    <h3 className="text-lg font-semibold">HORÁRIO</h3>
                    <p className="text-gray-600">Segunda – Sexta: 8h – 18h</p>
                    <p className="text-gray-600">Sábado: 8h – 15h</p>
                </div>
            </div>
        </div>
    );
};

export default Address;
