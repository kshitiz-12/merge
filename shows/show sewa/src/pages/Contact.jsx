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
    <section className="py-16 bg-brand-cream min-h-[60vh]">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-brand-maroon mb-8">Contact Us</h1>
        {submitted ? (
          <div className="text-brand-gold text-lg font-semibold text-center">Thank you for reaching out! We'll get back to you soon.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-brand-maroon mb-2">Name</label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border border-brand-gold rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-brand-maroon mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-brand-gold rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-brand-maroon mb-2">Message</label>
              <textarea
                name="message"
                className="w-full px-4 py-2 border border-brand-gold rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-maroon text-brand-gold px-6 py-2 rounded hover:bg-brand-gold hover:text-brand-maroon border-2 border-brand-maroon transition font-semibold"
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