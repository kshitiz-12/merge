import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-brand-primary text-brand-secondary pt-10 pb-6">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Left Column - Showsewa Information */}
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-brand-secondary w-8 h-8 rounded mr-2 flex items-center justify-center">
              <span className="text-brand-primary font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-xl text-brand-secondary">
              Show<span className="font-devanagari">सेवा</span>
            </span>
          </div>
          <p className="text-brand-secondary text-sm leading-relaxed">
            Nepal's simple and secure platform for booking tickets to movies, concerts, and live events. No queues, no hassle—just fast, reliable ticketing in a few clicks.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-brand-secondary hover:text-gray-200 transition" aria-label="Facebook">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-brand-secondary hover:text-gray-200 transition" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-brand-secondary hover:text-gray-200 transition" aria-label="Twitter">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
        {/* Middle Column - Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-brand-secondary">Quick Links</h3>
          <div className="space-y-2">
            <Link to="/" className="block text-brand-secondary hover:text-gray-200 transition">Home</Link>
            <Link to="/events" className="block text-brand-secondary hover:text-gray-200 transition">Browse Events</Link>
            <Link to="/bookings" className="block text-brand-secondary hover:text-gray-200 transition">My Bookings</Link>
            <Link to="/contact" className="block text-brand-secondary hover:text-gray-200 transition">Contact Us</Link>
          </div>
        </div>
        {/* Right Column - Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-brand-secondary">Contact</h3>
          <div className="space-y-3">
            <div className="flex items-center text-brand-secondary">
              <FaMapMarkerAlt className="w-4 h-4 mr-3 text-brand-secondary" />
              <span>Kathmandu, Nepal</span>
            </div>
            <div className="flex items-center text-brand-secondary">
              <FaPhone className="w-4 h-4 mr-3 text-brand-secondary" />
              <span>+977-1-4444444</span>
            </div>
            <div className="flex items-center text-brand-secondary">
              <FaEnvelope className="w-4 h-4 mr-3 text-brand-secondary" />
              <span>info@showsewa.com</span>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t border-red-700 pt-6 text-center">
        <p className="text-brand-secondary text-sm">
          © 2024 Showsewa. All rights reserved. | Made with ❤️ in Nepal
        </p>
      </div>
    </div>
  </footer>
);

export default Footer; 