import React, { useState, useEffect, useRef } from "react";
import "./Skill.css";
import "./SkillDisplay.css";
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaFigma, 
  FaLaravel, FaJava, FaPython, FaNodeJs, FaDatabase, 
  FaGitAlt, FaGithub, FaCode, FaTools
} from "react-icons/fa";
import { 
  SiFlask, SiExpress, SiMysql, SiMongodb, 
  SiPostman, SiTailwindcss
} from "react-icons/si";
import { DiIntellij } from "react-icons/di";
import { VscCode } from "react-icons/vsc";

const Skill = () => {
  const [active, setActive] = useState("skills");
  const skillsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    
    return () => {
      if (skillsRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Frontend skills with proficiency percentages
  const frontendSkills = [
    { name: "HTML", icon: <FaHtml5 />, proficiency: 80 },
    { name: "CSS", icon: <FaCss3Alt />, proficiency: 80 },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, proficiency: 75 },
    { name: "JavaScript", icon: <FaJs />, proficiency: 60 },
    { name: "React", icon: <FaReact />, proficiency: 75 },
    { name: "Bootstrap", icon: <FaBootstrap />, proficiency: 70 },
    { name: "Figma", icon: <FaFigma />, proficiency: 75 },
    { name: "Blade", icon: <FaCode />, proficiency: 70 },
  ];

  // Backend skills with proficiency percentages
  const backendSkills = [
    { name: "Java", icon: <FaJava />, proficiency: 75 },
    { name: "C", icon: <FaCode />, proficiency: 65 },
    { name: "Python", icon: <FaPython />, proficiency: 75 },
    { name: "Flask", icon: <SiFlask />, proficiency: 70 },
    { name: "Node.js", icon: <FaNodeJs />, proficiency: 70 },
    { name: "Express", icon: <SiExpress />, proficiency: 60 },
    { name: "Laravel", icon: <FaLaravel />, proficiency: 85 },
  ];

  // Database skills with proficiency percentages
  const databaseSkills = [
    { name: "MySQL", icon: <SiMysql />, proficiency: 85 },
    { name: "MongoDB", icon: <SiMongodb />, proficiency: 75 },
  ];

  // Version control skills with proficiency percentages
  const versionControlSkills = [
    { name: "Git", icon: <FaGitAlt />, proficiency: 75 },
    { name: "GitHub", icon: <FaGithub />, proficiency: 80 },
  ];

  // Tools & IDEs with proficiency percentages
  const toolsSkills = [
    { name: "Postman", icon: <SiPostman />, proficiency: 70 },
    { name: "VS Code", icon: <VscCode />, proficiency: 90 },
    { name: "IntelliJ IDEA", icon: <DiIntellij />, proficiency: 70 },
  ];

  const topics = {
    education: (
      <div className="education-roadmap">
        <div className="roadmap-item completed">
          <div className="roadmap-content">
            <h3>Dharmaraja College Kandy</h3>
            <p className="years">(2012-2021)</p>
            <p>Mathematics Stream for Advanced Level</p>
            <span className="status">Completed</span>
          </div>
        </div>
        
        <div className="roadmap-item completed">
          <div className="roadmap-content">
            <h3>SIBA Campus</h3>
            <p className="years">(2022-2023)</p>
            <p>Diploma in English</p>
            <span className="status">Completed</span>
          </div>
        </div>
        
        <div className="roadmap-item current">
          <div className="roadmap-content">
            <h3>Sabaragamuwa University</h3>
            <p className="years">(2023-Present)</p>
            <p>BSc in Computing and Information Systems</p>
            <span className="status">In Progress</span>
          </div>
        </div>
      </div>
    ),
    skills: (
      <div className="skills-container" ref={skillsRef}>
        <div className="skills-header">
          <h2>My Technical Skills</h2>
          
        </div>
        
        <div className={`skills-categories ${isVisible ? 'visible' : ''}`}>
          {/* Frontend Category */}
          <div className="skill-category">
            <div className="category-header">
              <FaCode className="category-icon" />
              <h3 className="category-title">Frontend</h3>
            </div>
            <div className="skill-list">
              {frontendSkills.map((skill, index) => (
                <div className="skill-item" key={`frontend-${index}`}>
                  <div className="skill-info">
                    <div className="skill-name">
                      {skill.icon && <span className="skill-icon">{skill.icon}</span>}
                      {skill.name}
                    </div>
                    <div className="skill-bar">
                      <div className="skill-level" style={{ '--skill-width': `${skill.proficiency}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Backend Category */}
          <div className="skill-category">
            <div className="category-header">
              <FaTools className="category-icon" />
              <h3 className="category-title">Backend</h3>
            </div>
            <div className="skill-list">
              {backendSkills.map((skill, index) => (
                <div className="skill-item" key={`backend-${index}`}>
                  <div className="skill-info">
                    <div className="skill-name">
                      {skill.icon && <span className="skill-icon">{skill.icon}</span>}
                      {skill.name}
                    </div>
                    <div className="skill-bar">
                      <div className="skill-level" style={{ '--skill-width': `${skill.proficiency}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Database Category */}
          <div className="skill-category">
            <div className="category-header">
              <FaDatabase className="category-icon" />
              <h3 className="category-title">Database</h3>
            </div>
            <div className="skill-list">
              {databaseSkills.map((skill, index) => (
                <div className="skill-item" key={`database-${index}`}>
                  <div className="skill-info">
                    <div className="skill-name">
                      {skill.icon && <span className="skill-icon">{skill.icon}</span>}
                      {skill.name}
                    </div>
                    <div className="skill-bar">
                      <div className="skill-level" style={{ '--skill-width': `${skill.proficiency}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Version Control Category */}
          <div className="skill-category">
            <div className="category-header">
              <FaGitAlt className="category-icon" />
              <h3 className="category-title">Version Control</h3>
            </div>
            <div className="skill-list">
              {versionControlSkills.map((skill, index) => (
                <div className="skill-item" key={`version-${index}`}>
                  <div className="skill-info">
                    <div className="skill-name">
                      {skill.icon && <span className="skill-icon">{skill.icon}</span>}
                      {skill.name}
                    </div>
                    <div className="skill-bar">
                      <div className="skill-level" style={{ '--skill-width': `${skill.proficiency}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tools & IDEs Category */}
          <div className="skill-category">
            <div className="category-header">
              <FaTools className="category-icon" />
              <h3 className="category-title">Tools & IDEs</h3>
            </div>
            <div className="skill-list">
              {toolsSkills.map((skill, index) => (
                <div className="skill-item" key={`tools-${index}`}>
                  <div className="skill-info">
                    <div className="skill-name">
                      {skill.icon && <span className="skill-icon">{skill.icon}</span>}
                      {skill.name}
                    </div>
                    <div className="skill-bar">
                      <div className="skill-level" style={{ '--skill-width': `${skill.proficiency}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    passion: (
      <div className="passion-container">
        <h3>My Passion</h3>
        <p className="passion-text">
          I am passionate about creating elegant solutions to complex problems. My goal is to build
          applications that are not only functional but also provide an exceptional user experience.
          I thrive in collaborative environments where I can learn from others and contribute my
          expertise to develop innovative products.
        </p>
        <p className="passion-focus">
          <strong>Areas of Focus:</strong>
        </p>
        <ul className="passion-list">
          <li>Full-Stack Web Development</li>
          <li>Responsive and Interactive User Interfaces</li>
          <li>AI-Powered Applications</li>
          <li>Database Design and Optimization</li>
          <li>Clean Code and Best Practices</li>
        </ul>
      </div>
    )
  };

  return (
    <div className="skill-section">
      {/* Horizontal Topic Navigation */}
      <div className="topics-nav">
        {Object.keys(topics).map((topic) => (
          <div
            key={topic}
            className={`topic-item ${active === topic ? "active" : ""}`}
            onClick={() => setActive(topic)}
          >
            <span className="topic-dot" />
            <span className="topic-label">{topic.charAt(0).toUpperCase() + topic.slice(1)}</span>
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="details-box">
        {active !== "skills" && <h2>{active.charAt(0).toUpperCase() + active.slice(1)}</h2>}
        {topics[active]}
      </div>
    </div>
  );
};

export default Skill;
