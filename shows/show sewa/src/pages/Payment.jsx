import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, quantity } = location.state || {};
  const [tab, setTab] = useState("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upi, setUpi] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { token } = useAuth();

  if (!event || !quantity) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-600">
        <h2 className="text-2xl font-bold mb-4">No Payment Data</h2>
        <button className="text-blue-600 hover:underline" onClick={() => navigate("/events")}>Back to Events</button>
      </div>
    );
  }

  const price = Number(String(event.price).replace(/[^0-9.]/g, ""));
  const total = price * quantity;

  const handlePay = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (tab === "card") {
      if (!card.number || !card.name || !card.expiry || !card.cvv) {
        setError("Please fill in all card details.");
        setLoading(false);
        return;
      }
      if (!/^\d{16}$/.test(card.number.replace(/\s/g, ""))) {
        setError("Card number must be 16 digits.");
        setLoading(false);
        return;
      }
      if (!/^\d{3,4}$/.test(card.cvv)) {
        setError("CVV must be 3 or 4 digits.");
        setLoading(false);
        return;
      }
    }
    if (tab === "upi") {
      if (!upi || !upi.includes("@")) {
        setError("Please enter a valid UPI ID.");
        setLoading(false);
        return;
      }
    }
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId: event._id, quantity }),
      });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate("/bookings"), 1800);
    } catch (err) {
      setError("Failed to create booking.");
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full animate-fade-in-up">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Complete Your Payment</h2>
        <div className="flex items-center gap-4 mb-6 animate-fade-in">
          <img src={event.image} alt={event.title} className="w-20 h-20 object-cover rounded-xl border" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
            <p className="text-gray-500 text-sm">Quantity: <span className="font-bold">{quantity}</span></p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 mb-6 animate-fade-in">
          <div className="flex justify-between mb-2">
            <span>Price per ticket</span>
            <span>₹{price}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Quantity</span>
            <span>{quantity}</span>
          </div>
          <div className="flex justify-between font-bold text-blue-700 text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
        {/* Payment Tabs */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold focus:outline-none transition border-b-2 ${tab === "card" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"}`}
            onClick={() => { setTab("card"); setError(""); }}
          >
            Card
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold focus:outline-none transition border-b-2 ${tab === "upi" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"}`}
            onClick={() => { setTab("upi"); setError(""); }}
          >
            UPI / QR
          </button>
        </div>
        {/* Card Payment Form */}
        {tab === "card" && !success && (
          <form onSubmit={handlePay} className="space-y-4 animate-slide-in">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-200 transition"
              placeholder="Card Number"
              maxLength={16}
              value={card.number}
              onChange={e => setCard({ ...card, number: e.target.value.replace(/[^0-9]/g, "") })}
              disabled={loading}
            />
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-200 transition"
              placeholder="Name on Card"
              value={card.name}
              onChange={e => setCard({ ...card, name: e.target.value })}
              disabled={loading}
            />
            <div className="flex gap-2">
              <input
                type="text"
                className="w-1/2 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-200 transition"
                placeholder="MM/YY"
                maxLength={5}
                value={card.expiry}
                onChange={e => setCard({ ...card, expiry: e.target.value })}
                disabled={loading}
              />
              <input
                type="text"
                className="w-1/2 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-200 transition"
                placeholder="CVV"
                maxLength={4}
                value={card.cvv}
                onChange={e => setCard({ ...card, cvv: e.target.value.replace(/[^0-9]/g, "") })}
                disabled={loading}
              />
            </div>
            {error && <div className="text-red-600 text-sm font-semibold">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <span className="w-5 h-5 border-2 border-white border-t-blue-600 rounded-full animate-spin mr-2"></span> : null}
              {loading ? "Processing..." : `Pay ₹${total}`}
            </button>
          </form>
        )}
        {/* UPI Payment Form */}
        {tab === "upi" && !success && (
          <form onSubmit={handlePay} className="space-y-4 animate-slide-in">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-200 transition"
              placeholder="Enter UPI ID"
              value={upi}
              onChange={e => setUpi(e.target.value)}
              disabled={loading}
            />
            <div className="flex justify-center my-2">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=showsewa@upi" alt="QR Code" className="rounded" />
            </div>
            {error && <div className="text-red-600 text-sm font-semibold">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <span className="w-5 h-5 border-2 border-white border-t-blue-600 rounded-full animate-spin mr-2"></span> : null}
              {loading ? "Processing..." : `Pay ₹${total}`}
            </button>
          </form>
        )}
        {/* Success Animation */}
        {success && (
          <div className="flex flex-col items-center justify-center animate-fade-in">
            <svg className="w-20 h-20 text-green-500 mb-4 animate-bounce-in" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M8 12l2 2l4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 className="text-xl font-bold text-green-600 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">Redirecting to your bookings...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment; 