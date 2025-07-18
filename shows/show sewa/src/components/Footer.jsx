import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gray-900 text-gray-200 pt-10 pb-6 mt-12">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-center gap-8">
      {/* Brand */}
      <div className="flex items-center mb-6 md:mb-0">
        <img src="/images/logo.jpeg" alt="ShowSewa Logo" className="h-10 w-10 rounded-full mr-3" />
        <span className="font-bold text-xl text-white">ShowSewa</span>
      </div>
      {/* Navigation */}
      <nav className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
        <Link to="/" className="hover:text-blue-400 transition">Home</Link>
        <Link to="/events" className="hover:text-blue-400 transition">Events</Link>
        <Link to="/bookings" className="hover:text-blue-400 transition">Bookings</Link>
        <Link to="/about" className="hover:text-blue-400 transition">About</Link>
        <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
      </nav>
      {/* Socials */}
      <div className="flex gap-4 items-center justify-center">
        <a href="#" className="hover:text-blue-400 transition" aria-label="Facebook"><FaFacebookF size={22} /></a>
        <a href="#" className="hover:text-pink-400 transition" aria-label="Instagram"><FaInstagram size={22} /></a>
        <a href="#" className="hover:text-blue-300 transition" aria-label="Twitter"><FaTwitter size={22} /></a>
      </div>
    </div>
    <div className="mt-8 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} ShowSewa. All rights reserved.
    </div>
  </footer>
);

export default Footer; 