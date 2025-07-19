import React from "react";
import { Link } from "react-router-dom";

const ReadyToBook = () => (
  <section className="py-16 bg-brand-secondary text-brand-primary relative overflow-hidden">
    <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg text-brand-primary">Ready to Book Your Next Event?</h2>
      <p className="mb-8 text-lg md:text-xl font-medium drop-shadow text-brand-text">
        Join thousands of happy customers who trust Show<span className="font-devanagari">सेवा</span> for their entertainment needs
      </p>
      <Link
        to="/events"
        className="bg-brand-primary text-brand-secondary px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-red-800 hover:text-brand-secondary border-2 border-brand-primary transition"
      >
        Book Now
      </Link>
    </div>
  </section>
);

export default ReadyToBook; 