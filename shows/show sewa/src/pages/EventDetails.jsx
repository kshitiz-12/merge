import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaStar, FaShare, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaClock as FaDuration, FaUsers as FaAgeLimit, FaLanguage, FaFilm } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';
import TranslatedText from "../components/TranslatedText";
import MovieLoader from "../components/MovieLoader";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTicket, setSelectedTicket] = useState("general");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/api/events`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(e => e._id === id);
        setEvent(found);
        setLoading(false);
      });
  }, [id]);

  const ticketTypes = [
    {
      id: "general",
      name: "General Admission",
      price: "Rs. 1,500",
      description: "Standing area with great view of the stage",
      originalPrice: "Rs. 2,000"
    },
    {
      id: "vip",
      name: "VIP Seating",
      price: "Rs. 3,000",
      description: "Reserved seating with complimentary refreshments",
      originalPrice: "Rs. 4,000"
    },
    {
      id: "premium",
      name: "Premium Package",
      price: "Rs. 5,000",
      description: "Front row seats, meet & greet, and exclusive merchandise",
      originalPrice: "Rs. 6,000"
    }
  ];

  // Generate dynamic ticket types from event data
  const generateTicketTypes = () => {
    const types = [];
    if (event?.ticketType1?.use) {
      types.push({
        id: "type1",
        name: event.ticketType1.name,
        price: event.ticketType1.price || "Rs. 1,500",
        description: event.ticketType1.description
      });
    }
    if (event?.ticketType2?.use) {
      types.push({
        id: "type2",
        name: event.ticketType2.name,
        price: event.ticketType2.price || "Rs. 3,000",
        description: event.ticketType2.description
      });
    }
    if (event?.ticketType3?.use) {
      types.push({
        id: "type3",
        name: event.ticketType3.name,
        price: event.ticketType3.price || "Rs. 5,000",
        description: event.ticketType3.description
      });
    }
    return types.length > 0 ? types : ticketTypes; // Fallback to default if none configured
  };

  const dynamicTicketTypes = generateTicketTypes();

  const handleBook = async () => {
    setError("");
    setButtonLoading(true);
    if (!user) {
      navigate("/login");
      return;
    }
    // Simulate async booking/navigation
    setTimeout(() => {
      navigate("/payment", { state: { event, selectedTicket, quantity } });
    }, 500);
  };

  if (loading) return <MovieLoader />;
  if (!event) {
    return (
      <div className="py-16 text-center text-gray-600">
        <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
        <Link to="/events" className="text-blue-600 hover:underline">Back to Events</Link>
      </div>
    );
  }

  const selectedTicketData = dynamicTicketTypes.find(t => t.id === selectedTicket);

  return (
    <section className="py-8 md:py-16 bg-gray-50 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* Event Overview Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            <TranslatedText>
              {event.aboutEvent || "The biggest Nepali music festival featuring top artists from across the country. Experience an unforgettable night of music, culture, and entertainment."}
            </TranslatedText>
          </h1>
          
          {/* Key Event Details */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center">
                <FaCalendarAlt className="w-6 h-6 mr-3 text-black" />
                <div>
                  <div className="font-semibold text-gray-900">Date</div>
                  <div className="text-gray-600">{new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</div>
                </div>
              </div>
              <div className="flex items-center">
                <FaClock className="w-6 h-6 mr-3 text-black" />
                <div>
                  <div className="font-semibold text-gray-900">Time</div>
                  <div className="text-gray-600">{event.time || "7:00 PM"}</div>
                </div>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="w-6 h-6 mr-3 text-black" />
                <div>
                  <div className="font-semibold text-gray-900">Venue</div>
                  <div className="text-gray-600">{event.venue}, {event.city || "Kathmandu"}</div>
                </div>
              </div>
              <div className="flex items-center">
                <FaUsers className="w-6 h-6 mr-3 text-black" />
                <div>
                  <div className="font-semibold text-gray-900">Attendees</div>
                  <div className="text-gray-600">{event.attendees || "5,000"} going</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
          
          {/* Main Content - About This Event */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* About This Event Section */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">About This Event</h2>
              
              {event.richDescription ? (
                <ReactMarkdown className="prose prose-sm md:prose-lg max-w-none">{event.richDescription}</ReactMarkdown>
              ) : (
                <div className="space-y-4 md:space-y-6 text-sm md:text-base">
                  <p className="text-gray-700 leading-relaxed">
                    {event.aboutEvent || "Join us for the most spectacular Nepali music festival of 2024! This grand event brings together the finest artists from across Nepal for an evening of incredible performances, cultural celebration, and unforgettable memories."}
                  </p>

                  {/* Featured Artists */}
                  {event.featuredArtists && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Featured Artists:</h3>
                      <ul className="space-y-2 text-gray-700">
                        {event.featuredArtists.split('\n').map((artist, index) => (
                          <li key={index}>{artist.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* What to Expect */}
                  {event.whatToExpect && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">What to Expect:</h3>
                      <ul className="space-y-2 text-gray-700">
                        {event.whatToExpect.split('\n').map((item, index) => (
                          <li key={index}>{item.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Venue Information */}
                  {event.venueInformation && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Venue Information:</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {event.venueInformation}
                      </p>
                    </div>
                  )}

                  {/* Important Notes */}
                  {event.importantNotes && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Notes:</h3>
                      <ul className="space-y-2 text-gray-700">
                        {event.importantNotes.split('\n').map((note, index) => (
                          <li key={index}>{note.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Book Now Button Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-brand-primary mb-4">Ready to Book?</h2>
              <p className="text-gray-600 mb-6">Secure your spot for this amazing event</p>
              <button
                onClick={handleBook}
                className="bg-brand-primary text-brand-secondary px-6 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-red-800 hover:text-brand-secondary border-2 border-brand-primary transition w-full mt-6 flex items-center justify-center gap-2 disabled:opacity-60"
                disabled={buttonLoading}
              >
                {buttonLoading ? <FaFilm className="animate-spin text-xl" /> : null}
                {buttonLoading ? "Processing..." : "Book Now"}
              </button>
              <p className="text-gray-500 text-sm mt-4">Secure booking with eSewa & Khalti</p>
            </div>
          </div>

          {/* Right Sidebar - Quick Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Info</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-red-600 font-semibold text-sm">C</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Category</div>
                    <div className="font-medium text-gray-900">{event.category || "Concert"}</div>
                  </div>
                </div>
                
                {event.duration && (
                  <div className="flex items-center">
                    <FaDuration className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Duration</div>
                      <div className="font-medium text-gray-900">{event.duration}</div>
                    </div>
                  </div>
                )}
                
                {event.ageLimit && (
                  <div className="flex items-center">
                    <FaAgeLimit className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Age Limit</div>
                      <div className="font-medium text-gray-900">{event.ageLimit}</div>
                    </div>
                  </div>
                )}
                
                {event.language && (
                  <div className="flex items-center">
                    <FaLanguage className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Language</div>
                      <div className="font-medium text-gray-900">{event.language}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Back to Events Link */}
        <div className="mt-8 text-center">
          <Link to="/events" className="text-gray-600 hover:text-gray-800 transition">
            ← Back to Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventDetails; 