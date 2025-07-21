import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [editing, setEditing] = useState(false);

  if (!user) {
    return (
      <section className="py-16 bg-brand-bg min-h-[60vh] flex items-center justify-center">
        <div className="bg-brand-secondary rounded-xl shadow p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-brand-primary mb-6">Please log in to view your profile.</h1>
          <Link to="/login" className="text-brand-primary hover:underline">Login</Link>
        </div>
      </section>
    );
  }

  const handleSave = () => {
    // For demo: just update the name in local state (not persistent)
    user.name = name;
    setEditing(false);
  };

  return (
    <section className="py-16 bg-brand-bg dark:bg-gray-900 min-h-[60vh] flex items-center justify-center">
      <div className="bg-brand-secondary dark:bg-gray-800 rounded-xl shadow p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-brand-primary dark:text-white mb-6">My Profile</h1>
        <div className="mb-4">
          <label className="block text-brand-text dark:text-gray-100 font-semibold mb-2">Name</label>
          {editing ? (
            <input
              type="text"
              className="w-full px-4 py-2 border border-brand-border dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text dark:bg-gray-900 dark:text-gray-100"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          ) : (
            <div className="text-lg text-brand-text dark:text-gray-100">{user.name}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-brand-text dark:text-gray-100 font-semibold mb-2">Email</label>
          <div className="text-lg text-brand-text dark:text-gray-100">{user.email}</div>
        </div>
        <div className="flex gap-4">
          {editing ? (
            <button
              className="bg-brand-primary text-brand-secondary px-4 py-2 rounded font-semibold hover:bg-red-800 transition"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-brand-primary text-brand-secondary px-4 py-2 rounded font-semibold hover:bg-red-800 transition"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          )}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600 transition"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;