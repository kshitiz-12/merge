import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-16 bg-brand-bg min-h-[60vh] flex items-center justify-center">
      <div className="bg-brand-secondary rounded-xl shadow p-12 w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-4">Get In Touch</h1>
          <p className="text-lg text-brand-text max-w-3xl mx-auto">
            We'll create high-quality linkable content and build at least 40 high-authority links to each asset, 
            paving the way for you to grow your rankings, improve brand.
          </p>
        </div>

        {/* Two Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Contact Information */}
          <div className="bg-gradient-to-br from-brand-primary to-red-800 rounded-2xl p-8 text-brand-secondary">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-brand-secondary/90 mb-8">
              We'll create high-quality linkable content and build at least 40 high-authority.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <FaPhone className="w-5 h-5 mr-4 text-brand-secondary" />
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-brand-secondary/90">+977-1-4444444</div>
                  <div className="text-brand-secondary/90">+977-1-4444445</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <FaEnvelope className="w-5 h-5 mr-4 text-brand-secondary" />
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-brand-secondary/90">info@showsewa.com</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <FaMapMarkerAlt className="w-5 h-5 mr-4 text-brand-secondary" />
                <div>
                  <div className="font-semibold">Address</div>
                  <div className="text-brand-secondary/90">Kathmandu, Nepal</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Contact Form */}
          <div className="bg-brand-secondary rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-brand-primary mb-6">Send Message</h2>
            
            {submitted ? (
              <div className="text-brand-primary text-lg font-semibold text-center">
                Thank you for reaching out! We'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-brand-primary font-semibold mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-brand-primary font-semibold mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text"
                    placeholder="hello@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-brand-primary font-semibold mb-2">Your Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="w-full px-4 py-3 border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text"
                    placeholder="I want to hire you quickly"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-brand-primary font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    className="w-full px-4 py-3 border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text"
                    rows={4}
                    placeholder="Write here your message"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-brand-primary text-brand-secondary px-6 py-3 rounded-lg font-bold text-lg hover:bg-red-800 hover:text-brand-secondary border-2 border-brand-primary transition duration-300"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 