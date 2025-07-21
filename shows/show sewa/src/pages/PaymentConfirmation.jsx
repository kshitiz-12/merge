import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaCreditCard, FaQrcode, FaLock } from "react-icons/fa";

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, ticketQuantities, customerInfo } = location.state || {};
  const [tab, setTab] = useState("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upi, setUpi] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { token } = useAuth();

  // Check if user is logged in
  useEffect(() => {
    if (!token) {
      navigate('/login', { state: { from: location.pathname, event } });
      return;
    }
  }, [token, navigate, location.pathname, event]);

  if (!event || !ticketQuantities) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-600">
        <h2 className="text-2xl font-bold mb-4">No Payment Data</h2>
        <button className="text-brand-primary hover:underline" onClick={() => navigate("/events")}>Back to Events</button>
      </div>
    );
  }

  // Show loading if not authenticated
  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-600">
        <h2 className="text-2xl font-bold mb-4">Please log in to continue</h2>
        <p>Redirecting to login page...</p>
      </div>
    );
  }

  // Defensive checks for undefined values
  const totalAmount = location.state?.totalAmount ?? 0;
  const totalTickets = location.state?.totalTickets ?? 0;

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
      // Create booking with all ticket quantities
      const bookingData = {
        eventId: event._id,
        ticketQuantities,
        customerInfo,
        totalAmount,
        totalTickets
      };
      
      await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
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
    <section className="py-16 bg-brand-bg min-h-[60vh] flex items-center justify-center">
      <div className="bg-brand-secondary rounded-xl shadow p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-brand-primary">Complete Your Payment</h2>
        
        {/* Order Summary */}
        <div className="flex items-center gap-4 mb-6 animate-fade-in">
          <img 
            src={`${import.meta.env.VITE_API_URL}${event.image}`} 
            alt={event.title} 
            className="w-20 h-20 object-cover rounded-xl border" 
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
            <p className="text-gray-500 text-sm">Total Tickets: <span className="font-bold">{totalTickets}</span></p>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6 animate-fade-in">
          <div className="flex justify-between mb-2">
            <span>Total Amount</span>
            <span className="font-bold text-brand-primary">Rs. {totalAmount.toLocaleString()}</span>
          </div>
          <div className="text-sm text-gray-500">
            Secure payment with eSewa & Khalti
          </div>
        </div>
        
        {/* Payment Tabs */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold focus:outline-none transition border-b-2 flex items-center gap-2 ${
              tab === "card" ? "border-brand-primary text-brand-primary" : "border-transparent text-gray-500"
            }`}
            onClick={() => { setTab("card"); setError(""); }}
          >
            <FaCreditCard />
            Card
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold focus:outline-none transition border-b-2 flex items-center gap-2 ${
              tab === "upi" ? "border-brand-primary text-brand-primary" : "border-transparent text-gray-500"
            }`}
            onClick={() => { setTab("upi"); setError(""); }}
          >
            <FaQrcode />
            UPI / QR
          </button>
        </div>
        
        {/* Card Payment Form */}
        {tab === "card" && !success && (
          <form onSubmit={handlePay} className="space-y-4 animate-slide-in">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-brand-primary/20 transition"
              placeholder="Card Number"
              maxLength={19}
              value={card.number}
              onChange={e => setCard({ ...card, number: e.target.value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim() })}
              disabled={loading}
            />
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-brand-primary/20 transition"
              placeholder="Name on Card"
              value={card.name}
              onChange={e => setCard({ ...card, name: e.target.value })}
              disabled={loading}
            />
            <div className="flex gap-2">
              <input
                type="text"
                className="w-1/2 px-3 py-2 border rounded focus:ring-2 focus:ring-brand-primary/20 transition"
                placeholder="MM/YY"
                maxLength={5}
                value={card.expiry}
                onChange={e => setCard({ ...card, expiry: e.target.value })}
                disabled={loading}
              />
              <input
                type="text"
                className="w-1/2 px-3 py-2 border rounded focus:ring-2 focus:ring-brand-primary/20 transition"
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
              className="w-full bg-brand-primary text-white py-3 rounded font-bold hover:bg-red-800 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <span className="w-5 h-5 border-2 border-white border-t-brand-primary rounded-full animate-spin mr-2"></span> : null}
              {loading ? "Processing..." : `Pay Rs. ${totalAmount.toLocaleString()}`}
            </button>
          </form>
        )}
        
        {/* UPI Payment Form */}
        {tab === "upi" && !success && (
          <form onSubmit={handlePay} className="space-y-4 animate-slide-in">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-brand-primary/20 transition"
              placeholder="Enter UPI ID"
              value={upi}
              onChange={e => setUpi(e.target.value)}
              disabled={loading}
            />
            <div className="flex justify-center my-4">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=showsewa@upi" 
                alt="QR Code" 
                className="rounded border" 
              />
            </div>
            {error && <div className="text-red-600 text-sm font-semibold">{error}</div>}
            <button
              type="submit"
              className="w-full bg-brand-primary text-white py-3 rounded font-bold hover:bg-red-800 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <span className="w-5 h-5 border-2 border-white border-t-brand-primary rounded-full animate-spin mr-2"></span> : null}
              {loading ? "Processing..." : `Pay Rs. ${totalAmount.toLocaleString()}`}
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
        
        {/* Security Notice */}
        <div className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
          <FaLock className="w-4 h-4" />
          Your payment is secure and encrypted
        </div>
      </div>
    </section>
  );
};

export default PaymentConfirmation;
