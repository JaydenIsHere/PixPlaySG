import React, { useState } from 'react';
import './Navbar.css';
import pixplaylogo from '../images/pixplaylogo-landscape.png';
import { Link } from 'react-router-dom';

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
      <Link to='/'>
        <div className='logoImage'>
          <img src={pixplaylogo} alt='PixPlay Logo' />
        </div>
      </Link>

      <div
        id='menu-btn'
        onClick={handleToggle}
        className={click ? 'fas fa-times' : 'fas fa-bars'}
      ></div>

      <nav className={click ? 'navbar active' : 'navbar'}>
        <Link
          to='/'
          onClick={() => {
            handleClose();
            scrollToSection('home'); // Ensure this works with your routing setup
          }}
        >
          Home
        </Link>
        {/* Add more links as needed */}
        <Link to='/about' onClick={handleClose}>
          About
        </Link>
        <Link to='/contact' onClick={handleClose}>
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;