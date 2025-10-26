import React, { useState, useEffect } from 'react'
import './Navigation.css'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const navMenu = document.querySelector('.nav-menu');
      const hamburger = document.querySelector('.hamburger');
      
      if (
        navMenu && 
        !navMenu.contains(event.target) && 
        !hamburger.contains(event.target) &&
        isMobileMenuOpen
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (linkName, e) => {
    e.preventDefault();
    setActiveLink(linkName);
    scrollToSection(linkName);
    
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
  };

  const scrollToSection = (linkName) => {
    let targetElement;
    
    // Map navigation links to actual component sections
    switch(linkName) {
      case 'home':
        // Scroll to Profile component (top of page)
        targetElement = document.querySelector('.profile') || document.body;
        break;
      case 'about':
        // Scroll to AboutMe component
        targetElement = document.querySelector('.about-me') || document.querySelector('.about');
        break;
      case 'projects':
        // Scroll to Projects component
        targetElement = document.querySelector('.projects-container') || document.querySelector('.projects');
        break;
      case 'skills':
        // Scroll to Skill component
        targetElement = document.querySelector('.skill-section') || document.querySelector('.skills');
        break;
      case 'contact':
        // Scroll to Contact component
        targetElement = document.querySelector('.contact') || document.querySelector('#contact');
        break;
      case 'email':
        // Scroll to Email component
        targetElement = document.querySelector('.email-contact-section') || document.querySelector('.email') || document.querySelector('#email');
        break;
      default:
        targetElement = document.querySelector(`#${linkName}`);
    }
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Add active class for special animations
      if (linkName === 'email') {
        targetElement.classList.add('active');
        setTimeout(() => {
          targetElement.classList.remove('active');
        }, 3000); // Remove after 3 seconds
      }
    }
  };

  // Simple navigation function is now directly in the button's onClick

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleMobileLinkClick = (linkName, e) => {
    handleLinkClick(linkName, e);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">
            <span className="logo-icon">⚡</span>
            <span className="logo-name">BHANUKA</span>
          </span>
        </div>
        
        <div className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <a 
                href="#home" 
                className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
                onClick={(e) => handleMobileLinkClick('home', e)}
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
                onClick={(e) => handleMobileLinkClick('about', e)}
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
                onClick={(e) => handleMobileLinkClick('projects', e)}
              >
                <span className="link-text">Projects</span>
                <span className="link-dot"></span>
                <span className="link-bg"></span>
              </a>
            </li>
             <li className="nav-item">
              <a 
                href="#skills" 
                className={`nav-link ${activeLink === 'skills' ? 'active' : ''}`}
                onClick={(e) => handleMobileLinkClick('skills', e)}
              >
                <span className="link-text">Skills</span>
                <span className="link-dot"></span>
                <span className="link-bg"></span>
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#contact" 
                className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`}
                onClick={(e) => handleMobileLinkClick('contact', e)}
              >
                <span className="link-text">Contact</span>
                <span className="link-dot"></span>
                <span className="link-bg"></span>
              </a>
            </li>
          </ul>
        </div>
        
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <div className="nav-cta">
          <button className="hire-btn" onClick={(e) => {
            e.preventDefault();
            setActiveLink('email');
            scrollToSection('email');
          }}>
            <span className="btn-text">Let's Work</span>
          </button>
        </div>
      </div>
      
      {/* Mobile Backdrop */}
      <div 
        className={`mobile-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
    </nav>
  )
}

export default Navigation