import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [editing, setEditing] = useState(false);

  if (!user) {
    return (
      <section className="py-16 bg-blue-50 min-h-[60vh] flex items-center justify-center">
        <div className="bg-white rounded-xl shadow p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Please log in to view your profile.</h1>
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
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
    <section className="py-16 bg-blue-50 min-h-[60vh] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          {editing ? (
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          ) : (
            <div className="text-lg">{user.name}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <div className="text-lg">{user.email}</div>
        </div>
        <div className="flex gap-4">
          {editing ? (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          )}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded font-semibold"
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