import React from 'react';

import './Testimonial.css';
const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      industry: "E-commerce",
      text: "Their data-driven approach helped us triple our conversion rates in just 3 months. Truly transformative!"
    },
    {
      name: "Michael Chen",
      industry: "SaaS Startup",
      text: "The content strategies developed for us became our strongest growth engine. Exceptional results!"
    },
    {
      name: "Emma Wilson",
      industry: "Consulting",
      text: "Our brand visibility increased by 400% after implementing their recommendations. Worth every penny!"
    },
  ];

  return (
    <section className="testimonial-section">
      <div className="testimonial-header">
        <h2 style={{ color: "#D6193D" }}>Testimonials</h2>
        <p className="section-description">
          Hear from businesses that transformed their growth through our services
        </p>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="client-info">
              <h3 className="client-name">{testimonial.name}</h3>
              <p className="client-industry">{testimonial.industry}</p>
            </div>
            <p className="testimonial-text">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;