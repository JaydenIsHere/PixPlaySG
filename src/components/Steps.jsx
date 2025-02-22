import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import "./Steps.css";
const StepsSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      title: 'Initial Consultation',
      content: 'Discuss your goals and needs in a free introductory session.'
    },
    {
      title: 'Tailored Strategy Development',
      content: 'Create customized plans based on your unique requirements.'
    },
    {
      title: 'Implementation and Monitoring',
      content: 'Execute strategies with continuous performance tracking.'
    },
    {
      title: 'Results Analysis and Reporting',
      content: 'Deliver comprehensive insights and optimization recommendations.'
    }
  ];

  const { ref: sectionRef } = useInView({
    threshold: 0.5
  });

  return (
    <section className="steps-section" ref={sectionRef} id="steps">
      {/* Left Side - Steps Cards */}
      <div className="steps-cards-container">
        {steps.map((step, index) => {
          const [cardRef, cardInView] = useInView({
            threshold: 0.5,
            triggerOnce: true
          });

          useEffect(() => {
            if (cardInView) {
              setActiveStep(index);
            }
          }, [cardInView, index]);

          return (
            <div
              key={index}
              ref={cardRef}
              className={`step-card ${index === activeStep ? 'active' : ''}`}
            >
              <span className="step-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.content}</p>
            </div>
          );
        })}
      </div>

      {/* Right Side - Title & Description */}
      <div className="steps-content">
        <div className="content-wrapper">
          <h2>Discover the Power of Our Service</h2>
          <p className="description">
            Our proven process ensures maximum results through careful planning and execution. 
            Scroll to explore our methodology.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;