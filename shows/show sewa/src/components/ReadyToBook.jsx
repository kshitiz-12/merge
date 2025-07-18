import React from "react";
import { Link } from "react-router-dom";

const ReadyToBook = () => (
  <section className="py-16 bg-gradient-to-r from-blue-600 to-pink-500 text-white relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[url('/images/concert.png')] bg-cover bg-center pointer-events-none" />
    <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg">Ready to Book Your Next Event?</h2>
      <p className="mb-8 text-lg md:text-xl font-medium drop-shadow">
        Don’t miss out on the best shows, movies, and concerts. Secure your spot now and create unforgettable memories!
      </p>
      <Link
        to="/events"
        className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-100 transition text-lg"
      >
        Explore Events
      </Link>
    </div>
  </section>
);

export default ReadyToBook; 