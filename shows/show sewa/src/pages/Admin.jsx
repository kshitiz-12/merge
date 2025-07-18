import React, { useState, useEffect } from "react";

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    date: "",
    venue: "",
    price: "",
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch events from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          setEvents([]);
          setError("Failed to load events.");
        }
      })
      .catch(() => {
        setEvents([]);
        setError("Failed to load events.");
      });
  }, []);

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
      // If a file is selected, upload it first
      if (imageFile) {
        const data = new FormData();
        data.append("image", imageFile);
        const res = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          body: data,
        });
        const img = await res.json();
        imageUrl = img.imageUrl;
      }

      // Create event
      const eventRes = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, image: imageUrl }),
      });

      if (!eventRes.ok) {
        setMessage("Failed to add event.");
        setLoading(false);
        return;
      }

      const newEvent = await eventRes.json();
      setEvents([newEvent, ...events]);
      setForm({ title: "", date: "", venue: "", price: "", description: "", image: "" });
      setImageFile(null);
      setMessage("Event added!");
    } catch (err) {
      setMessage("Error adding event.");
    }
    setLoading(false);
  };

  return (
    <section className="py-16 bg-gray-50 min-h-[60vh]">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8 space-y-4">
          <input
            type="text"
            name="title"
            className="w-full px-4 py-2 border rounded"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="date"
            className="w-full px-4 py-2 border rounded"
            placeholder="Date"
            value={form.date}
            onChange={handleChange}
          />
          <input
            type="text"
            name="venue"
            className="w-full px-4 py-2 border rounded"
            placeholder="Venue"
            value={form.venue}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            className="w-full px-4 py-2 border rounded"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />
          <input
            type="file"
            accept="image/*"
            className="w-full px-4 py-2 border rounded"
            onChange={handleImageChange}
          />
          <input
            type="text"
            name="image"
            className="w-full px-4 py-2 border rounded"
            placeholder="Image URL (optional if uploading)"
            value={form.image}
            onChange={handleChange}
          />
          <textarea
            name="description"
            className="w-full px-4 py-2 border rounded"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Event"}
          </button>
          {message && <div className="text-green-600 font-semibold">{message}</div>}
        </form>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Events</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.isArray(events) && events.map((event) => (
            <div key={event._id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
              <img src={`http://localhost:5000${event.image}`} alt={event.title} className="w-24 h-24 object-cover rounded-lg mb-2" />
              <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
              <div className="text-gray-500 text-sm mb-1">{event.date} | {event.venue}</div>
              <div className="font-bold text-blue-600 mb-1">{event.price}</div>
              <div className="text-gray-600 text-xs text-center mb-2">{event.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Admin; 