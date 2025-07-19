import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-16 bg-brand-bg min-h-[60vh]">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-brand-primary mb-8">Contact Us</h1>
        {submitted ? (
          <div className="text-brand-primary text-lg font-semibold text-center">Thank you for reaching out! We'll get back to you soon.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-brand-primary mb-2">Name</label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border border-brand-border rounded focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-brand-primary mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-brand-border rounded focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-brand-primary mb-2">Message</label>
              <textarea
                name="message"
                className="w-full px-4 py-2 border border-brand-border rounded focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text"
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-primary text-brand-secondary px-6 py-2 rounded hover:bg-red-800 hover:text-brand-secondary border-2 border-brand-primary transition font-semibold"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact; 