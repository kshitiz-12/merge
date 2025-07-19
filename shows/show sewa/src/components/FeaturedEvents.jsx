import React, { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

function AutoplayPlugin(slider) {
  let timeout;
  let mouseOver = false;
  function clearNextTimeout() { clearTimeout(timeout); }
  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => { slider.next(); }, 2000);
  }
  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => { mouseOver = true; clearNextTimeout(); });
    slider.container.addEventListener("mouseout", () => { mouseOver = false; nextTimeout(); });
    nextTimeout();
  });
  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
}

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/api/events`)
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

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: { perView: 1, spacing: 16 },
      breakpoints: {
        "(min-width: 640px)": { slides: { perView: 2, spacing: 16 } },
        "(min-width: 1024px)": { slides: { perView: 3, spacing: 24 } },
      },
    },
    [AutoplayPlugin]
  );

  // Add this effect to update the slider when events change
  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [events]);

  if (error) {
    return <div className="py-16 text-center text-red-600">{error}</div>;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Events</h2>
        <p className="text-gray-600 mb-8">Discover the hottest events happening in Nepal right now</p>
        <div ref={sliderRef} className="keen-slider">
          {events.map((event) => (
            <div
              key={event._id}
              className="keen-slider__slide bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Event Image with Tag */}
              <div className="relative">
                <img
                  src={`${import.meta.env.VITE_API_URL}${event.image}`}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                {/* Event Type Tag */}
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
                  {event.category || "Event"}
                </div>
                {/* Price Tag */}
                <div className="absolute top-3 right-3 bg-white text-gray-800 px-2 py-1 rounded text-sm font-semibold">
                  {event.price}
                </div>
              </div>
              
              {/* Event Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{event.title}</h3>
                
                {/* Event Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaClock className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{event.time || "7:00 PM"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{event.venue}, {event.city || "Kathmandu"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaUsers className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{event.attendees || "1,000"} attending</span>
                  </div>
                </div>
                
                {/* Price and Book Button */}
                <div className="flex items-center justify-between">
                  <span className="text-red-500 font-bold text-lg">{event.price}</span>
                  <button
                    className="bg-red-500 text-white px-6 py-2 rounded font-semibold hover:bg-red-600 transition"
                    onClick={() => navigate(`/events/${event._id}`)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Events Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/events')}
            className="inline-flex items-center bg-white text-gray-800 border-2 border-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            View All Events →
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents; 