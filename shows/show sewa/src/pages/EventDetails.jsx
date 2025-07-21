import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaStar, FaShare, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaClock as FaDuration, FaUsers as FaAgeLimit, FaLanguage, FaFilm, FaPlay } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';
import TranslatedText from "../components/TranslatedText";
import MovieLoader from "../components/MovieLoader";
import Modal from "react-modal";

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
  const [showRateModal, setShowRateModal] = useState(false);
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [copied, setCopied] = useState(false);

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
    navigate("/payment", { state: { event, selectedTicket, quantity } });
  };

  // Share handler
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster and Trailer */}
          <div className="flex flex-col items-center lg:items-start w-full lg:w-1/3">
            <div className="relative w-64 h-96 rounded-xl overflow-hidden shadow-lg mb-4">
              <img
                src={event.image || "/images/logo.jpeg"}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <button
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition"
                onClick={() => setShowTrailerModal(true)}
                aria-label="Play Trailer"
              >
                <FaPlay className="text-white text-4xl" />
                <span className="sr-only">Play Trailer</span>
              </button>
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white text-center py-1 text-xs font-semibold">
                In cinemas
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded text-sm font-semibold"
                onClick={() => setShowTrailerModal(true)}
              >
                <FaPlay className="text-brand-primary" /> Trailer
              </button>
              <button
                className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded text-sm font-semibold"
                onClick={handleShare}
              >
                <FaShare className="text-brand-primary" /> Share
              </button>
              {copied && <span className="text-green-600 text-xs ml-2">Link copied!</span>}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center md:gap-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">{event.title}</h1>
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full font-semibold text-lg">
                <FaStar className="text-red-500" />
                8.8/10 <span className="text-gray-500 text-base">(62.9K Votes)</span>
                <button
                  className="ml-2 px-2 py-1 bg-white border border-gray-300 rounded text-sm font-semibold hover:bg-gray-50"
                  onClick={() => setShowRateModal(true)}
                >
                  Rate now
                </button>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-1 bg-gray-200 rounded text-sm font-semibold">2D</span>
              <span className="px-2 py-1 bg-gray-200 rounded text-sm font-semibold">{event.language || "Nepali"}</span>
            </div>
            <div className="flex flex-wrap gap-4 text-gray-700 mt-2 text-base items-center">
              <span>{event.duration || "2h 30m"}</span>
              <span>•</span>
              <span>{event.category || "Drama, Musical, Romantic"}</span>
              <span>•</span>
              <span>{event.ageLimit || "UA16+"}</span>
              <span>•</span>
              <span>{event.date ? new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : "18 Jul, 2025"}</span>
            </div>
            <button
              onClick={handleBook}
              className="mt-6 w-full md:w-1/2 bg-brand-primary text-brand-secondary px-6 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-red-800 hover:text-brand-secondary border-2 border-brand-primary transition flex items-center justify-center gap-2 disabled:opacity-60"
              disabled={buttonLoading}
            >
              {buttonLoading ? <FaFilm className="animate-spin text-lg" /> : null}
              {buttonLoading ? "Processing..." : "Book tickets"}
            </button>
          </div>
        </div>

        {/* About the movie/event */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the movie</h2>
          <p className="text-gray-700 text-base mb-2">
            {event.richDescription || event.aboutEvent || "An intense love story that will break your heart and heal it, too."}
          </p>
        </div>

        {/* Rate Modal */}
        <Modal
          isOpen={showRateModal}
          onRequestClose={() => setShowRateModal(false)}
          className="fixed inset-0 flex items-center justify-center z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-40 z-40"
          ariaHideApp={false}
        >
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Rate this event</h3>
            <div className="flex gap-2 mb-6">
              {[1,2,3,4,5].map(star => (
                <FaStar
                  key={star}
                  className={`text-2xl cursor-pointer ${userRating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                  onClick={() => setUserRating(star)}
                />
              ))}
            </div>
            <button
              className="bg-brand-primary text-brand-secondary px-6 py-2 rounded font-semibold hover:bg-red-800 transition w-full"
              onClick={() => setShowRateModal(false)}
            >
              Submit
            </button>
          </div>
        </Modal>

        {/* Trailer Modal */}
        <Modal
          isOpen={showTrailerModal}
          onRequestClose={() => setShowTrailerModal(false)}
          className="fixed inset-0 flex items-center justify-center z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-70 z-40"
          ariaHideApp={false}
        >
          <div className="bg-black rounded-xl p-4 max-w-2xl w-full mx-4 flex flex-col items-center">
            <button
              className="self-end text-white text-2xl mb-2"
              onClick={() => setShowTrailerModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            {/* Replace with actual trailer video if available */}
            <div className="w-full aspect-video bg-gray-900 flex items-center justify-center rounded-lg">
              <span className="text-white text-lg">Trailer coming soon...</span>
            </div>
          </div>
        </Modal>

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