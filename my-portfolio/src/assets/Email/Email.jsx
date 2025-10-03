import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Email.css';

const Email = () => {
    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_6ki5pu7', 'template_sj3v7qe', form.current, {
        publicKey: '9fN_lMMZSKDsisrJb',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>first Name</label>
      <input type="text" name="From_name1" />
      <label>Last Name</label>
      <input type="text" name="From_name2" />
      <label>Email</label>
      <input type="email" name="From_email" />
      
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  )
}

export default Email