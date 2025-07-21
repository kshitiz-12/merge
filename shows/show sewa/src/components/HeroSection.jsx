import React from "react";
import { Link } from "react-router-dom";
import StatsSection from "./StatsSection";
import FeaturedEvents from "./FeaturedEvents";
import HowItWorks from "./HowItWorks";
import ReadyToBook from "./ReadyToBook";
import { useState } from "react";
import { FaFilm } from "react-icons/fa";

const HeroSection = () => {
  const [browseLoading, setBrowseLoading] = useState(false);
  const handleBrowseClick = (e) => {
    setBrowseLoading(true);
  };
  return (
    <>
      <section className="relative bg-gradient-to-br from-brand-primary to-red-800 overflow-hidden py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-secondary mb-6 leading-tight">
              Easy Ticket Booking
            </h1>
            <div className="text-2xl md:text-3xl font-bold text-brand-secondary mb-2">
              in
            </div>
            <div className="text-2xl md:text-3xl font-bold text-brand-secondary mb-6">
              Nepal
            </div>
            <p className="text-lg md:text-xl text-brand-secondary mb-8 max-w-xl">
              Book tickets to movies, concerts, and live events in Kathmandu and Pokhara with local payment options like eSewa and Khalti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/events"
                className="inline-flex items-center bg-brand-secondary text-brand-primary border-2 border-brand-secondary px-6 py-3 rounded-lg font-semibold shadow hover:bg-brand-primary hover:text-brand-secondary hover:border-brand-primary transition gap-2"
                onClick={handleBrowseClick}
              >
                {browseLoading ? <FaFilm className="animate-spin text-lg" /> : null}
                {browseLoading ? "Loading..." : <>Browse Events <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></>}
              </Link>
            </div>
          </div>
          {/* Logo Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src="/images/logo.jpeg"
              alt="ShowSewa Logo"
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-2xl border-4 border-brand-secondary"
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