import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaStar, FaFilter } from "react-icons/fa";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedCity, setSelectedCity] = useState("All Cities");

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/api/events`)
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      });
  }, []);

  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || event.category === selectedCategory;
    const matchesCity = selectedCity === "All Cities" || event.city === selectedCity;
    
    return matchesSearch && matchesCategory && matchesCity;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setSelectedCity("All Cities");
  };

  if (loading) {
    return <div className="py-16 text-center">Loading events...</div>;
  }

  return (
    <section className="py-16 bg-gray-50 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Discover amazing events happening across Nepal
        </h1>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option>All Categories</option>
                <option>Concert</option>
                <option>Comedy</option>
                <option>Cultural</option>
                <option>Movie</option>
                <option>Sports</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* City Filter */}
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option>All Cities</option>
                <option>Kathmandu</option>
                <option>Pokhara</option>
                <option>Lalitpur</option>
                <option>Bhaktapur</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition"
            >
              <FaFilter className="w-4 h-4" />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Event Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredEvents.length} of {events.length} events
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Event Image with Tags */}
              <div className="relative">
                <img
                  src={`${import.meta.env.VITE_API_URL}${event.image}`}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                {/* Event Type Tag */}
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {event.category || "Event"}
                </div>
                {/* Rating Tag */}
                <div className="absolute top-3 right-3 bg-white text-gray-800 px-2 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <FaStar className="w-3 h-3 text-yellow-400" />
                  {event.rating || "4.8"}
                </div>
              </div>
              
              {/* Event Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {event.description || "Experience an amazing event with great performances and entertainment."}
                </p>
                
                {/* Event Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <FaCalendarAlt className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FaClock className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{event.time || "7:00 PM"}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FaMapMarkerAlt className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{event.venue}, {event.city || "Kathmandu"}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FaUsers className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{event.attendees || "1,000"} attending</span>
                  </div>
                </div>
                
                {/* Price and View Details Button */}
                <div className="flex items-center justify-between">
                  <span className="text-red-500 font-bold text-lg">{event.price}</span>
                  <Link
                    to={`/events/${event._id}`}
                    className="bg-red-500 text-white px-6 py-2 rounded font-semibold hover:bg-red-600 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Events Message */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-orange-500 hover:text-orange-600 font-semibold"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events; 