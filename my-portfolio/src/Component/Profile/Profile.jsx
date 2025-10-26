import React from 'react'
import './Profile.css'
import './KeywordPositions.css'
import TypedText from '../TypedText/TypedText'
import SpaceAnimation from './SpaceAnimation'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { getImagePath, fullBodyImage } from '../../utils/imagePaths'

const Profile = () => {
  const roles = [
    "Front-End Developer",
    "Fullstack Developer",
    "Aspiring ML & AI Enthusiast",
    "AI-Powered Web Developer",
    "Lifelong Learner",
    "Data Science Enthusiast"
  ];

  return (
    <div className='profile'>
        <SpaceAnimation />
        <div className="location-info">
          <FaMapMarkerAlt className="location-icon" />
          <span className="location-text">Kandy, Sri Lanka</span>
        </div>
        <div className="profile-stage">
            {/* Tech keywords floating around */}
            <span className="tech-keyword keyword-top-left" style={{
                background: 'rgba(15, 23, 42, 0.7)', 
                padding: '8px 16px', 
                borderRadius: '10px', 
                backdropFilter: 'blur(10px)', 
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)', 
                border: '1px solid rgba(66, 153, 225, 0.2)', 
                fontSize: '0.8rem', 
                fontWeight: '600', 
                letterSpacing: '0.5px', 
                color: '#fff', 
                textTransform: 'uppercase', 
                animation: 'float 8s infinite ease-in-out'
            }}>
                Model Training
            </span>
            <span className="tech-keyword keyword-top-right" style={{
                background: 'rgba(15, 23, 42, 0.7)', 
                padding: '8px 16px', 
                borderRadius: '10px', 
                backdropFilter: 'blur(10px)', 
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)', 
                border: '1px solid rgba(139, 92, 246, 0.3)', 
                fontSize: '0.8rem', 
                fontWeight: '600', 
                letterSpacing: '0.5px', 
                color: '#fff', 
                textTransform: 'uppercase', 
                animation: 'float 8s infinite ease-in-out 2s'
            }}>
                Generative AI
            </span>
            <span className="tech-keyword keyword-bottom-left" style={{
                background: 'rgba(15, 23, 42, 0.7)', 
                padding: '8px 16px', 
                borderRadius: '10px', 
                backdropFilter: 'blur(10px)', 
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)', 
                border: '1px solid rgba(16, 185, 129, 0.3)', 
                fontSize: '0.8rem', 
                fontWeight: '600', 
                letterSpacing: '0.5px', 
                color: '#fff', 
                textTransform: 'uppercase', 
                animation: 'float 8s infinite ease-in-out 4s'
            }}>
                AI-Integrated Web Development
            </span>
            <span className="tech-keyword keyword-bottom-right" style={{
                background: 'rgba(15, 23, 42, 0.7)', 
                padding: '8px 16px', 
                borderRadius: '10px', 
                backdropFilter: 'blur(10px)', 
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)', 
                border: '1px solid rgba(239, 68, 68, 0.3)', 
                fontSize: '0.8rem', 
                fontWeight: '600', 
                letterSpacing: '0.5px', 
                color: '#fff', 
                textTransform: 'uppercase', 
                animation: 'float 8s infinite ease-in-out 6s'
            }}>
                Deep Learning
            </span>
            
            {/* Profile pic container */}
            <div className='profile-pic-container'>
                {/* Removed the old background image */}
                <img className="profile-picture" src={getImagePath(fullBodyImage)} alt="Profile" />
            </div>
        </div>
        <div className="profile-content">
            <h1>Hi There</h1>
            <h2>It's Me <span>Bhanuka Bandaranayake</span></h2>
            <h3>I'm a <span><TypedText textArray={roles} typingSpeed={80} deletingSpeed={40} delayBetweenTexts={1500} /></span></h3>
            <p>"I'm an undergraduate computing student passionate about developing scalable, AI-powered web applications using the MEAN stack and Laravel, with a strong focus on machine learning, model training, and data-driven innovation."</p>
            <button className='btn'>Download CV</button>
        </div>
    </div>
  )
}

export default Profile
