import React, { useState } from 'react';
import './Navbar.css';
import pixplaylogo from '../images/plogo.png';
import { Link } from 'react-router-dom'; // Use Link if you're using React Router

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleToggle = () => {
    setClick(!click);
  };

  const handleClose = () => {
    setClick(false); // Always close the menu when a link is clicked
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className='header'>
      <a href='/'>
        <div className='logoImage'>
          <img src={pixplaylogo} alt='PixPlay Logo' />
        </div>
      </a>

      <div
        id='menu-btn'
        onClick={handleToggle}
        className={click ? 'fas fa-times' : 'fas fa-bars'}
      ></div>

      <nav className={click ? 'navbar active' : 'navbar'}>
        <a
          href='/#home' // Use #home if you have a home section
          onClick={() => {
            handleClose();
            scrollToSection('home'); // Ensure this works with your routing setup
          }}
        >
          Home
        </a>
        <a
          href='/#service' // Use #service to match the id of the section
          onClick={() => {
            handleClose();
            scrollToSection('service'); // Scroll to the service section
          }}
        >
          Services
        </a>
        <a
          href='/#steps' // Use #contact if you have a contact section
          onClick={() => {
            handleClose();
            scrollToSection('steps'); // Ensure this works with your routing setup
          }}
        >
          Steps
        </a>

        <a
          href='/#contact' // Use #contact if you have a contact section
          onClick={() => {
            handleClose();
            scrollToSection('contact'); // Ensure this works with your routing setup
          }}
        >
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Navbar;