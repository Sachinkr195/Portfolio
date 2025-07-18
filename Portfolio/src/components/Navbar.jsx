import React, { useState, useContext } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Menu, X } from 'lucide-react';
import LoginModal from './Loginin';
import axios from 'axios';
import { AppContext } from '../context/Appcontext';

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const { isLoggedin, setIsLoggedin, setAdmin, backendurl } = useContext(AppContext);

  const menuItems = [
    { name: "home", href: "home" },
    { name: "about", href: "about" },
    { name: "my work", href: "my-work" },
    { name: "review", href: "review" },
    { name: "contact", href: "contact" }
  ];

  const handleLogout = async () => {
    try {
      await axios.get(`${backendurl}/api/user/logout`, { withCredentials: true });
      setIsLoggedin(false);
      setAdmin(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <div className="bg-black text-white px-6 py-4 fixed top-0 left-0 w-full z-40 shadow-md">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            MyPortfolio
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-sm font-medium capitalize">
            {menuItems.map((item) => (
              <li
                key={item.href}
                onClick={() => setMenu(item.name)}
                className="relative cursor-pointer"
              >
                <AnchorLink
                  href={`#${item.href}`}
                  offset="20"
                  className={`transition hover:text-gray-400 ${menu === item.name ? 'text-gray-400' : ''}`}
                >
                  {item.name}
                </AnchorLink>
                {menu === item.name && (
                  <hr className="absolute -bottom-1 left-0 w-full border-t-2 border-purple-400" />
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Auth Button */}
          {isLoggedin ? (
            <button
              onClick={handleLogout}
              className="hidden md:block bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-full px-5 py-2 text-sm shadow-md transition duration-300"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="hidden md:block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold rounded-full px-5 py-2 text-sm shadow-md transition duration-300"
            >
              Login
            </button>
          )}

          {/* Hamburger for Mobile */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 text-sm font-medium capitalize bg-gray-900 p-4 rounded-xl shadow">
            {menuItems.map((item) => (
              <AnchorLink
                key={item.href}
                href={`#${item.href}`}
                offset="20"
                onClick={() => {
                  setMenu(item.name);
                  setIsOpen(false);
                }}
                className={`transition hover:text-gray-400 ${menu === item.name ? 'text-purple-400' : ''}`}
              >
                {item.name}
              </AnchorLink>
            ))}

            {/* Mobile Auth Button */}
            {isLoggedin ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full mt-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-full px-5 py-2 text-sm shadow-md transition duration-300"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowLogin(true);
                  setIsOpen(false);
                }}
                className="w-full mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold rounded-full px-5 py-2 text-sm shadow-md transition duration-300"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Navbar;
