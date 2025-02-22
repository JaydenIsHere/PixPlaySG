import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaShoppingBag } from 'react-icons/fa';
import './Contact.css';
const ContactSection = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-content">
        <h2>Let's Grow Your Brand Together</h2>
        
        {/* Social Links */}
        <div className="social-links">
          <a href="https://www.facebook.com/profile.php?id=61564479421803#" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" />
          </a>
          <a href="https://www.instagram.com/pixplaysg/?fbclid=IwZXh0bgNhZW0CMTEAAR0ZOL1YH9w-JoF5p-x6WVEmhOv7uVm2efxKaqq1zoWZC2TG5Du_OGRxb1Q_aem_QTUtCnGR1ZD_2I0gKwUJ7g" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
          <a href="https://www.tiktok.com/@pixplaysg?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">
            <FaTiktok className="social-icon" />
          </a>
          <a href="https://www.xiaohongshu.com/user/profile/66d164e5000000001d033384?xsec_token=YBJIxiO4eJHdmM-1RKcyE7rT4dAVwbFvfrvS8Rd_RFDCQ=&xsec_source=app_share&xhsshare=CopyLink&appuid=66d164e5000000001d033384&apptime=1737210979&share_id=d12e35bf04f944cc8caa8ced7baa493e" target="_blank" rel="noopener noreferrer">
            <FaShoppingBag className="social-icon" />
          </a>
        </div>

        {/* Company Email */}
        <div className="email-container">
          <p className="email-text">Get in touch directly:</p>
          <a href="mailto:hello@pixplaysg.com" className="email-link">
            hello@pixplaysg.com
          </a>
        </div>

        {/* CTA Button */}
        <button 
          className="cta-button"
          onClick={() => window.location.href = 'http://wa.me/+6593602418'}
        >
          Claim Your Free 30-Min Consultation
        </button>
      </div>
    </section>
  );
};

export default ContactSection;