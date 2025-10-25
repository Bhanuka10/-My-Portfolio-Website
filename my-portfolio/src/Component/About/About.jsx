import React from 'react'
import './About.css'

const About = () => {
  return (
    <section className="about">
      <h1 className="about-title">About Me</h1>
      <div className="about-boxes">
        
        <div className="about-box">
          <h2>    Who I Am</h2>
          <p>
            Hi, I’m <span className="highlight">Bhanuka</span>, an aspiring 
     <span className="highlight"> AI, ML, and Data Science Enthusiast</span> and 
        <span className="highlight"> Fullstack Developer</span>. 
        I’m passionate about blending creativity with technology to 
     build intelligent, user-friendly digital experiences. My goal is to become an expert in 
      <span className="highlight"> Artificial Intelligence, Machine Learning, and Data Science</span>, 
    continuously grow as a <span className="highlight">Fullstack Developer</span>, 
     and contribute to projects that create meaningful impact.

          </p>
        </div>

        <div className="about-box">
          <h2>    What I Do</h2>
          <p>
           I specialize in <span className="highlight">React.js</span>, 
<span className="highlight"> Node.js</span>, 
and the <span className="highlight">MERN Stack</span>, along with 
<span className="highlight"> Laravel</span> for developing scalable web applications, 
while exploring <span className="highlight">Deep Learning</span>, 
<span className="highlight">AI-powered solutions</span>, and 
<span className="highlight">Data Science</span>. 
My focus is on building impactful, data-driven applications that integrate 
<span className="highlight">modern web development</span> with 
<span className="highlight">AI and analytical innovation</span>.

          </p>
        </div>

        
      </div>
    </section>
  )
}

export default About
