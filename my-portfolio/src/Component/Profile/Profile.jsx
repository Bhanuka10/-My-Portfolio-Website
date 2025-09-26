import React from 'react'
import './Profile.css'
import TypedText from '../TypedText/TypedText'
import SpaceAnimation from './SpaceAnimation'
import { FaMapMarkerAlt } from 'react-icons/fa'

const Profile = () => {
  const roles = [
    "Fullstack Developer",
    "Aspiring ML & AI Enthusiast",
    "Lifelong Learner"
  ];

  return (
    <div className='profile'>
        <SpaceAnimation />
        <div className="location-info">
          <FaMapMarkerAlt className="location-icon" />
          <span className="location-text">Kandy, Sri Lanka</span>
        </div>
        <div className="profile-stage">
            {/* <div className="profile-pic-container">
                <img className="profile-pic" src="src/assets/WhatsApp_Image_2025-04-04_at_09.30.12_89ba444b-removebg-preview.png" alt="" />
            </div> */}
            <div className='profile-pic-container'>
                {/* Removed the old background image */}
                <img className="profile-pictu" src="src/assets/istockphoto-625389694-612x612-removebg-preview.png" alt="Profile" />
            </div>
        </div>
        <div className="profile-content">
            <h1>Hi There</h1>
            <h2>It's Me <span>Bhanuka Bandaranayake</span></h2>
            <h3>I'm a <span><TypedText textArray={roles} typingSpeed={80} deletingSpeed={40} delayBetweenTexts={1500} /></span></h3>
            <p>"I'm an undergraduate computing student passionate about building scalable web apps and AI-powered solutions."</p>
            <button className='btn'>Download CV</button>
        </div>
    </div>
  )
}

export default Profile
