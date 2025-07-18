import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/api/events`)
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="py-16 text-center">Loading events...</div>;
  }

  return (
    <section className="py-16 bg-blue-50 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Events</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <Link
              to={`/events/${event._id}`}
              key={event._id}
              className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition"
            >
              <img
                src={`${import.meta.env.VITE_API_URL}${event.image}`}
                alt={event.title}
                className="w-40 h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <ul className="text-gray-500 text-sm mb-4">
                <li>Date: {event.date}</li>
                <li>Venue: {event.venue}</li>
              </ul>
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-blue-600">{event.price}</span>
                <span className="ml-auto bg-blue-600 text-white px-4 py-2 rounded font-semibold">View</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events; 