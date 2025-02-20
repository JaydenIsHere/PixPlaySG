import React, { useState, useEffect } from "react";
import feature1 from "../images/feature1.jpeg";
import feature2 from "../images/feature2.jpeg";
import feature3 from "../images/feature3.jpeg";
import feature4 from "../images/feature4.jpeg";
import feature5 from "../images/feature5.jpeg";

import "./service-overview.css";

const FeaturesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [feature1, feature2, feature3, feature4, feature5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="feature-section" id="service">
      {/* Left Side: Text */}
      <div className="feature-text-content">
        <h2>Service Overview</h2>
        <div className="feature-list">
          <h3>IP Mentorship Services</h3>
          <p>We specialize in Identity and Positioning for both individuals and businesses, helping them stand out in competitive markets.</p>
          
          <h3>Content Creation & Strategy</h3>
          <p>Social media content planning and production (graphics, videos, live streams, etc.). Ad content optimization and placement.</p>
          
          <h3>Data Analysis & Optimization</h3>
          <p>Channel data analysis (e.g., YouTube, Instagram, TikTok, Facebook). Ad performance tracking and optimization.</p>
          
          <h3>Outsourced Production Team</h3>
          <p>Comprehensive content production services (e.g., filming, editing, design, copywriting).</p>
        </div>
        <button className="feature-cta-button">Learn More</button>
      </div>

      {/* Right Side: Carousel */}
      <div className="feature-carousel">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={index === currentSlide ? "feature-carousel-image active" : "feature-carousel-image"}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
