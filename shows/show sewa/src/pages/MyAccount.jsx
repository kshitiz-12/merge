import React, { useState, useEffect } from "react";
import { FaUser, FaTicketAlt, FaHeart, FaBell, FaGift, FaCog } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const sections = [
  { key: "profile", label: "Profile", icon: <FaUser /> },
  { key: "bookings", label: "My Bookings", icon: <FaTicketAlt /> },
  { key: "favourites", label: "Favourites", icon: <FaHeart /> },
  { key: "notifications", label: "Notifications", icon: <FaBell /> },
  { key: "loyalty", label: "Loyalty Points", icon: <FaGift /> },
  { key: "settings", label: "Settings", icon: <FaCog /> },
];

const ProfileSection = () => {
  const { user, token, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  useEffect(() => {
    if (!user || !token) return;
    setLoading(true);
    setError("");
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setName(data.name);
        setPhone(data.phone);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load profile");
        setLoading(false);
      });
  }, [user, token]);

  const handleSave = () => {
    setError(""); setSuccess("");
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, phone }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else {
          setProfile(data);
          setSuccess("Profile updated");
          setEditing(false);
        }
      })
      .catch(() => setError("Update failed"));
  };

  const handleChangePassword = () => {
    setPwMsg("");
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) setPwMsg(data.error);
        else setPwMsg("Password changed successfully");
        setOldPassword(""); setNewPassword("");
      })
      .catch(() => setPwMsg("Password change failed"));
  };

  if (!user) return <div>Please log in to view your profile.</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Name</label>
        {editing ? (
          <input value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border rounded" />
        ) : (
          <div>{profile.name}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Phone</label>
        {editing ? (
          <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2 border rounded" />
        ) : (
          <div>{profile.phone}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Email</label>
        <div>{profile.email}</div>
      </div>
      <div className="flex gap-4 mb-6">
        {editing ? (
          <button className="bg-brand-primary text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
        ) : (
          <button className="bg-brand-primary text-white px-4 py-2 rounded" onClick={() => setEditing(true)}>Edit</button>
        )}
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={logout}>Logout</button>
      </div>
      <div className="mb-2">
        <button className="text-brand-primary underline" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide Password Change" : "Change Password"}
        </button>
      </div>
      {showPassword && (
        <div className="bg-gray-100 p-4 rounded mb-2">
          <input type="password" placeholder="Old Password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="w-full mb-2 px-3 py-2 border rounded" />
          <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full mb-2 px-3 py-2 border rounded" />
          <button className="bg-brand-primary text-white px-4 py-2 rounded" onClick={handleChangePassword}>Change Password</button>
          {pwMsg && <div className="mt-2 text-sm text-brand-primary">{pwMsg}</div>}
        </div>
      )}
    </div>
  );
};

const BookingsSection = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load bookings");
        setLoading(false);
      });
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!bookings.length) return <div>No bookings found.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <ul className="space-y-4">
        {bookings.map(b => (
          <li key={b._id} className="border rounded p-4 bg-gray-50">
            <div className="font-semibold">{b.event?.title || "Event"}</div>
            <div>Date: {b.event?.date}</div>
            <div>Venue: {b.event?.venue}</div>
            <div>Tickets: {b.totalTickets}</div>
            <div>Total: NPR {b.totalAmount}</div>
            <div>Status: <span className="font-semibold">{b.status}</span></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FavouritesSection = () => {
  const { token } = useAuth();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/favourites`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setFavourites(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load favourites");
        setLoading(false);
      });
  }, [token]);

  const handleRemove = (eventId) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/favourites/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ eventId }),
    })
      .then(res => res.json())
      .then(() => setFavourites(favourites.filter(f => f.event._id !== eventId)))
      .catch(() => setError("Failed to remove favourite"));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!favourites.length) return <div>No favourites found.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Favourites</h2>
      <ul className="space-y-4">
        {favourites.map(f => (
          <li key={f._id} className="border rounded p-4 bg-gray-50 flex justify-between items-center">
            <div>
              <div className="font-semibold">{f.event?.title || "Event"}</div>
              <div>Date: {f.event?.date}</div>
              <div>Venue: {f.event?.venue}</div>
            </div>
            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleRemove(f.event._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const NotificationsSection = () => {
  const { token } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setNotifications(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load notifications");
        setLoading(false);
      });
  }, [token]);

  const markAsRead = (notificationId) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/notifications/read`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ notificationId }),
    })
      .then(res => res.json())
      .then(updated => {
        setNotifications(notifications.map(n => n._id === updated._id ? updated : n));
      })
      .catch(() => setError("Failed to mark as read"));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!notifications.length) return <div>No notifications found.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <ul className="space-y-4">
        {notifications.map(n => (
          <li key={n._id} className={`border rounded p-4 ${n.read ? 'bg-gray-100' : 'bg-yellow-50'}`}> 
            <div>{n.message}</div>
            <div className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</div>
            {!n.read && (
              <button className="mt-2 bg-brand-primary text-white px-3 py-1 rounded" onClick={() => markAsRead(n._id)}>Mark as read</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const LoyaltySection = () => {
  const { token } = useAuth();
  const [points, setPoints] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [redeemMsg, setRedeemMsg] = useState("");

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/loyalty`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setPoints(data.total);
        setHistory(data.history);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load loyalty points");
        setLoading(false);
      });
  }, [token]);

  const handleRedeem = (amount) => {
    setRedeemMsg("");
    fetch(`${import.meta.env.VITE_API_URL}/api/loyalty/redeem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount, description: `Redeemed ${amount} points` }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) setRedeemMsg(data.error);
        else {
          setRedeemMsg("Redeemed successfully");
          setPoints(points - amount);
          setHistory([{...data, createdAt: new Date()}, ...history]);
        }
      })
      .catch(() => setRedeemMsg("Redemption failed"));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Loyalty Points</h2>
      <div className="mb-4 p-4 bg-yellow-100 rounded flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold">{points}</div>
          <div className="text-sm">Loyalty Points</div>
        </div>
        <div className="flex flex-col gap-2">
          <button disabled={points < 500} onClick={() => handleRedeem(500)} className="bg-brand-primary text-white px-4 py-2 rounded disabled:opacity-50">NPR 100 Off (500 points)</button>
          <button disabled={points < 1000} onClick={() => handleRedeem(1000)} className="bg-brand-primary text-white px-4 py-2 rounded disabled:opacity-50">NPR 250 Off (1000 points)</button>
        </div>
      </div>
      {redeemMsg && <div className="mb-2 text-brand-primary">{redeemMsg}</div>}
      <div className="mb-2 font-semibold">Points History</div>
      <ul className="space-y-2">
        {history.map((h, idx) => (
          <li key={idx} className="border rounded p-2 flex justify-between">
            <span>{h.description || h.type}</span>
            <span className={h.type === 'earn' ? 'text-green-600' : 'text-red-600'}>
              {h.type === 'earn' ? '+' : '-'}{h.amount}
            </span>
            <span className="text-xs text-gray-500">{new Date(h.createdAt).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SettingsSection = () => <div>Settings content goes here.</div>;

const MyAccount = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const renderSection = () => {
    switch (activeSection) {
      case "profile": return <ProfileSection />;
      case "bookings": return <BookingsSection />;
      case "favourites": return <FavouritesSection />;
      case "notifications": return <NotificationsSection />;
      case "loyalty": return <LoyaltySection />;
      case "settings": return <SettingsSection />;
      default: return null;
    }
  };

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
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default MyAccount; 