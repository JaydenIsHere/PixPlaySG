import React from 'react';
import './CallToAction.css'; // Make sure to create this CSS file

const CallToAction = () => {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Book a Consultation</h2>
        <p>
          Schedule a free 30-minute consultation with our experts to discuss your needs 
          and explore customized solutions for your brand growth.
        </p>
      </div>
      <div className="cta-button-container">
        <a href='http://wa.me/+6593602418'>
        <button className="cta-button">
          Book Now and Start Your Brand Growth Journey
        </button>
        </a>
        
      </div>
    </section>
  );
};

export default CallToAction;
