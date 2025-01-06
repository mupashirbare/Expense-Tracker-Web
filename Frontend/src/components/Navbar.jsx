import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white shadow-lg fixed top-0 left-0 right-0">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Expense Tracker</h1>
        <button
          className="md:hidden text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✖' : '☰'}
        </button>
        <ul
          className={`md:flex md:space-x-6 space-y-4 md:space-y-0 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <li><Link to="/" className="hover:text-blue-700">Home</Link></li>
          <li><Link to="/" className="hover:text-blue-700">Services</Link></li>
          <li><Link to="/login" className="hover:text-blue-700">Login in</Link></li>
          <li><Link to="/register" className="hover:text-blue-700">Sign Up</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
