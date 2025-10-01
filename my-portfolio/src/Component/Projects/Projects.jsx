import React, { useState } from "react";
import "./Projects.css";
import projectsData from "../../Data/projectsData";
import { 
  FaReact, FaHtml5, FaCss3Alt, FaJs, FaPhp, FaGitAlt, FaFigma,
  FaGithub, FaExternalLinkAlt, FaDatabase, FaLaravel 
} from "react-icons/fa";
import { SiMysql, SiBlazor, SiJavascript, SiFirebase } from "react-icons/si";

// Import UisData from the same file
const UisData = [
  {
    id: 1,
    title: "Capstone Interface Design",
    description: "The UI/UX design of Skill Forge was created using Figma, focusing on delivering a clean, modern, and user-friendly experience for learners. The design process followed a user-centered approach, ensuring intuitive navigation and accessibility across devices",
    image: "src/assets/UI/Capstone/Desktop - 1.png",
    techStack: ["Figma"],
    explore_link: "https://github.com/Bhanuka10/UI-Designs"
  },
  {
    id: 2,
    title: "Wet",
    description: "I created the UI/UX design for the WET Hospital system in Figma, ensuring a clear and professional interface for both patients and administrators. The design includes pages such as the home page, apply for medicine, doctor dashboard all connected with interactive prototypes to reflect a smooth hospital workflow.",
    image: "src/assets/UI/wet/Home page.png",
    techStack: ["Figma"],
    explore_link: "https://github.com/Bhanuka10/Mobile-App-UI-Kit"
  },
  {
    id: 3,
    title: "Learning web",
    description: "A modern and user-friendly UI/UX design for a learning web application, created using Figma. The design focuses on intuitive navigation, clean layouts, and engaging visuals to enhance the user experience for learners.",
    image: "src/assets/UI/class/Desktop - 2.png",
    techStack: ["Figma"],
    explore_link: "https://github.com/Bhanuka10/Mobile-App-UI-Kit"
  }
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState('web');
  // Function to get tech stack icon
  const getTechIcon = (tech) => {
    const techLower = tech.toLowerCase();
    switch (techLower) {
      case 'react': return <FaReact className="tech-icon react" />;
      case 'html': return <FaHtml5 className="tech-icon html" />;
      case 'css': return <FaCss3Alt className="tech-icon css" />;
      case 'javascript': return <FaJs className="tech-icon javascript" />;
      case 'php': return <FaPhp className="tech-icon php" />;
      case 'laravel': return <FaLaravel className="tech-icon laravel" />;
      case 'mysql': return <SiMysql className="tech-icon mysql" />;
      case 'firebase': return <SiFirebase className="tech-icon firebase" />;
      case 'git': return <FaGitAlt className="tech-icon git" />;
      case 'figma': return <FaFigma className="tech-icon figma" />;
      case 'blade': return <SiBlazor className="tech-icon blade" />;
      case 'gemini api': return <FaDatabase className="tech-icon api" />;
      case 'api integration': return <FaDatabase className="tech-icon api" />;
      default: return <span className="tech-icon default">•</span>;
    }
  };

  // Function to truncate description
  const truncateDescription = (description, maxLength = 80) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  // Get current data based on active tab
  const currentData = activeTab === 'web' ? projectsData : UisData;

  return (
    <div className="projects-container">
      {/* Tab Navigation */}
      <div className="projects-header">
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'web' ? 'active' : ''}`}
            onClick={() => setActiveTab('web')}
          >
            <span className="tab-icon"></span>
            Web Projects
          </button>
          <button 
            className={`tab-btn ${activeTab === 'ui' ? 'active' : ''}`}
            onClick={() => setActiveTab('ui')}
          >
            <span className="tab-icon"></span>
            UI/UX Designs
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="projects-list">
        {currentData.map((project) => (
          <div className="project-card" key={project.id}>
            <div className="project-image-container">
              <img src={project.image} alt={project.title} className="project-image" />
            </div>
            
            <div className="project-content">
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description project-description-short">
                  {truncateDescription(project.description)}
                </p>
                <p className="project-description project-description-full">
                  {project.description}
                </p>
              </div>
              
              <div className="tech-stack">
                <div className="tech-stack-header">
                  <span className="tech-label">Tech Stack:</span>
                </div>
                <div className="tech-icons">
                  {project.techStack.map((tech, index) => (
                    <div key={index} className="tech-item" title={tech}>
                      {getTechIcon(tech)}
                      <span className="tech-name">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="project-actions">
                {activeTab === 'web' && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="action-btn github-btn">
                    <FaGithub className="btn-icon" />
                    GitHub
                  </a>
                )}
                <a 
                  href={activeTab === 'web' ? project.link : project.explore_link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="action-btn explore-btn"
                >
                  <FaExternalLinkAlt className="btn-icon" />
                  Explore
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
