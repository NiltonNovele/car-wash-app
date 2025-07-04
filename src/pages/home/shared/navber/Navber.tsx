import { useState, useEffect, useRef } from "react";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { TbPhoneCall } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";
import { logout } from "../../../../redux/features/auth/AuthSlice";

const Navber = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const userRole = user?.role;
  const isLoggedIn = !!user;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const navLinks = [
    { name: "INÍCIO", path: "/" },
    { name: "SERVIÇOS", path: "/services" },
    { name: "LOCALIZAÇÃO", path: "/location" },
    { name: "MARCAR", path: "/booking" },
    ...(isLoggedIn
      ? userRole === "admin"
        ? [{ name: "PAINEL ADMIN", path: "/admin" }]
        : [{ name: "PAINEL DO UTILIZADOR", path: "/user" }]
      : []),
  ];

  return (
    <nav className="bg-black w-full py-4 px-6 flex items-center justify-between top-0 left-0 z-40 fixed font-serif">
      {/* Secção do Logótipo */}
      <Link to="/">
        <div className="flex items-center space-x-4">
          <img
            src="/logo.png"
            alt="Logótipo"
            className="lg:h-10 h-5"
          />
        </div>
      </Link>

      {/* Ligações de navegação para ecrãs maiores */}
      <ul className={`hidden lg:flex space-x-8 text-white`}>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link to={link.path} className="hover:text-gray-400 block py-2">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Secção de Contacto */}
      <div className="flex items-center space-x-4 lg:mr-0 mr-5">
        <Link
          to={"/"}
          className="flex items-center space-x-2 hover:border hover:border-green-500 p-1 rounded-lg"
        >
          <TbPhoneCall className="text-green-500 text-lg" />
          <span className="text-white">Ligar</span>
        </Link>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="hidden lg:flex items-center space-x-2 text-white hover:border hover:border-green-500 p-1 rounded-lg"
          >
            <IoMdLogOut className="text-2xl text-green-500 hover:transition-transform hover:scale-x-110" />
            <span>Sair</span>
          </button>
        ) : (
          <Link
            to={"/login"}
            className="hidden lg:flex items-center space-x-2 text-white hover:border hover:border-green-500 p-1 rounded-lg"
          >
            <IoMdLogIn className="text-2xl text-green-500 hover:transition-transform hover:scale-x-110" />
            <span>Entrar</span>
          </Link>
        )}
      </div>

      {/* Menu Mobile */}
      <div className="lg:hidden relative">
        {/* Botão do Menu */}
        <button
          className="text-2xl text-white focus:outline-none"
          onClick={toggleMenu}
        >
          &#9776;
        </button>

        {/* Menu Dropdown */}
        <div
          ref={dropdownRef}
          className={`absolute top-full right-0 mt-2 w-56 bg-green-500 rounded-lg shadow-lg transition-transform duration-300 ease-in-out ${
            isOpen ? "block opacity-100" : "hidden opacity-0"
          }`}
          style={{ zIndex: 1000 }}
        >
          <ul className="flex flex-col items-start space-y-2 text-white py-4 px-6">
            {navLinks.map((link) => (
              <li key={link.name} className="w-full">
                <Link
                  to={link.path}
                  className="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {isLoggedIn ? (
              <li className="w-full">
                <button
                  onClick={handleLogout}
                  className="block py-2 px-4 rounded-lg text-white hover:bg-green-600 transition duration-300 w-full text-left"
                >
                  Sair
                </button>
              </li>
            ) : (
              <li className="w-full">
                <Link
                  to={"/login"}
                  className="block py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 w-full text-left"
                  onClick={() => setIsOpen(false)}
                >
                  Entrar
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navber;
