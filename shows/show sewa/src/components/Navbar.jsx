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
            <Link to="/">
              <img
                src="/images/logo.jpeg"
                alt="ShowSewa Logo"
                className="h-10 w-10 rounded-full mr-2"
              />
            </Link>
            <span className="font-bold text-xl text-gray-800">ShowSewa</span>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</Link>
            <Link to="/events" className="text-gray-700 hover:text-blue-600 font-medium transition">Events</Link>
            <Link to="/bookings" className="text-gray-700 hover:text-blue-600 font-medium transition">Bookings</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">Contact</Link>
            {user ? (
              <>
                <Link to="/profile" className="ml-4 text-gray-700 font-semibold hover:text-blue-600 transition">Profile</Link>
                {isAdmin && (
                  <Link to="/admin" className="ml-2 text-gray-700 font-semibold hover:text-blue-600 transition">Admin</Link>
                )}
                <span className="ml-2 text-gray-700 font-semibold">{user.name || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold">Login / Sign Up</Link>
              </>
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
            <Link to="/" className="block px-3 py-2 rounded text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/events" className="block px-3 py-2 rounded text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>Events</Link>
            <Link to="/bookings" className="block px-3 py-2 rounded text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>Bookings</Link>
            <Link to="/about" className="block px-3 py-2 rounded text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/contact" className="block px-3 py-2 rounded text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>Contact</Link>
            {user ? (
              <>
                <Link to="/profile" className="block mt-2 text-gray-700 font-semibold text-center hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>Profile</Link>
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