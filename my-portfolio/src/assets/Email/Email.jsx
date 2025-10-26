import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { FiMail, FiUser, FiMessageSquare, FiSend, FiCheck, FiAlertCircle, FiPhone, FiMapPin } from 'react-icons/fi';
import './Email.css';

const Email = () => {
  const form = useRef();
  const sectionRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  // Setup intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            entry.target.classList.add('email-animate');
            setIsAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef && !isAnimated) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isAnimated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldName = name === 'name1' ? 'firstName' : 
                     name === 'name2' ? 'lastName' : 
                     name === 'email' ? 'email' : 
                     name === 'message' ? 'message' : name;
    
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    emailjs
      .sendForm('service_a3i0xx9', 'template_jxwslrk', form.current, {
        publicKey: '9fN_lMMZSKDsisrJb',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setStatus('success');
          setFormData({ firstName: '', lastName: '', email: '', message: '' });
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
          setStatus('error');
        },
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="email-contact-section email-section-animate" ref={sectionRef}>
      <div className="email-container">
        <div className="email-contact-header">
          <h2 className="email-contact-title-main">Get In Touch</h2>
          
        </div>

        <div className="email-contact-content">
          {/* Email Contact Form */}
          <div className="email-form-container">
            <form ref={form} onSubmit={sendEmail} className="email-contact-form">
              <div className="form-row">
                <div className="input-group">
                  <label className="input-label">
                    <FiUser className="label-icon" />
                    First Name
                  </label>
                  <input
                    type="text"
                    name="name1"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Your first name"
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label className="input-label">
                    <FiUser className="label-icon" />
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="name2"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Your last name"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">
                  <FiMail className="label-icon" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">
                  <FiMessageSquare className="label-icon" />
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Looking forward to collaborating with you! "
                  rows="5"
                  required
                />
              </div>

              <button
                type="submit"
                className={`submit-button ${
                  isLoading ? 'loading' : ''
                } ${
                  status === 'success' ? 'success' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <FiCheck className="button-icon" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <FiSend className="button-icon" />
                    Send Message
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="status-message success-message">
                  <FiCheck className="status-icon" />
                  Thank you! Your message has been sent successfully. I'll get back to you soon!
                </div>
              )}

              {status === 'error' && (
                <div className="status-message error-message">
                  <FiAlertCircle className="status-icon" />
                  Oops! Something went wrong. Please try again or email me directly.
                </div>
              )}
            </form>
          </div>

          {/* c */}
          <div className="email-contact-info-section">
            <div className="contact-info-divider">
              <div className="info-divider-line"></div>
              <div className="info-divider-text">Reach Me Directly</div>
              <div className="info-divider-line"></div>
            </div>
            
            <div className="contact-info-grid">
              <div className="contact-info-card email-card">
                <div className="card-background-glow"></div>
                <div className="info-card-content">
                  <div className="info-icon-container">
                    <div className="info-icon-wrapper">
                      <FiMail className="info-icon" />
                    </div>
                    <div className="icon-ripple"></div>
                  </div>
                  <div className="info-details">
                    <h3 className="info-title">Email Address</h3>
                    <a href="mailto:sahanbhanuka10@gmail.com" className="info-link">
                      sahanbhanuka10@gmail.com
                    </a>
                    <p className="info-description">Available 24/7 for inquiries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Email;