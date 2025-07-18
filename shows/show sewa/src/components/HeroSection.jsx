import React from "react";
import { Link } from "react-router-dom";
import StatsSection from "./StatsSection";
import FeaturedEvents from "./FeaturedEvents";
import HowItWorks from "./HowItWorks";
import ReadyToBook from "./ReadyToBook";

const HeroSection = () => {
  return (
    <>
      <section className="relative bg-gradient-to-br from-blue-50 to-pink-50 overflow-hidden py-16 md:py-24">
        {/* Decorative Circle */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-200 rounded-full opacity-30 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          {/* Text Content */}
          <div className="flex-1 mb-10 md:mb-0 md:mr-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              TAPAI KO SHOW<br />
              HAMRO SEWA <span className="text-blue-600">SHOWSEWA</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-xl">
              Discover Nepal’s vibrant events, movies, and shows all in one place. Our platform, founded by a group of passionate young visionaries, is designed to make booking seamless and accessible—so you never miss a moment that matters. Whether it's a blockbuster premiere, a soulful concert, or a local cultural event, we bring the experience to your fingertips. Driven by a love for entertainment and a commitment to convenience, we’re here to connect people with the moments they’ll remember.
            </p>
            <Link
              to="/about"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            >
              About us
            </Link>
          </div>
          {/* Logo Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src="/images/logo.jpeg"
              alt="ShowSewa Logo"
              className="w-48 h-48 md:w-64 md:h-64 object-contain rounded-full shadow-lg border-4 border-white bg-white"
            />
          </div>
        </div>
      </section>
      <StatsSection />
      <FeaturedEvents />
      <HowItWorks />
      <ReadyToBook />
    </>
  );
};

export default HeroSection; 