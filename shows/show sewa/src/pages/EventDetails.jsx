import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaStar, FaShare, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaClock as FaDuration, FaUsers as FaAgeLimit, FaLanguage } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const handleBook = async () => {
    setError("");
    if (!user) {
      navigate("/login");
      return;
    }
    // You can add booking logic here (see Bookings section)
    navigate("/payment", { state: { event, selectedTicket, quantity } });
  };

  if (loading) return <div className="py-16 text-center">Loading event...</div>;
  if (!event) {
    return (
      <div className="py-16 text-center text-gray-600">
        <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
        <Link to="/events" className="text-blue-600 hover:underline">Back to Events</Link>
      </div>
    );
  }

  const selectedTicketData = ticketTypes.find(t => t.id === selectedTicket);

  return (
    <section className="py-8 md:py-16 bg-gray-50 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* Event Overview Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            The biggest Nepali music festival featuring top artists from across the country. Experience an unforgettable night of music, culture, and entertainment.
          </h1>
          
          {/* Key Event Details */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center">
                <FaCalendarAlt className="w-6 h-6 mr-3 text-brand-maroon" />
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
                <FaClock className="w-6 h-6 mr-3 text-red-500" />
                <div>
                  <div className="font-semibold text-gray-900">Time</div>
                  <div className="text-gray-600">{event.time || "7:00 PM"}</div>
                </div>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="w-6 h-6 mr-3 text-red-500" />
                <div>
                  <div className="font-semibold text-gray-900">Venue</div>
                  <div className="text-gray-600">{event.venue}, {event.city || "Kathmandu"}</div>
                </div>
              </div>
              <div className="flex items-center">
                <FaUsers className="w-6 h-6 mr-3 text-red-500" />
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
                    Join us for the most spectacular Nepali music festival of 2024! This grand event brings together the finest artists from across Nepal for an evening of incredible performances, cultural celebration, and unforgettable memories.
                  </p>

                  {/* Featured Artists */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Featured Artists:</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Narayan Gopal Tribute Band</li>
                      <li>• Bipul Chettri</li>
                      <li>• Sajjan Raj Vaidya</li>
                      <li>• Albatross</li>
                      <li>• And many more surprise guests!</li>
                    </ul>
                  </div>

                  {/* What to Expect */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">What to Expect:</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 6+ hours of non-stop entertainment</li>
                      <li>• Traditional and modern Nepali music</li>
                      <li>• Food stalls with authentic Nepali cuisine</li>
                      <li>• Cultural performances and dance</li>
                      <li>• Meet & greet opportunities with artists</li>
                    </ul>
                  </div>

                  {/* Venue Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Venue Information:</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Dasharath Stadium is Nepal's premier venue for large-scale events. The stadium offers excellent acoustics, comfortable seating, and easy accessibility from all parts of Kathmandu.
                    </p>
                  </div>

                  {/* Important Notes */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Notes:</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Gates open at 6:00 PM</li>
                      <li>• No outside food or beverages allowed</li>
                      <li>• Parking available on-site</li>
                      <li>• Event will proceed rain or shine</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Book Tickets Section */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Book Tickets</h2>
              
              {/* Ticket Types */}
              <div className="space-y-4 md:space-y-6">
                {ticketTypes.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition text-sm md:text-base ${
                      selectedTicket === ticket.id
                        ? 'border-brand-maroon bg-brand-maroon/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTicket(ticket.id)}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                      <h3 className="font-semibold text-gray-900 mb-1 sm:mb-0">{ticket.name}</h3>
                      <div className="text-right">
                        <div className="text-brand-maroon font-bold text-lg">{ticket.price}</div>
                        <div className="text-gray-400 text-xs line-through">{ticket.originalPrice}</div>
                      </div>
                    </div>
                    <div className="text-gray-600 text-xs md:text-sm">{ticket.description}</div>
                  </div>
                ))}
              </div>

              {/* Book Now Button */}
              <button
                className="w-full mt-6 bg-brand-maroon text-white py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-brand-maroon transition shadow-lg"
                onClick={handleBook}
              >
                Book Now
              </button>

              {/* Payment Options */}
              <div className="text-center text-gray-600 text-sm">
                Secure booking with eSewa & Khalti
              </div>

              {error && (
                <div className="mt-4 text-brand-maroon text-center font-semibold">{error}</div>
              )}
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
                
                <div className="flex items-center">
                  <FaDuration className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="font-medium text-gray-900">6+ hours</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FaAgeLimit className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Age Limit</div>
                    <div className="font-medium text-gray-900">All ages</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FaLanguage className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Language</div>
                    <div className="font-medium text-gray-900">Nepali</div>
                  </div>
                </div>
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