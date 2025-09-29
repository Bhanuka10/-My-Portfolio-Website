import React from "react";
import "./Projects.css";
import projectsData from "../../Data/projectsData";
import { 
  FaReact, FaHtml5, FaCss3Alt, FaJs, FaPhp, FaGitAlt, FaFigma,
  FaGithub, FaExternalLinkAlt, FaDatabase, FaLaravel 
} from "react-icons/fa";
import { SiMysql, SiBlazor, SiJavascript, SiFirebase } from "react-icons/si";

const Projects = () => {
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

  return (
    <div className="projects-container">
      <h1>Web Projects</h1>
      <div className="projects-list">
        {projectsData.map((project) => (
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
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="action-btn github-btn">
                  <FaGithub className="btn-icon" />
                  GitHub
                </a>
                <button className="action-btn explore-btn">
                  <FaExternalLinkAlt className="btn-icon" />
                  Explore
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
