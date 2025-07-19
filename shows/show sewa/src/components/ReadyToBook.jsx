import React from "react";
import { Link } from "react-router-dom";

const ReadyToBook = () => (
  <section className="py-16 bg-gradient-to-br from-brand-primary to-red-800 text-brand-secondary relative overflow-hidden">
    <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg text-brand-secondary">Ready to Book Your Next Event?</h2>
      <p className="mb-8 text-lg md:text-xl font-medium drop-shadow text-brand-secondary">
        Join thousands of happy customers who trust Show<span className="font-devanagari">सेवा</span> for their entertainment needs
      </p>
      <Link
        to="/events"
        className="bg-brand-secondary text-brand-primary px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-brand-primary hover:text-brand-secondary border-2 border-brand-secondary transition"
      >
        Book Now
      </Link>
    </div>
  </section>
);

export default ReadyToBook; 