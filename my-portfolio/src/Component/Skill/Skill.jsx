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
  const [active, setActive] = useState("passion");
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
        

        <div className="passion-body">
          <div className="passion-story">
            <h3 className="section-title">My Journey</h3>
            <p className="story-text">
              I am deeply passionate about creating elegant solutions to complex problems. 
              My journey in technology began with curiosity and has evolved into a mission to build 
              applications that not only function flawlessly but also provide exceptional user experiences. 
              I believe that great software is born from the intersection of technical excellence and human empathy.
            </p>
          </div>

          <div className="passion-values">
            <h3 className="section-title">Core Values</h3>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon"></div>
                <h4>Innovation</h4>
                <p>Constantly exploring new technologies and approaches to solve modern challenges.</p>
              </div>
              <div className="value-card">
                <div className="value-icon"></div>
                <h4>Excellence</h4>
                <p>Committed to writing clean, maintainable code and delivering high-quality solutions.</p>
              </div>
              <div className="value-card">
                <div className="value-icon"></div>
                <h4>Collaboration</h4>
                <p>Thriving in team environments where knowledge sharing drives collective growth.</p>
              </div>
              <div className="value-card">
                <div className="value-icon"></div>
                <h4>Learning</h4>
                <p>Embracing continuous learning as the foundation of professional development.</p>
              </div>
            </div>
          </div>

          <div className="passion-focus">
            <h3 className="section-title">Areas of Expertise & Interest</h3>
            <div className="focus-areas">
              <div className="focus-category">
                <h4 className="category-name">
                  <span className="category-icon">🌐</span>
                  Web Development
                </h4>
                <ul className="focus-list">
                  <li>Full-Stack Application Development</li>
                  <li>Responsive & Progressive Web Apps</li>
                  <li>Modern Frontend Frameworks (React, Vue)</li>
                  <li>RESTful API Design & Implementation</li>
                </ul>
              </div>
              
              <div className="focus-category">
                <h4 className="category-name">
                  <span className="category-icon">🤖</span>
                  Emerging Technologies
                </h4>
                <ul className="focus-list">
                  <li>AI-Powered Applications</li>
                  <li>Machine Learning Integration</li>
                  <li>Cloud Computing & DevOps</li>
                  <li>Internet of Things (IoT) Solutions</li>
                </ul>
              </div>
              
              <div className="focus-category">
                <h4 className="category-name">
                  <span className="category-icon">🎨</span>
                  Design & UX
                </h4>
                <ul className="focus-list">
                  <li>User Interface Design</li>
                  <li>User Experience Optimization</li>
                  <li>Design Systems & Components</li>
                  <li>Accessibility & Inclusive Design</li>
                </ul>
              </div>
              
              <div className="focus-category">
                <h4 className="category-name">
                  <span className="category-icon">⚡</span>
                  Performance & Quality
                </h4>
                <ul className="focus-list">
                  <li>Database Design & Optimization</li>
                  <li>Application Performance Tuning</li>
                  <li>Test-Driven Development</li>
                  <li>Clean Code & Best Practices</li>
                </ul>
              </div>
            </div>
          </div>

          
        </div>
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
