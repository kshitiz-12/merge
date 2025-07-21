import React, { useState } from "react";
import { FaUser, FaTicketAlt, FaHeart, FaBell, FaGift, FaCog } from "react-icons/fa";

const sections = [
  { key: "profile", label: "Profile", icon: <FaUser /> },
  { key: "bookings", label: "My Bookings", icon: <FaTicketAlt /> },
  { key: "favourites", label: "Favourites", icon: <FaHeart /> },
  { key: "notifications", label: "Notifications", icon: <FaBell /> },
  { key: "loyalty", label: "Loyalty Points", icon: <FaGift /> },
  { key: "settings", label: "Settings", icon: <FaCog /> },
];

const mockContent = {
  profile: <div>Profile content goes here.</div>,
  bookings: <div>My Bookings content goes here.</div>,
  favourites: <div>Favourites content goes here.</div>,
  notifications: <div>Notifications content goes here.</div>,
  loyalty: <div>Loyalty Points content goes here.</div>,
  settings: <div>Settings content goes here.</div>,
};

const MyAccount = () => {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="flex min-h-screen bg-brand-bg">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-secondary shadow-lg flex flex-col items-center py-8">
        <img src="/images/logo.jpeg" alt="Account Logo" className="h-16 w-16 rounded-full mb-6" />
        <nav className="flex flex-col w-full">
          {sections.map((section) => (
            <button
              key={section.key}
              className={`flex items-center gap-3 px-6 py-3 text-lg font-medium w-full text-left transition-colors rounded-l-full mb-2 ${
                activeSection === section.key
                  ? "bg-brand-primary text-white"
                  : "text-brand-text hover:bg-brand-primary/10"
              }`}
              onClick={() => setActiveSection(section.key)}
            >
              <span className="text-xl">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </nav>
      </aside>
      {/* Content */}
      <main className="flex-1 p-10 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow p-8 min-h-[400px]">
          {mockContent[activeSection]}
        </div>
      </main>
    </div>
  );
};

export default MyAccount; 