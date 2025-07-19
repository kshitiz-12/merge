import React from "react";

const About = () => (
  <section className="py-16 bg-brand-bg min-h-[60vh]">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-brand-primary mb-8">
        About Show<span className="font-devanagari">सेवा</span>
      </h1>
      <p className="text-lg text-brand-text mb-6">
        Show<span className="font-devanagari">सेवा</span> is Nepal’s premier platform for discovering and booking events, movies, and shows. Founded by a group of passionate young visionaries, our mission is to make entertainment accessible and booking seamless for everyone. Whether you’re looking for the latest blockbuster, a soulful concert, or a local cultural event, we bring the experience to your fingertips.
      </p>
      <h2 className="text-2xl font-semibold text-brand-secondary mb-4">Our Team</h2>
      <ul className="list-disc pl-6 text-brand-text">
        <li>Passionate event lovers and tech enthusiasts</li>
        <li>Committed to making your experience unforgettable</li>
        <li>Driven by innovation and a love for entertainment</li>
      </ul>
    </div>
  </section>
);

export default About; 