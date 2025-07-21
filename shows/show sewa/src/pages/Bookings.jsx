import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import MovieLoader from "../components/MovieLoader";

const Bookings = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching bookings:', err);
        setError('Failed to fetch bookings.');
        setLoading(false);
      });
  }, [token, navigate]);

  if (!user) {
    return (
      <section className="py-16 bg-brand-bg min-h-[60vh] flex items-center justify-center">
        <div className="bg-brand-secondary rounded-xl shadow p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-brand-primary mb-6">Please log in to view your bookings.</h1>
          <Link to="/login" className="text-brand-primary hover:underline">Login</Link>
        </div>
      </section>
    );
  }

  if (loading) {
    return <MovieLoader />;
  }

  const getTicketSummary = (ticketQuantities) => {
    const tickets = [];
    if (ticketQuantities.general > 0) tickets.push(`${ticketQuantities.general} General`);
    if (ticketQuantities.vip > 0) tickets.push(`${ticketQuantities.vip} VIP`);
    if (ticketQuantities.premium > 0) tickets.push(`${ticketQuantities.premium} Premium`);
    return tickets.join(', ');
  };

  return (
    <section className="py-16 bg-brand-bg dark:bg-gray-900 min-h-[60vh]">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-brand-primary dark:text-white mb-8">My Bookings</h1>
        {loading ? (
          <MovieLoader />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : bookings.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-300">No bookings found.</div>
        ) : (
          <ul className="space-y-6">
            {bookings.map(b => (
              <li key={b._id} className="flex bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="w-32 h-32 flex-shrink-0 bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  <img
                    src={b.event?.image || '/images/concert.png'}
                    alt={b.event?.title || 'Event'}
                    className="object-cover w-full h-full"
                    onError={e => { e.target.src = '/images/concert.png'; }}
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-lg text-brand-primary dark:text-white mb-1">{b.event?.title || "Event"}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{b.event?.venue}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{b.event?.date}</div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {Object.entries(b.ticketQuantities).map(([type, qty]) => (
                        qty > 0 && <span key={type} className="bg-brand-primary/10 text-brand-primary dark:bg-gray-700 dark:text-brand-primary px-2 py-1 rounded text-xs font-semibold">{type.charAt(0).toUpperCase() + type.slice(1)}: {qty}</span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-brand-primary dark:text-white">NPR {b.totalAmount}</span>
                      <span className={`text-xs px-2 py-1 rounded ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{b.status.charAt(0).toUpperCase() + b.status.slice(1)}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-300 mt-2">Booked on {new Date(b.createdAt).toLocaleString()}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Bookings; 