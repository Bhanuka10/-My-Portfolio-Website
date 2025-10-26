import React, { useEffect, useRef, useState } from 'react'
import './Contact.css'
import { FaWhatsapp, FaLinkedinIn, FaGithub, FaFacebookF, FaEnvelope, FaMapMarkerAlt, FaPhone, FaUser } from 'react-icons/fa'
import { getImagePath, profileImage } from '../../utils/imagePaths'

const Contact = () => {
  const contactRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Add animation class only once when component comes into view
            entry.target.classList.add('in-view');
            entry.target.classList.add('animate-on-scroll');
            setHasAnimated(true);
            
            // Stop observing after animation is triggered
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the component is visible
        rootMargin: '-100px 0px -100px 0px' // More precise triggering
      }
    );

    const currentRef = contactRef.current;
    if (currentRef && !hasAnimated) {
      observer.observe(currentRef);
    }

    // Cleanup
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  return (
    <div className='contact' id='contact' ref={contactRef}>
      <div className="contact-container">
        <div className="contact-header">
          
          <div className="header-underline"></div>
        </div>

        <div className="contact-content">
          <div className="contact-left">
            <div className="contact-image">
              <img src={getImagePath(profileImage)} alt="Profile" />
            </div>
            
            <div className='social-icons'>
              <a href="https://wa.me/94778988024" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
                <FaWhatsapp />
              </a>
              <a href="https://www.linkedin.com/in/bhanuka-bandaranayake-0a1968302" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                <FaLinkedinIn />
              </a>
              <a href="https://github.com/Bhanuka10" target="_blank" rel="noopener noreferrer" className="social-icon github">
                <FaGithub />
              </a>
              <a href="https://web.facebook.com/profile.php?id=61575244409434" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                <FaFacebookF />
              </a>
            </div>
            <div className='icons'>
                
            </div>
          </div>
      
          <div className="contact-info">
            <div className="contact-info-header">
              <h2>Contact Information</h2>
              <div className="info-underline"></div>
            </div>
            
            <div className="contact-items-container">
              <div className="contact-item">
                <div className="contact-icon">
                  <FaUser />
                </div>
                <div className="contact-text">
                  <h3>Full Name</h3>
                  <p>Sahan Bhanuka Bandaranayake</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div className="contact-text">
                  <h3>Phone Number</h3>
                  <p>+94 77 898 8024</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-text">
                  <h3>Email</h3>
                  <p>sahanbhanuka10@gmail.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact-text">
                  <h3>Address</h3>
                  <p>71/123 Hewahata Road, Thalwaththa, Kandy, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact