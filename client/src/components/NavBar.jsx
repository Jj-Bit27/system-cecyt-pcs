import { useLocation, NavLink } from "react-router-dom";
import { FiHome, FiMonitor, FiTool } from "react-icons/fi";
import Logo from "../assets/logo_cecyt.png";
import { MdInventory } from "react-icons/md";

function Navbar() {
  const { pathname } = useLocation();

  const navItems = [
    { href: "/", label: "Inicio", icon: <FiHome className="w-5 h-5" /> },
    {
      href: "/articles",
      label: "Inventario",
      icon: <MdInventory className="w-5 h-5" />,
    },
    {
      href: "/computers",
      label: "Computadoras",
      icon: <FiMonitor className="w-5 h-5" />,
    },
    {
      href: "/maintenance/new",
      label: "Nuevo Mantenimiento",
      icon: <FiTool className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Top navbar - only shows logo and company name */}
      <header className="fixed top-0 left-0 right-0 bg-emerald-500 border-b border-gray-200 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <NavLink to="/" className="flex items-center">
              <div className="relative w-12 h-12 mr-2 overflow-hidden rounded-md">
                <img
                  src={Logo}
                  alt="Logo de la empresa"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-xl">
                CECyTT Registro De Computadoras
              </span>
            </NavLink>

            {/* Desktop navigation */}
            <nav className="hidden md:flex ml-auto space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={`flex items-center ${
                    pathname === item.href
                      ? "text-gray-900"
                      : "text-white hover:text-gray-700"
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Bottom mobile navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 md:hidden">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center justify-center w-full h-full ${
                pathname === item.href
                  ? "text-emerald-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
