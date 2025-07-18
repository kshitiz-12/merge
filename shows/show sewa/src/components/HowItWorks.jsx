import React from "react";
import { FaSearch, FaTicketAlt, FaCreditCard, FaSmile } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch className="text-3xl text-blue-600 mb-2" />,
    title: "Browse Events",
    desc: "Explore a variety of shows, movies, and concerts happening near you.",
  },
  {
    icon: <FaTicketAlt className="text-3xl text-pink-600 mb-2" />,
    title: "Select & Book",
    desc: "Choose your favorite event and book your tickets in a few clicks.",
  },
  {
    icon: <FaCreditCard className="text-3xl text-green-600 mb-2" />,
    title: "Easy Payment",
    desc: "Pay securely online with multiple payment options.",
  },
  {
    icon: <FaSmile className="text-3xl text-yellow-500 mb-2" />,
    title: "Enjoy the Show!",
    desc: "Get ready for an unforgettable experience at your chosen event.",
  },
];

const HowItWorks = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">How It Works</h2>
      <p className="text-gray-600 mb-8 text-center">Booking your next event is simple and quick</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-8 flex flex-col items-center"
          >
            {step.icon}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-base">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks; 