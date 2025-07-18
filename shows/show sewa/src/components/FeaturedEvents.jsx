import React, { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useNavigate } from "react-router-dom";

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
    <section className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Events</h2>
        <p className="text-gray-600 mb-8">Discover the hottest events happening in Nepal right now</p>
        <div ref={sliderRef} className="keen-slider">
          {events.map((event) => (
            <div
              key={event._id}
              className="keen-slider__slide bg-white rounded-xl shadow p-6 flex flex-col items-center"
            >
              <img
                src={`${import.meta.env.VITE_API_URL}${event.image}`}
                alt={event.title}
                className="w-40 h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <ul className="text-gray-500 text-sm mb-4">
                <li>Date: {event.date}</li>
                <li>Venue: {event.venue}</li>
              </ul>
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-blue-600">{event.price}</span>
                <button
                  className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => navigate(`/events/${event._id}`)}
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents; 