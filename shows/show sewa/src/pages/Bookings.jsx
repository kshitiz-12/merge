import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Bookings = () => {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:5000/api/bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      });
  }, [token]);

  if (!user) {
    return (
      <section className="py-16 bg-blue-50 min-h-[60vh] flex items-center justify-center">
        <div className="bg-white rounded-xl shadow p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Please log in to view your bookings.</h1>
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </div>
      </section>
    );
  }

  if (loading) {
    return <div className="py-16 text-center">Loading bookings...</div>;
  }

  return (
    <section className="py-16 bg-blue-50 min-h-[60vh]">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
        {bookings.length === 0 ? (
          <div className="text-gray-600 text-center">No bookings yet.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-xl shadow p-6 flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={`http://localhost:5000${booking.event.image}`}
                  alt={booking.event.title}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{booking.event.title}</h3>
                  <div className="text-gray-500 mb-1">Date: {booking.event.date}</div>
                  <div className="text-gray-500 mb-1">Venue: {booking.event.venue}</div>
                  <div className="text-gray-500 mb-1">Quantity: {booking.quantity}</div>
                  <div className="font-bold text-blue-600">Total: ₹{Number(booking.event.price) * booking.quantity}</div>
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