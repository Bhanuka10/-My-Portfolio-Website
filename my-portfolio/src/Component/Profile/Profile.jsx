import React from 'react'
import './Profile.css'

const Profile = () => {
  return (
    <div className='profile'>
        <div className="profile-stage">
            
                
                <div className="profile-pic-container">
                    <img className="profile-pic" src="src/assets/WhatsApp_Image_2025-04-04_at_09.30.12_89ba444b-removebg-preview.png" alt="" />
                </div>
            
        </div>
        <div className="profile-content">
            <h1>Hi There</h1>
            <h2>I am <span>Bhanuka Bandaranayake</span></h2>
            <h3>Fullstack Developer</h3>
            <p>Passionate Front-End Developer and back-End Developer| Aspiring ML & AI Enthusiast | Diploma in English |Undergraduate in Computing and Information Systems</p>
            <button className='btn'>Download CV</button>
        </div>
    </div>
  )
}

export default Profile