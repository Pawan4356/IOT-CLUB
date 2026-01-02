import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
  ]
  
  const navLinkClass = ({ isActive }) =>
    `text-white font-mono font-medium rounded-lg text-sm px-4 py-2.5 duration-200 focus:outline-none block text-center
    ${isActive ? "bg-[#6F4A8E]" : "bg-gray-600 hover:bg-[#6F4A8E]"}
    focus:ring-4 focus:ring-purple-400`;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-[#221F3B] shadow-purple-200 border-gray-700 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl">
          <Link to="/" className="flex items-center">
            <img
              src="/IOTHeaderLogo.png"
              className="mr-3 h-12 sm:h-14 md:h-15"
              alt="Logo"
            />
          </Link>
          
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-[#EBEBEB] rounded-lg lg:hidden hover:bg-[#6F4A8E] focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-controls="mobile-menu-2"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {!isMenuOpen ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            )}
          </button>

          <div
            className={`${isMenuOpen ? 'block' : 'hidden'} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 mb-4 lg:mb-0 font-mono font-medium lg:flex-row lg:space-x-4 lg:mt-0 space-y-2 lg:space-y-0">
              {navItems.map(({ name, path }) => (
                <li key={path}>
                  <NavLink to={path} className={navLinkClass} onClick={closeMenu}>
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}