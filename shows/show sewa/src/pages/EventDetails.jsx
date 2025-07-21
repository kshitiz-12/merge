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

  // Helper to get correct image URL
  const getImageUrl = (img) => {
    if (!img) return "/images/logo.jpeg";
    if (img.startsWith("http")) return img;
    // If relative, prepend API URL
    return `${import.meta.env.VITE_API_URL}${img}`;
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
    <section className="py-8 md:py-16 bg-gray-50 min-h-[60vh] relative overflow-hidden">
      {/* Blurred background image */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('${event.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(24px) brightness(0.6)',
          opacity: 0.5,
        }}
        aria-hidden="true"
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster and Trailer */}
          <div className="flex flex-col items-center lg:items-start w-full lg:w-1/3">
            <div className="relative w-64 h-96 rounded-xl overflow-hidden shadow-lg mb-4 bg-white bg-opacity-40">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Details Section */}
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-brand-primary mb-2">{event.title}</h1>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-1 bg-gray-200 rounded text-sm font-semibold">{event.language || "Nepali"}</span>
              <span className="px-2 py-1 bg-gray-200 rounded text-sm font-semibold">{event.duration || "2h 30m"}</span>
              <span className="px-2 py-1 bg-gray-200 rounded text-sm font-semibold">{event.category || "Drama, Musical, Romantic"}</span>
              <span className="px-2 py-1 bg-gray-200 rounded text-sm font-semibold">{event.ageLimit || "UA16+"}</span>
            </div>
            <div className="flex flex-wrap gap-4 text-gray-700 mt-2 text-base items-center">
              <span>{event.venue}</span>
              <span></span>
              <span>{event.city || "Kathmandu"}</span>
              <span></span>
              <span>{event.date ? new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : "18 Jul, 2025"}</span>
            </div>
            <div className="mt-4 text-lg text-gray-800 font-semibold">{event.price ? `NPR ${event.price}` : "Free"}</div>
            <button
              onClick={handleBook}
              className="mt-6 w-full md:w-1/2 bg-brand-primary text-brand-secondary px-6 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-red-800 hover:text-brand-secondary border-2 border-brand-primary transition flex items-center justify-center gap-2 disabled:opacity-60"
              disabled={buttonLoading}
            >
              {buttonLoading ? <FaFilm className="animate-spin text-lg" /> : null}
              {buttonLoading ? "Processing..." : "Book tickets"}
            </button>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-brand-primary mb-4">About the event</h2>
              <p className="text-gray-700 text-base mb-2">
                {event.richDescription || event.aboutEvent || event.description || "An intense love story that will break your heart and heal it, too."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails; 