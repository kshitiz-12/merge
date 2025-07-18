import React from "react";
import { FaTicketAlt, FaUsers, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const stats = [
  {
    icon: <FaTicketAlt className="text-3xl text-blue-600 mb-2" />,
    value: "50,000+",
    label: "Events Booked",
  },
  {
    icon: <FaUsers className="text-3xl text-pink-600 mb-2" />,
    value: "25,000+",
    label: "Happy Customers",
  },
  {
    icon: <FaMapMarkerAlt className="text-3xl text-green-600 mb-2" />,
    value: "15+",
    label: "Cities Covered",
  },
  {
    icon: <FaCalendarAlt className="text-3xl text-yellow-500 mb-2" />,
    value: "5+",
    label: "Years of Service",
  },
];

const StatsSection = () => (
  <section className="py-12 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-8 flex flex-col items-center"
          >
            {stat.icon}
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h2>
            <p className="text-gray-600 text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection; 