import React from 'react'
import './About.css'

const About = () => {
  return (
    <section className="about">
      <h1 className="about-title">About Me</h1>
      <div className="about-boxes">
        
        <div className="about-box">
          <h2>👨‍💻 Who I Am</h2>
          <p>
            Hi, I’m <span className="highlight">Bhanuka</span>, an aspiring 
            <span className="highlight"> ML & AI Enthusiast</span> and 
            <span className="highlight"> Fullstack Developer</span>. 
            I’m passionate about blending creativity and technology to 
            build intelligent, user-friendly digital experiences.My goal is to become an expert in <span className="highlight">AI & ML</span>, 
            continuously grow as a <span className="highlight">fullstack developer</span>, 
            and contribute to projects that make a real difference. 
          </p>
        </div>

        <div className="about-box">
          <h2>⚡ What I Do</h2>
          <p>
            I specialize in <span className="highlight">React.js</span>, 
            <span className="highlight"> Node.js</span>, and 
            <span className="highlight"> Laravel</span> for scalable web apps, 
            while exploring <span className="highlight">Deep Learning</span> 
            and <span className="highlight">AI-powered solutions</span>. 
            My focus is on creating impactful applications that combine 
            modern web development with AI innovation.
          </p>
        </div>

        
      </div>
    </section>
  )
}

export default About
