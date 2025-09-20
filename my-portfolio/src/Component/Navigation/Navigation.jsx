import React, { useState, useEffect } from 'react'
import './Navigation.css'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (linkName, e) => {
    e.preventDefault();
    setActiveLink(linkName);
    
    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    e.currentTarget.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);

    // Smooth scroll to section
    const targetElement = document.querySelector(`#${linkName}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    
    // Create button ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.className = 'button-ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    e.currentTarget.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 800);

    // Add success feedback
    e.currentTarget.classList.add('clicked');
    setTimeout(() => {
      e.currentTarget.classList.remove('clicked');
    }, 300);
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">
            <span className="logo-icon">⚡</span>
            <span className="logo-name">Portfolio</span>
          </span>
        </div>
        
        <div className="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <a 
                href="#home" 
                className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
                onClick={(e) => handleLinkClick('home', e)}
              >
                <span className="link-text">Home</span>
                <span className="link-dot"></span>
                <span className="link-bg"></span>
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#about" 
                className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
                onClick={(e) => handleLinkClick('about', e)}
              >
                <span className="link-text">About</span>
                <span className="link-dot"></span>
                <span className="link-bg"></span>
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#projects" 
                className={`nav-link ${activeLink === 'projects' ? 'active' : ''}`}
                onClick={(e) => handleLinkClick('projects', e)}
              >
                <span className="link-text">Projects</span>
                <span className="link-dot"></span>
                <span className="link-bg"></span>
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#contact" 
                className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`}
                onClick={(e) => handleLinkClick('contact', e)}
              >
                <span className="link-text">Contact</span>
                <span className="link-dot"></span>
                <span className="link-bg"></span>
              </a>
            </li>
          </ul>
        </div>
        
        <div className="nav-cta">
          <button className="hire-btn" onClick={handleButtonClick}>
            <span className="btn-gradient"></span>
            <span className="btn-text">Let's Work</span>
            <span className="btn-shine"></span>
            <span className="btn-particles">
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation