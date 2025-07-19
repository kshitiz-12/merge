import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    
    try {
      await register(form.name, form.email, form.password);
      // Redirect to the original page if coming from payment, otherwise go to home
      if (location.state?.from) {
        navigate(location.state.from, { state: location.state.event });
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-brand-bg via-gray-100 to-brand-secondary min-h-[60vh] flex items-center justify-center">
      <div className="bg-brand-secondary rounded-xl shadow p-8 w-full max-w-md border-2 border-brand-border">
        <h1 className="text-3xl font-bold text-brand-primary mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border border-brand-border rounded focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border border-brand-border rounded focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border border-brand-border rounded focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          <input
            type="password"
            name="confirmPassword"
            className="w-full px-4 py-2 border border-brand-border rounded focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          <button
            type="submit"
            className="w-full bg-brand-primary text-brand-secondary px-6 py-2 rounded font-semibold hover:bg-red-800 hover:text-brand-secondary border-2 border-brand-primary transition"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          {error && <div className="text-brand-primary font-semibold">{error}</div>}
        </form>
        <div className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-brand-primary hover:underline">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Signup;
