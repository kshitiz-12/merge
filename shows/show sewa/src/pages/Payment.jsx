import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaMinus, FaPlus, FaUser, FaEnvelope, FaPhone, FaMapPin, FaFilm } from "react-icons/fa";
import MovieLoader from "../components/MovieLoader";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, selectedTicket, quantity } = location.state || {};
  const { user, token } = useAuth();
  
  // Check if user is logged in
  useEffect(() => {
    if (!token) {
      navigate('/login', { state: { from: location.pathname, event } });
      return;
    }
  }, [token, navigate, location.pathname, event]);
  
  const [ticketQuantities, setTicketQuantities] = useState({
    general: 0,
    vip: 0,
    premium: 0
  });
  
  const [customerInfo, setCustomerInfo] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    city: ""
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  // Generate dynamic ticket types from event data
  const generateTicketTypes = () => {
    const types = [];
    
    // Helper function to extract price from formatted string
    const extractPrice = (priceString) => {
      if (!priceString) return 0;
      console.log('Extracting price from:', priceString);
      const match = priceString.match(/Rs\.\s*([\d,]+)/);
      if (match) {
        const extracted = parseInt(match[1].replace(/,/g, ''));
        console.log('Extracted price:', extracted);
        return extracted;
      }
      const fallback = parseInt(priceString.replace(/[^\d]/g, '')) || 0;
      console.log('Fallback price:', fallback);
      return fallback;
    };
    
    if (event?.ticketType1?.use) {
      console.log('Adding ticket type 1:', event.ticketType1);
      types.push({
        id: "type1",
        name: event.ticketType1.name,
        price: extractPrice(event.ticketType1.price),
        description: event.ticketType1.description
      });
    }
    if (event?.ticketType2?.use) {
      console.log('Adding ticket type 2:', event.ticketType2);
      types.push({
        id: "type2",
        name: event.ticketType2.name,
        price: extractPrice(event.ticketType2.price),
        description: event.ticketType2.description
      });
    }
    if (event?.ticketType3?.use) {
      console.log('Adding ticket type 3:', event.ticketType3);
      types.push({
        id: "type3",
        name: event.ticketType3.name,
        price: extractPrice(event.ticketType3.price),
        description: event.ticketType3.description
      });
    }
    return types.length > 0 ? types : [
      {
        id: "general",
        name: "General Admission",
        price: 1500,
        description: "Standing area with great view of the stage"
      },
      {
        id: "vip",
        name: "VIP Seating",
        price: 3000,
        description: "Reserved seating with complimentary refreshments"
      },
      {
        id: "premium",
        name: "Premium Package",
        price: 5000,
        description: "Front row seats, meet & greet, and exclusive merchandise"
      }
    ]; // Fallback to default if none configured
  };

  const ticketTypes = generateTicketTypes();
  
  // Debug logging
  console.log('Ticket types:', ticketTypes);
  console.log('Ticket quantities:', ticketQuantities);

  // Initialize ticket quantities based on available ticket types
  useEffect(() => {
    console.log('Initializing ticket quantities for types:', ticketTypes.map(t => t.id));
    const initialQuantities = {};
    ticketTypes.forEach(ticket => {
      initialQuantities[ticket.id] = 0;
    });
    console.log('Initial quantities:', initialQuantities);
    setTicketQuantities(initialQuantities);
  }, [ticketTypes.length]); // Only re-run when number of ticket types changes

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-600">
        <h2 className="text-2xl font-bold mb-4">No Event Data</h2>
        <Link to="/events" className="text-brand-primary hover:underline">Back to Events</Link>
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

  if (loading) {
    return <MovieLoader />;
  }

  const updateQuantity = (ticketId, change) => {
    console.log('updateQuantity called:', ticketId, change);
    setTicketQuantities(prev => {
      const newQuantity = Math.max(0, prev[ticketId] + change);
      console.log('New quantity for', ticketId, ':', newQuantity);
      return {
        ...prev,
        [ticketId]: newQuantity
      };
    });
  };

  const getTotalTickets = () => {
    return Object.values(ticketQuantities).reduce((sum, qty) => sum + (qty || 0), 0);
  };

  const getTotalAmount = () => {
    return ticketTypes.reduce((total, ticket) => {
      const quantity = ticketQuantities[ticket.id] || 0;
      return total + (ticket.price * quantity);
    }, 0);
  };

  const handleProceedToCheckout = () => {
    if (getTotalTickets() === 0) {
      setError("Please select at least one ticket.");
      return;
    }
    if (!customerInfo.fullName || !customerInfo.email || !customerInfo.phone) {
      setError("Please fill in all required fields.");
      return;
    }
    setButtonLoading(true);
    setTimeout(() => {
      navigate("/payment-confirmation", {
        state: {
          event,
          ticketQuantities,
          customerInfo,
        },
      });
    }, 800);
  };

  return (
    <section className="py-16 bg-gray-50 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Link */}
        <div className="mb-8">
          <Link to={`/events/${event._id}`} className="text-gray-600 hover:text-gray-800 transition">
            ← Back to Event Details
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Section - Book Tickets */}
          <div className="space-y-8">
            {/* Book Tickets Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Book Tickets</h1>
              
              {/* Event Information Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex items-center space-x-4">
                  <img 
                    src={`${import.meta.env.VITE_API_URL}${event.image}`} 
                    alt={event.title} 
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FaCalendarAlt className="w-4 h-4 mr-2" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="w-4 h-4 mr-2" />
                        <span>{event.time || "7:00 PM"}</span>
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                        <span>{event.venue}, {event.city || "Kathmandu"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Select Tickets */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Tickets</h2>
              
              <div className="space-y-6">
                {ticketTypes.map((ticket) => (
                  <div key={ticket.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{ticket.name}</h3>
                        <p className="text-gray-600 text-sm">{ticket.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-brand-primary font-bold text-lg">Rs. {ticket.price.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Quantity</span>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => updateQuantity(ticket.id, -1)}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
                        >
                          <FaMinus className="w-3 h-3" />
                        </button>
                        <span className="w-12 text-center font-semibold">{ticketQuantities[ticket.id] || 0}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(ticket.id, 1)}
                          className="w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center hover:bg-red-800 transition"
                        >
                          <FaPlus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={customerInfo.fullName}
                      onChange={(e) => setCustomerInfo({...customerInfo, fullName: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">City</label>
                  <div className="relative">
                    <FaMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    >
                      <option value="">Select your city</option>
                      <option value="Kathmandu">Kathmandu</option>
                      <option value="Pokhara">Pokhara</option>
                      <option value="Lalitpur">Lalitpur</option>
                      <option value="Bhaktapur">Bhaktapur</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {getTotalTickets() === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p>Select tickets to see order summary</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {ticketTypes.map((ticket) => {
                    const quantity = ticketQuantities[ticket.id] || 0;
                    console.log(`Ticket ${ticket.id}: quantity = ${quantity}, price = ${ticket.price}`);
                    if (quantity > 0) {
                      return (
                        <div key={ticket.id} className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-gray-900">{ticket.name}</div>
                            <div className="text-sm text-gray-500">Qty: {quantity}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">
                              Rs. {(ticket.price * quantity).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Total Tickets</span>
                      <span className="font-medium">{getTotalTickets()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total Amount</span>
                      <span className="text-2xl font-bold text-brand-primary">
                        Rs. {getTotalAmount().toLocaleString()}
                      </span>
                    </div>
                    {console.log('Total tickets:', getTotalTickets(), 'Total amount:', getTotalAmount())}
                  </div>
                  
                  <button
                    onClick={handleProceedToCheckout}
                    className="bg-brand-primary text-brand-secondary px-6 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-red-800 hover:text-brand-secondary border-2 border-brand-primary transition w-full mt-6 flex items-center justify-center gap-2 disabled:opacity-60"
                    disabled={buttonLoading}
                  >
                    {buttonLoading ? <FaFilm className="animate-spin text-xl" /> : null}
                    {buttonLoading ? "Processing..." : "Proceed to Checkout"}
                  </button>
                  
                  <div className="text-center text-gray-600 text-sm mt-4">
                    Secure payment with eSewa & Khalti
                  </div>
                </div>
              )}
              
              {error && (
                <div className="mt-4 p-4 bg-brand-primary/10 border border-brand-primary text-brand-primary rounded-lg">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment; 