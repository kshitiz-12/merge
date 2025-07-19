import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <section className="py-16 bg-brand-bg min-h-[60vh] flex items-center justify-center">
      <div className="bg-brand-secondary rounded-xl shadow p-8 w-full max-w-md border-2 border-brand-border">
        <h1 className="text-3xl font-bold text-brand-primary mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="w-full bg-brand-primary text-brand-secondary px-6 py-2 rounded font-semibold hover:bg-red-800 hover:text-brand-secondary border-2 border-brand-primary transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <div className="text-brand-primary font-semibold">{error}</div>}
        </form>
        <div className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-brand-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login; 