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
    <section className="py-16 bg-brand-bg min-h-[60vh]">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-brand-primary mb-8">My Bookings</h1>
        {bookings.length === 0 ? (
          <div className="bg-brand-secondary rounded-xl shadow p-8 text-center">
            <div className="text-brand-text mb-4">
              <FaTicketAlt className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-brand-text mb-2">No bookings yet</h3>
            <p className="text-brand-text mb-6">Start exploring events and book your tickets!</p>
            <Link to="/events" className="bg-brand-primary text-brand-secondary px-6 py-3 rounded-lg hover:bg-red-800 transition">
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-brand-secondary rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Event Image */}
                  <div className="lg:w-1/3">
                    <img
                      src={`${import.meta.env.VITE_API_URL}${booking.event.image}`}
                      alt={booking.event.title}
                      className="w-full h-48 lg:h-full object-cover"
                    />
                  </div>
                  
                  {/* Booking Details */}
                  <div className="lg:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-brand-text mb-2">{booking.event.title}</h3>
                        <div className="space-y-1 text-sm text-brand-text">
                          <div className="flex items-center">
                            <FaCalendarAlt className="w-4 h-4 mr-2" />
                            <span>{new Date(booking.event.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                          <div className="flex items-center">
                            <FaClock className="w-4 h-4 mr-2" />
                            <span>{booking.event.time || "7:00 PM"}</span>
                          </div>
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                            <span>{booking.event.venue}, {booking.event.city || "Kathmandu"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-primary">Rs. {booking.totalAmount?.toLocaleString()}</div>
                        <div className="text-sm text-brand-text">Total Amount</div>
                      </div>
                    </div>
                    
                    {/* Ticket Information */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-brand-text mb-2 flex items-center">
                        <FaTicketAlt className="w-4 h-4 mr-2" />
                        Ticket Details
                      </h4>
                      <div className="text-sm text-brand-text">
                        <p><strong>Tickets:</strong> {getTicketSummary(booking.ticketQuantities)}</p>
                        <p><strong>Total Tickets:</strong> {booking.totalTickets}</p>
                        <p><strong>Status:</strong> 
                          <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {booking.status}
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    {/* Customer Information */}
                    {booking.customerInfo && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-brand-text mb-2 flex items-center">
                          <FaUser className="w-4 h-4 mr-2" />
                          Customer Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-brand-text">
                          <div className="flex items-center">
                            <FaUser className="w-3 h-3 mr-2" />
                            <span>{booking.customerInfo.fullName}</span>
                          </div>
                          <div className="flex items-center">
                            <FaEnvelope className="w-3 h-3 mr-2" />
                            <span>{booking.customerInfo.email}</span>
                          </div>
                          <div className="flex items-center">
                            <FaPhone className="w-3 h-3 mr-2" />
                            <span>{booking.customerInfo.phone}</span>
                          </div>
                          {booking.customerInfo.city && (
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="w-3 h-3 mr-2" />
                              <span>{booking.customerInfo.city}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Bookings; 