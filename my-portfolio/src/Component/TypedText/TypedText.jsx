import React, { useState, useEffect } from 'react';
import './TypedText.css';

const TypedText = ({ textArray, typingSpeed = 100, deletingSpeed = 50, delayBetweenTexts = 1000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    if (!textArray || textArray.length === 0) return;

    const currentText = textArray[currentIndex];
    
    // Handle typing and deleting animation
    if (!isDeleting && displayText === currentText) {
      // Wait before starting to delete
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetweenTexts);
    } else if (isDeleting && displayText === '') {
      // Move to next text after deletion is complete
      setIsDeleting(false);
      setCurrentIndex((currentIndex + 1) % textArray.length);
    } else {
      // Handle typing or deleting characters
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      
      timeout = setTimeout(() => {
        if (isDeleting) {
          setDisplayText(currentText.substring(0, displayText.length - 1));
        } else {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        }
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [textArray, currentIndex, displayText, isDeleting, typingSpeed, deletingSpeed, delayBetweenTexts]);

  return (
    <span className="typed-text">
      {displayText}
      <span className="cursor"></span>
    </span>
  );
};

export default TypedText;