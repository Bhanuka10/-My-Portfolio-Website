import React from 'react'
import './Profile.css'

const Profile = () => {
  return (
    <div className='profile'>
        <div className="profile-stage">
            
                
                <div className="profile-pic-container">
                    <img className="profile-pic" src="src/assets/istockphoto-625389694-612x612-removebg-preview.png" alt="" />
                </div>
            
        </div>
        <div className="profile-content">
            <h1>Hi There</h1>
            <h2>I am <span>John Doe</span></h2>
            <h3>Frontend Developer</h3>
            <p>Creating amazing digital experiences with modern technology and creative design solutions.</p>
            <button className='btn'>Download CV</button>
        </div>
    </div>
  )
}

export default Profile