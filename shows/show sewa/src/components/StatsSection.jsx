import React from "react";
import { FaTicketAlt, FaUsers, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const stats = [
  {
    icon: <FaTicketAlt className="text-3xl text-brand-primary mb-2" />,
    value: "50,000+",
    label: "Events Booked",
  },
  {
    icon: <FaUsers className="text-3xl text-brand-accent mb-2" />,
    value: "25,000+",
    label: "Happy Customers",
  },
  {
    icon: <FaMapMarkerAlt className="text-3xl text-brand-secondary mb-2" />,
    value: "15+",
    label: "Cities Covered",
  },
  {
    icon: <FaCalendarAlt className="text-3xl text-brand-success mb-2" />,
    value: "5+",
    label: "Years of Service",
  },
];

const StatsSection = () => (
  <section className="py-12 bg-brand-bg">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-brand-surface border-2 border-brand-border rounded-xl shadow hover:shadow-lg transition p-8 flex flex-col items-center"
          >
            {stat.icon}
            <h2 className="text-2xl font-bold text-brand-primary mb-1">{stat.value}</h2>
            <p className="text-brand-text text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection; 