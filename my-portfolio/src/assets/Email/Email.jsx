import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FiMail, FiUser, FiMessageSquare, FiSend, FiCheck, FiAlertCircle, FiPhone, FiMapPin } from 'react-icons/fi';
import './Email.css';

const Email = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldName = name === 'From_name1' ? 'firstName' : 
                     name === 'From_name2' ? 'lastName' : 
                     name === 'From_email' ? 'email' : 
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
      .sendForm('service_6ki5pu7', 'template_sj3v7qe', form.current, {
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
    <section className="email-contact-section">
      <div className="email-container">
        <div className="contact-header">
          <h2 className="contact-title">Let's Work Together</h2>
          <p className="contact-subtitle">
            Ready to bring your ideas to life? Let's collaborate and create something amazing!
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Info Cards */}
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon email-icon">
                <FiMail />
              </div>
              <div className="info-details">
                <h4>Email Me</h4>
                <p>bhanukaperera2020@gmail.com</p>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon message-icon">
                <FiMessageSquare />
              </div>
              <div className="info-details">
                <h4>Let's Connect</h4>
                <p>Available for exciting projects</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="form-container">
            <form ref={form} onSubmit={sendEmail} className="contact-form">
              <div className="form-row">
                <div className="input-group">
                  <label className="input-label">
                    <FiUser className="label-icon" />
                    First Name
                  </label>
                  <input
                    type="text"
                    name="From_name1"
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
                    name="From_name2"
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
                  name="From_email"
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
                  placeholder="Tell me about your project or just say hello!"
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
        </div>
      </div>
    </section>
  );
};

export default Email;