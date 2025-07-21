import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaStar, FaFilter } from "react-icons/fa";
import TranslatedText from "../components/TranslatedText";

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
        console.log("Fetched events:", data);
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
    <section className="py-16 bg-brand-bg min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Heading */}
        <h1 className="text-3xl font-bold text-brand-primary mb-8">Events</h1>

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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
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
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-brand-primary focus:border-transparent max-h-60 overflow-y-auto"
              >
                <option>All Cities</option>
                <option>Kathmandu</option>
                <option>Pokhara</option>
                <option>Lalitpur</option>
                <option>Bhaktapur</option>
                <option>Bharatpur</option>
                <option>Biratnagar</option>
                <option>Birgunj</option>
                <option>Butwal</option>
                <option>Dharan</option>
                <option>Janakpur</option>
                <option>Hetauda</option>
                <option>Dhangadhi</option>
                <option>Nepalgunj</option>
                <option>Itahari</option>
                <option>Ghorahi</option>
                <option>Tulsipur</option>
                <option>Gorkha</option>
                <option>Bhanu</option>
                <option>Banepa</option>
                <option>Dhankuta</option>
                <option>Rajbiraj</option>
                <option>Siraha</option>
                <option>Lahan</option>
                <option>Gaighat</option>
                <option>Inaruwa</option>
                <option>Birtamod</option>
                <option>Damak</option>
                <option>Ilam</option>
                <option>Urlabari</option>
                <option>Mechinagar</option>
                <option>Kakarbhitta</option>
                <option>Birendranagar</option>
                <option>Kohalpur</option>
                <option>Lamahi</option>
                <option>Gulariya</option>
                <option>Tikapur</option>
                <option>Bardiya</option>
                <option>Baglung</option>
                <option>Waling</option>
                <option>Putalibazar</option>
                <option>Syangja</option>
                <option>Tansen</option>
                <option>Palpa</option>
                <option>Sandhikharka</option>
                <option>Arghakhanchi</option>
                <option>Parasi</option>
                <option>Sunwal</option>
                <option>Ramgram</option>
                <option>Kawasoti</option>
                <option>Gaidakot</option>
                <option>Chitwan</option>
                <option>Ratnanagar</option>
                <option>Kalaiya</option>
                <option>Jitpur Simara</option>
                <option>Bardibas</option>
                <option>Malangwa</option>
                <option>Gaur</option>
                <option>Garuda</option>
                <option>Chandrapur</option>
                <option>Birgunj</option>
                <option>Biratnagar</option>
                <option>Other</option>
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
              className="bg-white rounded-xl shadow p-6 flex flex-col"
            >
              {/* Event Image with Tags */}
              <div className="relative">
                <img
                  src={`${import.meta.env.VITE_API_URL}${event.image}`}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                {/* Event Type Tag */}
                <div className="absolute top-3 left-3 bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
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
                <h3 className="text-xl font-semibold text-brand-primary mb-2">
                  <TranslatedText>{event.title}</TranslatedText>
                </h3>
                <p className="text-gray-700 mb-1">
                  <TranslatedText>{event.venue}</TranslatedText>
                </p>
                <div className="text-gray-500 mb-2">
                  <TranslatedText>{new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</TranslatedText>
                </div>
                <div className="flex-1" />
                
                {/* Price and View Details Button */}
                <Link
                  to={`/events/${event._id}`}
                  className="mt-4 inline-block bg-brand-primary text-white px-4 py-2 rounded hover:bg-red-800 transition"
                >
                  <TranslatedText>View Details</TranslatedText>
                </Link>
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
              className="mt-4 text-brand-primary hover:text-red-600 font-semibold"
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