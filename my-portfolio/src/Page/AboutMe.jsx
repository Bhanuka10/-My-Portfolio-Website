import React, { useEffect, useRef, useState } from 'react'
import About from '../Component/About/About'
import Chatbot from '../Component/Chatbot/Chatbot'
import './AboutMe.css'

const AboutMe = () => {
  const aboutMeRef = useRef(null);
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

    const currentRef = aboutMeRef.current;
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
    <div className='about-me' ref={aboutMeRef}>
      <About />
      <Chatbot />
    </div>
  )
}

export default AboutMe