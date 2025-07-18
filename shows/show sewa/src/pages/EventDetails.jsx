import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/api/events`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(e => e._id === id);
        setEvent(found);
        setLoading(false);
      });
  }, [id]);

  const handleBook = async () => {
    setError("");
    if (!user) {
      navigate("/login");
      return;
    }
    // You can add booking logic here (see Bookings section)
    navigate("/payment", { state: { event, quantity } });
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

  return (
    <section className="py-16 bg-white min-h-[60vh]">
      <div className="max-w-3xl mx-auto px-4">
        <img src={`http://localhost:5000${event.image}`} alt={event.title} className="w-full h-64 object-cover rounded-xl mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
        <ul className="text-gray-500 text-base mb-4">
          <li>Date: {event.date}</li>
          <li>Venue: {event.venue}</li>
          <li>Price: <span className="font-bold text-blue-600">{event.price}</span></li>
        </ul>
        <p className="text-gray-700 mb-8">{event.description}</p>
        {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
        <div className="mb-4 flex items-center gap-4">
          <label htmlFor="quantity" className="font-medium text-gray-700">Quantity:</label>
          <select
            id="quantity"
            className="border rounded px-2 py-1"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold flex items-center justify-center"
          onClick={handleBook}
        >
          Book Now
        </button>
        <div className="mt-6">
          <Link to="/events" className="text-blue-600 hover:underline">← Back to Events</Link>
        </div>
      </div>
    </section>
  );
};

export default EventDetails; 