'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons for hamburger and close

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg py-6 px-8">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold tracking-wider">Employee2nd</h1>
        
        {/* Hamburger Icon for mobile */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white text-3xl focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navbar Links - Hidden on mobile, visible on larger screens */}
        <ul className={`lg:flex lg:space-x-8 text-lg hidden`}>
          <li>
            <Link href="/home" className="text-white hover:bg-indigo-500 px-4 py-2 rounded transition duration-300 ease-in-out">
              Home
            </Link>
          </li>
          <li>
            <Link href="/tracker" className="text-white hover:bg-indigo-500 px-4 py-2 rounded transition duration-300 ease-in-out">
              Tracker
            </Link>
          </li>
          <li>
            <Link href="/responses" className="text-white hover:bg-indigo-500 px-4 py-2 rounded transition duration-300 ease-in-out">
              Responses
            </Link>
          </li>
          <li>
            <Link href="/resume-management" className="text-white hover:bg-indigo-500 px-4 py-2 rounded transition duration-300 ease-in-out">
              Resume Management
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu - appears when the hamburger is clicked */}
      {isOpen && (
        <div className="lg:hidden flex flex-col items-center justify-center space-y-4 mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 py-4">
          <ul className="space-y-4 text-lg text-center">
            <li>
              <Link href="/home" className="text-white hover:bg-indigo-500 px-4 py-2 rounded transition duration-300 ease-in-out" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/tracker" className="text-white hover:bg-indigo-500 px-4 py-2 rounded transition duration-300 ease-in-out" onClick={toggleMenu}>
                Tracker
              </Link>
            </li>
            <li>
              <Link href="/responses" className="text-white hover:bg-indigo-500 px-4 py-2 rounded transition duration-300 ease-in-out" onClick={toggleMenu}>
                Responses
              </Link>
            </li>
            <li>
              <Link href="/resume-management" className="text-white hover:bg-indigo-500 px-4 py-2 rounded transition duration-300 ease-in-out" onClick={toggleMenu}>
                Resume Management
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
