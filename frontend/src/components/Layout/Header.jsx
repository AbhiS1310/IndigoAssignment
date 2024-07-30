import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold text-gray-800">
          <img
            src="https://www.goindigo.in/content/dam/s6web/in/en/assets/logo/IndiGo_logo_2x.png"
            width="100px"
            alt="IndiGo"
          />
        </div>

        <NavLink to={"/login"} className="hidden md:flex items-center space-x-4">
          
          <button
            className="px-4 py-2 bg-custom-blue text-white rounded hover:bg-blue-600"
          >
            Admin Login
          </button>
         
      
        </NavLink>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <Link to={"/login"} className="md:hidden">
          <button
            className="w-full px-4 py-2 mt-2 bg-custom-blue text-white rounded"
          >
            Admin Login
          </button>
       
        </Link>
      )}

    </header>
  );
}

export default Header