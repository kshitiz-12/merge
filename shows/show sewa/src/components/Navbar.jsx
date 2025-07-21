import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import TranslatedText from "./TranslatedText";
import { FaUserCircle, FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { selectedLanguage, changeLanguage, languages, isTranslating } = useLanguage();
  const navigate = useNavigate();
  const languageMenuRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isAdmin = user && user.isAdmin;

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-brand-secondary dark:bg-gray-900 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/images/logo.jpeg"
                alt="ShowSewa Logo"
                className="h-12 w-12 rounded-full mr-3"
              />
              <span className="font-bold text-xl text-brand-primary dark:text-white">
                Show<span className="font-devanagari">सेवा</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="flex items-center text-brand-text dark:text-gray-100 hover:text-brand-primary dark:hover:text-brand-primary font-medium transition duration-300">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <Link to="/events" className="flex items-center text-brand-text dark:text-gray-100 hover:text-brand-primary dark:hover:text-brand-primary font-medium transition duration-300">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse
            </Link>
            <Link to="/about" className="flex items-center text-brand-text dark:text-gray-100 hover:text-brand-primary dark:hover:text-brand-primary font-medium transition duration-300">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <TranslatedText>About</TranslatedText>
            </Link>
            <Link to="/contact" className="flex items-center text-brand-text dark:text-gray-100 hover:text-brand-primary dark:hover:text-brand-primary font-medium transition duration-300">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contact
            </Link>
            
            {/* Language Selector */}
            <div className="relative" ref={languageMenuRef}>
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center space-x-2 text-brand-text dark:text-gray-100 hover:text-brand-primary dark:hover:text-brand-primary font-medium transition duration-300"
                disabled={isTranslating}
              >
                <span className="text-lg">{currentLanguage?.flag}</span>
                <span>{currentLanguage?.name}</span>
                {isTranslating && (
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
              </button>
              
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        changeLanguage(language.code);
                        setLanguageMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${
                        selectedLanguage === language.code ? 'bg-gray-100 dark:bg-gray-700 text-brand-primary' : 'text-gray-700 dark:text-gray-100'
                      }`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Night Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center text-brand-text dark:text-gray-100 hover:text-brand-primary dark:hover:text-brand-primary font-medium transition duration-300"
              aria-label="Toggle Night Mode"
            >
              {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>
            
            {/* My Account Button */}
            <Link to="/account" className="flex items-center text-brand-text dark:text-gray-100 hover:text-brand-primary dark:hover:text-brand-primary font-medium transition duration-300 ml-4">
              <FaUserCircle className="w-6 h-6 mr-1" />
              My Account
            </Link>
            
            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-4 ml-4">
                {isAdmin && (
                  <Link to="/admin" className="text-brand-text dark:text-gray-100 font-semibold hover:text-brand-primary dark:hover:text-brand-primary transition duration-300">Admin</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-brand-primary text-brand-secondary px-4 py-2 rounded hover:bg-red-800 hover:text-brand-secondary transition duration-300 font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="ml-4 bg-brand-primary text-brand-secondary px-4 py-2 rounded hover:bg-red-800 hover:text-brand-secondary transition duration-300 font-semibold">Login / Sign Up</Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-brand-text dark:text-gray-100 hover:text-brand-primary dark:hover:text-brand-primary focus:outline-none transition duration-300"
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
        <div className="md:hidden bg-brand-secondary dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
            <Link to="/" className="flex items-center px-3 py-2 rounded text-brand-text dark:text-gray-100 hover:bg-brand-bg dark:hover:bg-gray-700 font-medium transition duration-300" onClick={() => setMenuOpen(false)}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <Link to="/events" className="flex items-center px-3 py-2 rounded text-brand-text dark:text-gray-100 hover:bg-brand-bg dark:hover:bg-gray-700 font-medium transition duration-300" onClick={() => setMenuOpen(false)}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse
            </Link>
            <Link to="/about" className="flex items-center px-3 py-2 rounded text-brand-text dark:text-gray-100 hover:bg-brand-bg dark:hover:bg-gray-700 font-medium transition duration-300" onClick={() => setMenuOpen(false)}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <TranslatedText>About</TranslatedText>
            </Link>
            <Link to="/contact" className="flex items-center px-3 py-2 rounded text-brand-text dark:text-gray-100 hover:bg-brand-bg dark:hover:bg-gray-700 font-medium transition duration-300" onClick={() => setMenuOpen(false)}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contact
            </Link>
            
            {/* Mobile Language Selector */}
            <div className="px-3 py-2">
              <div className="text-sm text-brand-text dark:text-gray-100 font-medium mb-2">Language</div>
              <div className="space-y-1">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      changeLanguage(language.code);
                      setMenuOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1 text-sm rounded flex items-center space-x-2 ${
                      selectedLanguage === language.code 
                        ? 'bg-brand-primary text-brand-secondary' 
                        : 'text-brand-text dark:text-gray-100 hover:bg-brand-bg dark:hover:bg-gray-700'
                    }`}
                    disabled={isTranslating}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <span>{language.name}</span>
                    {isTranslating && selectedLanguage === language.code && (
                      <svg className="animate-spin h-3 w-3 ml-auto" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="block mt-2 text-brand-text dark:text-gray-100 font-semibold text-center hover:text-brand-primary dark:hover:text-brand-primary transition duration-300" onClick={() => setMenuOpen(false)}>Admin</Link>
                )}
                <button
                  onClick={() => { setMenuOpen(false); handleLogout(); }}
                  className="block mt-2 bg-brand-primary text-brand-secondary px-4 py-2 rounded hover:bg-red-800 hover:text-brand-secondary transition duration-300 font-semibold text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block mt-2 bg-brand-primary text-brand-secondary px-4 py-2 rounded hover:bg-red-800 hover:text-brand-secondary transition duration-300 font-semibold text-center" onClick={() => setMenuOpen(false)}>Login / Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 