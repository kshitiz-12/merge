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
    <section className="py-16 bg-brand-bg dark:bg-gray-900 min-h-[60vh]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 flex flex-col md:flex-row gap-8">
          <img src={event.image} alt={event.title} className="w-full md:w-1/3 h-64 object-cover rounded mb-4 md:mb-0" />
          <div className="flex-1 flex flex-col">
            <h1 className="text-3xl font-bold text-brand-primary dark:text-white mb-2">{event.title}</h1>
            <div className="text-gray-700 dark:text-gray-300 mb-1">{event.venue}</div>
            <div className="text-gray-500 dark:text-gray-400 mb-2">{event.date}</div>
            <div className="mb-4 text-brand-text dark:text-gray-100">{event.description}</div>
            {/* ...rest of details... */}
          </div>
        </div>
        {/* ...rest of page... */}
      </div>
    </section>
  );
};

export default EventDetails; 