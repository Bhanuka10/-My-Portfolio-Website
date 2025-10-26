import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Projects.css";
import projectsData, { UisData } from "../../Data/projectsData";
import { 
  FaReact, FaHtml5, FaCss3Alt, FaJs, FaPhp, FaGitAlt, FaFigma,
  FaGithub, FaExternalLinkAlt, FaDatabase, FaLaravel, FaNodeJs 
} from "react-icons/fa";
import { SiMysql, SiBlazor, SiJavascript, SiFirebase, SiMongodb, SiExpress, SiNodedotjs } from "react-icons/si";

const Projects = () => {
  const [activeTab, setActiveTab] = useState('web');
  const [animatedProjects, setAnimatedProjects] = useState(new Set());
  const projectRefs = useRef([]);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Setup intersection observer for smooth project animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectIndex = projectRefs.current.indexOf(entry.target);
            if (projectIndex !== -1) {
              entry.target.classList.add('project-animate');
              setAnimatedProjects(prev => new Set(prev.add(projectIndex)));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    // Observe all project cards
    projectRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [activeTab]); // Re-run when tab changes

  // Reset animations when tab changes
  useEffect(() => {
    setAnimatedProjects(new Set());
    projectRefs.current = [];
  }, [activeTab]);

  // Function to get tech stack icon
  const getTechIcon = (tech) => {
    const techLower = tech.toLowerCase();
    switch (techLower) {
      case 'react': return <FaReact className="tech-icon react" />;
      case 'react.js': return <FaReact className="tech-icon react" />;
      case 'html': return <FaHtml5 className="tech-icon html" />;
      case 'html5': return <FaHtml5 className="tech-icon html" />;
      case 'css': return <FaCss3Alt className="tech-icon css" />;
      case 'css3': return <FaCss3Alt className="tech-icon css" />;
      case 'javascript': return <FaJs className="tech-icon javascript" />;
      case 'js': return <FaJs className="tech-icon javascript" />;
      case 'php': return <FaPhp className="tech-icon php" />;
      case 'laravel': return <FaLaravel className="tech-icon laravel" />;
      case 'mysql': return <SiMysql className="tech-icon mysql" />;
      case 'mongodb': return <SiMongodb className="tech-icon mongodb" />;
      case 'express': return <SiExpress className="tech-icon express" />;
      case 'express.js': return <SiExpress className="tech-icon express" />;
      case 'node.js': return <SiNodedotjs className="tech-icon nodejs" />;
      case 'nodejs': return <SiNodedotjs className="tech-icon nodejs" />;
      case 'firebase': return <SiFirebase className="tech-icon firebase" />;
      case 'git': return <FaGitAlt className="tech-icon git" />;
      case 'figma': return <FaFigma className="tech-icon figma" />;
      case 'blade': return <SiBlazor className="tech-icon blade" />;
      case 'blade templates': return <SiBlazor className="tech-icon blade" />;
      case 'gemini api': return <FaDatabase className="tech-icon api" />;
      case 'api integration': return <FaDatabase className="tech-icon api" />;
      case 'api': return <FaDatabase className="tech-icon api" />;
      case 'rest api': return <FaDatabase className="tech-icon api" />;
      case 'restful api': return <FaDatabase className="tech-icon api" />;
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

  // Function to handle explore button click
  const handleExploreClick = (project) => {
    navigate('/explore-project', { state: { project } });
    // Scroll to top after navigation
    window.scrollTo(0, 0);
  };

  return (
    <div className="projects-container" ref={containerRef}>
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
        {currentData.map((project, index) => (
          <div 
            className="project-card project-card-animate" 
            key={project.id}
            ref={(el) => projectRefs.current[index] = el}
            style={{'--animation-delay': `${index * 0.1}s`}}
          >
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
                <button 
                  onClick={() => handleExploreClick(project)}
                  className="action-btn explore-btn"
                >
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
