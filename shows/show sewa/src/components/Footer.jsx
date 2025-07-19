import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gray-900 text-white pt-10 pb-6">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Left Column - Showsewa Information */}
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-orange-500 w-8 h-8 rounded mr-2 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-xl text-brand-maroon">
              Show<span className="font-devanagari">सेवा</span>
            </span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Nepal's simple and secure platform for booking tickets to movies, concerts, and live events. No queues, no hassle—just fast, reliable ticketing in a few clicks.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-300 hover:text-orange-500 transition" aria-label="Facebook">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-gray-300 hover:text-orange-500 transition" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-300 hover:text-orange-500 transition" aria-label="Twitter">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Middle Column - Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <div className="space-y-2">
            <Link to="/" className="block text-gray-300 hover:text-orange-500 transition">Home</Link>
            <Link to="/events" className="block text-gray-300 hover:text-orange-500 transition">Browse Events</Link>
            <Link to="/bookings" className="block text-gray-300 hover:text-orange-500 transition">My Bookings</Link>
            <Link to="/contact" className="block text-gray-300 hover:text-orange-500 transition">Contact Us</Link>
          </div>
        </div>

        {/* Right Column - Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact</h3>
          <div className="space-y-3">
            <div className="flex items-center text-gray-300">
              <FaMapMarkerAlt className="w-4 h-4 mr-3 text-orange-500" />
              <span>Kathmandu, Nepal</span>
            </div>
            <div className="flex items-center text-gray-300">
              <FaPhone className="w-4 h-4 mr-3 text-orange-500" />
              <span>+977-1-4444444</span>
            </div>
            <div className="flex items-center text-gray-300">
              <FaEnvelope className="w-4 h-4 mr-3 text-orange-500" />
              <span>info@showsewa.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 pt-6 text-center">
        <p className="text-gray-400 text-sm">
          © 2024 Showsewa. All rights reserved. | Made with ❤️ in Nepal
        </p>
      </div>
    </div>
  </footer>
);

export default Footer; 