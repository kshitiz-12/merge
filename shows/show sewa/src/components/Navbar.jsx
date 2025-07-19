import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isAdmin = user && user.isAdmin;

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/images/logo.jpeg"
                alt="ShowSewa Logo"
                className="h-8 w-8 rounded-full mr-2"
              />
              <span className="font-bold text-xl text-gray-800">Showsewa</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <Link to="/events" className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse
            </Link>
            <Link to="/events" className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Now
            </Link>
            <Link to="/bookings" className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Bookings
            </Link>
            <Link to="/contact" className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contact
            </Link>
            
            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-4 ml-4">
                {isAdmin && (
                  <Link to="/admin" className="text-gray-700 font-semibold hover:text-blue-600 transition">Admin</Link>
                )}
                <span className="text-gray-700 font-semibold">{user.name || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold">Login / Sign Up</Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
            <Link to="/" className="flex items-center px-3 py-2 rounded text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <Link to="/events" className="flex items-center px-3 py-2 rounded text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse
            </Link>
            <Link to="/events" className="flex items-center px-3 py-2 rounded text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Now
            </Link>
            <Link to="/bookings" className="flex items-center px-3 py-2 rounded text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Bookings
            </Link>
            <Link to="/contact" className="flex items-center px-3 py-2 rounded text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contact
            </Link>
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="block mt-2 text-gray-700 font-semibold text-center hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>Admin</Link>
                )}
                <span className="block mt-2 text-gray-700 font-semibold text-center">{user.name || user.email}</span>
                <button
                  onClick={() => { setMenuOpen(false); handleLogout(); }}
                  className="block mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition font-semibold text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold text-center" onClick={() => setMenuOpen(false)}>Login / Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 