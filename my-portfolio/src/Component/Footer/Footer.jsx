import React from 'react'
import './Footer.css'
import { FaWhatsapp, FaLinkedinIn, FaGithub, FaFacebookF, FaArrowUp } from 'react-icons/fa'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Left Section - Name and Description */}
          <div className="footer-left">
            <h3 className="footer-name">Sahan Bhanuka</h3>
            <p className="footer-description">
              AI-powered web developer creating intelligent solutions with modern technologies and machine learning integration.
            </p>
          </div>

          {/* Center Section - Social Media */}
          <div className="footer-center">
            <div className="social-links">
              <a href="https://wa.me/94778988024" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
              <a href="https://www.linkedin.com/in/bhanuka-bandaranayake-0a1968302" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
              <a href="https://github.com/Bhanuka10" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://web.facebook.com/profile.php?id=61575244409434" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
            </div>
          </div>

          {/* Right Section - Copyright and Scroll Top */}
          <div className="footer-right">
            <p className="copyright">© 2025 All Rights Reserved</p>
            <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
              <FaArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer