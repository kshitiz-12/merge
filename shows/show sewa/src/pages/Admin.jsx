import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaPlus, FaEdit, FaTrash, FaEye, FaCalendarAlt, FaUsers, FaTicketAlt, FaChartLine, FaCog, FaSignOutAlt, FaHome, FaList } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';

const Admin = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    city: "",
    price: "",
    category: "",
    description: "",
    image: "",
    richDescription: "",
    // New fields for customizable content
    aboutEvent: "",
    featuredArtists: "",
    whatToExpect: "",
    venueInformation: "",
    importantNotes: "",
    // Sidebar categories
    duration: "",
    ageLimit: "",
    language: "",
    // Ticket types
    ticketType1: { name: "General Admission", price: "", description: "", use: false },
    ticketType2: { name: "VIP Seating", price: "", description: "", use: false },
    ticketType3: { name: "Premium Package", price: "", description: "", use: false },
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Check if user is admin
  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
      return;
    }
    
    // Check if user is admin (you can modify this based on your user model)
    if (user.email !== "admin@showsewa.com") {
      navigate("/");
      return;
    }
    
    fetchEvents();
  }, [user, token, navigate]);

  const fetchEvents = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const res = await fetch(`${apiUrl}/api/events`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        setEvents([]);
        setError("Failed to load events.");
      }
    } catch (err) {
      setEvents([]);
      setError("Failed to load events.");
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      let imageUrl = form.image;
      console.log("Initial imageUrl:", imageUrl);
      
      // If a file is selected, upload it first
      if (imageFile) {
        console.log("Uploading image file:", imageFile.name);
        const data = new FormData();
        data.append("image", imageFile);
        const apiUrl = import.meta.env.VITE_API_URL;
        const res = await fetch(`${apiUrl}/api/upload`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          body: data,
        });
        const img = await res.json();
        imageUrl = img.imageUrl;
        console.log("Uploaded imageUrl:", imageUrl);
      }

      const apiUrl = import.meta.env.VITE_API_URL;
      const method = editingEvent ? "PUT" : "POST";
      const url = editingEvent ? `${apiUrl}/api/events/${editingEvent._id}` : `${apiUrl}/api/events`;
      
      const eventData = { ...form, image: imageUrl };
      console.log("Saving event with image:", eventData);
      
      const eventRes = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });

      if (!eventRes.ok) {
        const errorData = await eventRes.json();
        setMessage(`Failed to save event: ${errorData.error || 'Unknown error'}`);
        setLoading(false);
        return;
      }

      const savedEvent = await eventRes.json();
      console.log("Saved event:", savedEvent);
      
      if (editingEvent) {
        setEvents(events.map(e => e._id === editingEvent._id ? savedEvent : e));
        setMessage("Event updated successfully!");
      } else {
        setEvents([savedEvent, ...events]);
        setMessage("Event added successfully!");
      }
      
      resetForm();
    } catch (err) {
      console.error("Error saving event:", err);
      setMessage("Error saving event.");
    }
    setLoading(false);
  };

  const resetForm = () => {
    setForm({
      title: "",
      date: "",
      time: "",
      venue: "",
      city: "",
      price: "",
      category: "",
      description: "",
      image: "",
      richDescription: "",
      // New fields for customizable content
      aboutEvent: "",
      featuredArtists: "",
      whatToExpect: "",
      venueInformation: "",
      importantNotes: "",
      // Sidebar categories
      duration: "",
      ageLimit: "",
      language: "",
      // Ticket types
      ticketType1: { name: "General Admission", price: "", description: "", use: false },
      ticketType2: { name: "VIP Seating", price: "", description: "", use: false },
      ticketType3: { name: "Premium Package", price: "", description: "", use: false },
    });
    setImageFile(null);
    setEditingEvent(null);
    setShowModal(false);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setForm({
      title: event.title || "",
      date: event.date || "",
      time: event.time || "",
      venue: event.venue || "",
      city: event.city || "",
      price: event.price || "",
      category: event.category || "",
      description: event.description || "",
      image: event.image || "",
      richDescription: event.richDescription || "",
      // New fields for customizable content
      aboutEvent: event.aboutEvent || "",
      featuredArtists: event.featuredArtists || "",
      whatToExpect: event.whatToExpect || "",
      venueInformation: event.venueInformation || "",
      importantNotes: event.importantNotes || "",
      // Sidebar categories
      duration: event.duration || "",
      ageLimit: event.ageLimit || "",
      language: event.language || "",
      // Ticket types
      ticketType1: event.ticketType1 || { name: "General Admission", price: "", description: "", use: false },
      ticketType2: event.ticketType2 || { name: "VIP Seating", price: "", description: "", use: false },
      ticketType3: event.ticketType3 || { name: "Premium Package", price: "", description: "", use: false },
    });
    setShowModal(true);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const res = await fetch(`${apiUrl}/api/events/${eventId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        
        if (res.ok) {
          setEvents(events.filter(e => e._id !== eventId));
          setMessage("Event deleted successfully!");
        } else {
          const errorData = await res.json();
          setMessage(`Failed to delete event: ${errorData.error || 'Unknown error'}`);
        }
      } catch (err) {
        setMessage("Error deleting event.");
      }
    }
  };

  const stats = [
    {
      title: "Total Events",
      value: events.length,
      icon: <FaCalendarAlt className="text-2xl text-brand-primary" />,
      color: "bg-brand-primary/10"
    },
    {
      title: "Total Bookings",
      value: "1,234",
      icon: <FaTicketAlt className="text-2xl text-brand-primary" />,
      color: "bg-brand-primary/10"
    },
    {
      title: "Active Users",
      value: "5,678",
      icon: <FaUsers className="text-2xl text-brand-primary" />,
      color: "bg-brand-primary/10"
    },
    {
      title: "Revenue",
      value: "Rs. 2.5M",
      icon: <FaChartLine className="text-2xl text-brand-primary" />,
      color: "bg-brand-primary/10"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center h-16 bg-brand-primary text-brand-secondary">
          <h1 className="text-xl font-bold">
            Show<span className="font-devanagari">सेवा</span> Admin
          </h1>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
                activeTab === "dashboard" ? "bg-brand-primary/10 text-brand-primary" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FaHome className="mr-3" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
                activeTab === "events" ? "bg-brand-primary/10 text-brand-primary" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FaList className="mr-3" />
              Events
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
                activeTab === "settings" ? "bg-brand-primary/10 text-brand-primary" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FaCog className="mr-3" />
              Settings
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {activeTab === "dashboard" && "Dashboard"}
            {activeTab === "events" && "Event Management"}
            {activeTab === "settings" && "Settings"}
          </h2>
          {activeTab === "events" && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-brand-primary text-brand-secondary px-4 py-2 rounded-lg flex items-center hover:bg-red-800 transition"
            >
              <FaPlus className="mr-2" />
              Add Event
            </button>
          )}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className={`${stat.color} rounded-xl p-6 shadow-sm`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Events */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Events</h3>
              <div className="space-y-4">
                {events.slice(0, 5).map((event) => (
                  <div key={event._id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={`${import.meta.env.VITE_API_URL}${event.image}`} 
                      alt={event.title} 
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.date} • {event.venue}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-600">{event.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div className="space-y-6">
            {message && (
              <div className={`p-4 rounded-lg ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-brand-maroon/10 text-brand-maroon"}`}>
                {message}
              </div>
            )}
            
            {error && (
              <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <img 
                    src={`${import.meta.env.VITE_API_URL}${event.image}`} 
                    alt={event.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <div className="space-y-1 text-sm text-gray-600 mb-4">
                      <p>📅 {event.date}</p>
                      <p>🕐 {event.time || "7:00 PM"}</p>
                      <p>📍 {event.venue}, {event.city || "Kathmandu"}</p>
                      <p>💰 {event.price}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="flex-1 bg-brand-primary text-brand-secondary px-3 py-2 rounded text-sm hover:bg-red-800 transition flex items-center justify-center"
                      >
                        <FaEdit className="mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition flex items-center justify-center"
                      >
                        <FaTrash className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Settings</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">System Information</h4>
                <p className="text-sm text-gray-600">Version: 1.0.0</p>
                <p className="text-sm text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-brand-primary hover:text-red-800">
                    Export Events Data
                  </button>
                  <button className="w-full text-left text-sm text-brand-primary hover:text-red-800">
                    Backup Database
                  </button>
                  <button className="w-full text-left text-sm text-brand-primary hover:text-red-800">
                    System Maintenance
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingEvent ? "Edit Event" : "Add New Event"}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Event Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Basic Event Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    required
                  />
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    required
                  />
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="venue"
                    placeholder="Venue"
                    value={form.venue}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                                  <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rs.</span>
                  <input
                    type="number"
                    name="price"
                    placeholder="1500"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    required
                  />
                </div>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    <option value="Concert">Concert</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Movie">Movie</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>
              </div>

              {/* Sidebar Categories */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Sidebar Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="duration"
                    placeholder="Duration (e.g., 3 hours)"
                    value={form.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="ageLimit"
                    placeholder="Age Limit (e.g., All ages)"
                    value={form.ageLimit}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="language"
                    placeholder="Language (e.g., Nepali, English)"
                    value={form.language}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Ticket Types */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Ticket Types</h4>
                <div className="space-y-4">
                  {/* Ticket Type 1 */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <input
                        type="checkbox"
                        checked={form.ticketType1.use}
                        onChange={(e) => setForm({
                          ...form,
                          ticketType1: { ...form.ticketType1, use: e.target.checked }
                        })}
                        className="w-4 h-4 text-brand-primary"
                      />
                      <span className="font-medium">Use Ticket Type 1</span>
                    </div>
                    {form.ticketType1.use && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                          type="text"
                          placeholder="Ticket Name (e.g., General Admission)"
                          value={form.ticketType1.name}
                          onChange={(e) => setForm({
                            ...form,
                            ticketType1: { ...form.ticketType1, name: e.target.value }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rs.</span>
                          <input
                            type="number"
                            placeholder="1500"
                            value={form.ticketType1.price.replace(/[^\d]/g, '')}
                            onChange={(e) => {
                              const value = e.target.value;
                              const formattedValue = value ? `Rs. ${parseInt(value).toLocaleString()}` : '';
                              setForm({
                                ...form,
                                ticketType1: { ...form.ticketType1, price: formattedValue }
                              });
                            }}
                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Description"
                          value={form.ticketType1.description}
                          onChange={(e) => setForm({
                            ...form,
                            ticketType1: { ...form.ticketType1, description: e.target.value }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>

                  {/* Ticket Type 2 */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <input
                        type="checkbox"
                        checked={form.ticketType2.use}
                        onChange={(e) => setForm({
                          ...form,
                          ticketType2: { ...form.ticketType2, use: e.target.checked }
                        })}
                        className="w-4 h-4 text-brand-primary"
                      />
                      <span className="font-medium">Use Ticket Type 2</span>
                    </div>
                    {form.ticketType2.use && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                          type="text"
                          placeholder="Ticket Name (e.g., VIP Seating)"
                          value={form.ticketType2.name}
                          onChange={(e) => setForm({
                            ...form,
                            ticketType2: { ...form.ticketType2, name: e.target.value }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rs.</span>
                          <input
                            type="number"
                            placeholder="3000"
                            value={form.ticketType2.price.replace(/[^\d]/g, '')}
                            onChange={(e) => {
                              const value = e.target.value;
                              const formattedValue = value ? `Rs. ${parseInt(value).toLocaleString()}` : '';
                              setForm({
                                ...form,
                                ticketType2: { ...form.ticketType2, price: formattedValue }
                              });
                            }}
                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Description"
                          value={form.ticketType2.description}
                          onChange={(e) => setForm({
                            ...form,
                            ticketType2: { ...form.ticketType2, description: e.target.value }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>

                  {/* Ticket Type 3 */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <input
                        type="checkbox"
                        checked={form.ticketType3.use}
                        onChange={(e) => setForm({
                          ...form,
                          ticketType3: { ...form.ticketType3, use: e.target.checked }
                        })}
                        className="w-4 h-4 text-brand-primary"
                      />
                      <span className="font-medium">Use Ticket Type 3</span>
                    </div>
                    {form.ticketType3.use && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                          type="text"
                          placeholder="Ticket Name (e.g., Premium Package)"
                          value={form.ticketType3.name}
                          onChange={(e) => setForm({
                            ...form,
                            ticketType3: { ...form.ticketType3, name: e.target.value }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rs.</span>
                          <input
                            type="number"
                            placeholder="5000"
                            value={form.ticketType3.price.replace(/[^\d]/g, '')}
                            onChange={(e) => {
                              const value = e.target.value;
                              const formattedValue = value ? `Rs. ${parseInt(value).toLocaleString()}` : '';
                              setForm({
                                ...form,
                                ticketType3: { ...form.ticketType3, price: formattedValue }
                              });
                            }}
                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Description"
                          value={form.ticketType3.description}
                          onChange={(e) => setForm({
                            ...form,
                            ticketType3: { ...form.ticketType3, description: e.target.value }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Event Content Sections */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Event Content</h4>
                <div className="space-y-4">
                  <textarea
                    name="aboutEvent"
                    placeholder="About This Event - Main description"
                    value={form.aboutEvent}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                  <textarea
                    name="featuredArtists"
                    placeholder="Featured Artists - One per line (e.g., • Narayan Gopal Tribute Band)"
                    value={form.featuredArtists}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                  <textarea
                    name="whatToExpect"
                    placeholder="What to Expect - One per line (e.g., • 6+ hours of non-stop entertainment)"
                    value={form.whatToExpect}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                  <textarea
                    name="venueInformation"
                    placeholder="Venue Information - Detailed venue description"
                    value={form.venueInformation}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                  <textarea
                    name="importantNotes"
                    placeholder="Important Notes - One per line (e.g., • Gates open at 6:00 PM)"
                    value={form.importantNotes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                </div>
              </div>
              
              <textarea
                name="description"
                placeholder="Event Description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                required
              />
              <textarea
                name="richDescription"
                placeholder="Detailed event description (Markdown supported)"
                value={form.richDescription}
                onChange={handleChange}
                rows="8"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />
              <div className="bg-gray-50 rounded p-4 mt-2">
                <div className="font-semibold mb-1 text-gray-700">Preview:</div>
                <ReactMarkdown>{form.richDescription}</ReactMarkdown>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Event Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Or enter image URL"
                  value={form.image}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-brand-primary text-brand-secondary px-6 py-3 rounded-lg font-semibold hover:bg-red-800 transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : (editingEvent ? "Update Event" : "Add Event")}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin; 