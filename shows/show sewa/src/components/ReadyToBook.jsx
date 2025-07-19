import React from "react";
import { Link } from "react-router-dom";

const ReadyToBook = () => (
  <section className="py-16 bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 text-white relative overflow-hidden">
    <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg">Ready to Book Your Next Event?</h2>
      <p className="mb-8 text-lg md:text-xl font-medium drop-shadow">
        Join thousands of happy customers who trust Showsewa for their entertainment needs
      </p>
      <Link
        to="/events"
        className="inline-flex items-center bg-yellow-100 text-gray-800 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-200 transition text-lg"
      >
        Start Booking Now
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  </section>
);

export default ReadyToBook; 