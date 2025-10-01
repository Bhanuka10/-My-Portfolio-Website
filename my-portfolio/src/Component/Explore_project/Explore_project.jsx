import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaReact, 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaPhp, 
  FaGitAlt, 
  FaFigma,
  FaDatabase,
  FaLaravel,
  FaBootstrap
} from 'react-icons/fa';
import { 
  SiMysql, 
  SiFirebase, 
  SiTailwindcss, 
  SiExpress, 
  SiMongodb, 
  SiNodedotjs,
  SiJavascript
} from 'react-icons/si';
import './Explore.css';

const Explore_project = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Get project data from router state
  const project = location.state?.project;

  // If no project data, show error message
  if (!project) {
    return (
      <div className="explore-container">
        <div className="error-message">
          <h2>Project not found</h2>
          <button onClick={() => navigate(-1)} className="back-btn">
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    );
  }

  // Function to get tech stack icon
  const getTechIcon = (tech) => {
    const techLower = tech.toLowerCase();
    const iconMap = {
      'react': <FaReact style={{ color: '#61dafb' }} />,
      'html': <FaHtml5 style={{ color: '#e34f26' }} />,
      'html5': <FaHtml5 style={{ color: '#e34f26' }} />,
      'css': <FaCss3Alt style={{ color: '#1572b6' }} />,
      'css3': <FaCss3Alt style={{ color: '#1572b6' }} />,
      'javascript': <FaJs style={{ color: '#f7df1e' }} />,
      'js': <FaJs style={{ color: '#f7df1e' }} />,
      'php': <FaPhp style={{ color: '#777bb4' }} />,
      'laravel': <FaLaravel style={{ color: '#ff2d20' }} />,
      'mysql': <SiMysql style={{ color: '#4479a1' }} />,
      'firebase': <SiFirebase style={{ color: '#ffca28' }} />,
      'tailwindcss': <SiTailwindcss style={{ color: '#06b6d4' }} />,
      'tailwind': <SiTailwindcss style={{ color: '#06b6d4' }} />,
      'express': <SiExpress style={{ color: '#000000' }} />,
      'mongodb': <SiMongodb style={{ color: '#47a248' }} />,
      'node.js': <SiNodedotjs style={{ color: '#339933' }} />,
      'nodejs': <SiNodedotjs style={{ color: '#339933' }} />,
      'git': <FaGitAlt style={{ color: '#f05032' }} />,
      'figma': <FaFigma style={{ color: '#f24e1e' }} />,
      'bootstrap': <FaBootstrap style={{ color: '#7952b3' }} />,
      'blade': <FaLaravel style={{ color: '#ff2d20' }} />,
      'gemini api': <FaDatabase style={{ color: '#4285f4' }} />,
      'api integration': <FaDatabase style={{ color: '#4285f4' }} />,
      'api': <FaDatabase style={{ color: '#4285f4' }} />
    };
    
    return iconMap[techLower] || <span style={{ color: '#6c757d', fontWeight: 'bold' }}>⚡</span>;
  };

  // Prepare images array (main image + additional images)
  const allImages = [project.image, ...(project.o_image || [])];

  return (
    <div className="explore-container">
      {/* Header with Back Button */}
      <div className="explore-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FaArrowLeft />
          <span>Back to Projects</span>
        </button>
      </div>

      {/* Project Title */}
      <div className="project-title-section">
        <h1 className="project-main-title">{project.title}</h1>
        <div className="title-divider"></div>
      </div>

      {/* Image Gallery */}
      <div className="image-gallery-section">
        <div className="main-image-container">
          <img 
            src={allImages[selectedImage]} 
            alt={`${project.title} - Image ${selectedImage + 1}`}
            className="main-project-image"
          />
          <div className="image-overlay">
            <span className="image-counter">{selectedImage + 1} / {allImages.length}</span>
          </div>
        </div>
        
        {allImages.length > 1 && (
          <div className="thumbnail-gallery">
            {allImages.map((image, index) => (
              <div 
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} />
                <div className="thumbnail-overlay"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content Sections */}
      <div className="content-sections">
        
        {/* About the Project */}
        <section className="content-section">
          <h2 className="section-title">
            <span className="section-icon">📋</span>
            About the Project
          </h2>
          <div className="section-content">
            <p className="project-details">
              {project.indetails || project.description}
            </p>
          </div>
        </section>

        {/* My Contribution (if prompt exists) */}
        {project.prompt && (
          <section className="content-section">
            <h2 className="section-title">
              <span className="section-icon">💡</span>
              My Contribution
            </h2>
            <div className="section-content">
              <p className="project-contribution">
                {project.prompt}
              </p>
            </div>
          </section>
        )}

        {/* Tech Stack */}
        <section className="content-section">
          <h2 className="section-title">
            <span className="section-icon">🛠️</span>
            Tech Stack
          </h2>
          <div className="section-content">
            <div className="tech-stack-grid">
              {project.techStack.map((tech, index) => (
                <div key={index} className="tech-badge">
                  <div className="tech-icon-wrapper">
                    {getTechIcon(tech)}
                  </div>
                  <span className="tech-name">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Links */}
        <section className="content-section">
          <h2 className="section-title">
            <span className="section-icon">🔗</span>
            Project Links
          </h2>
          <div className="section-content">
            <div className="project-links">
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-link-btn primary"
                >
                  <FaGitAlt />
                  View on GitHub
                </a>
              )}
              {project.explore_link && (
                <a 
                  href={project.explore_link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-link-btn secondary"
                >
                  <FaDatabase />
                  Explore Project
                </a>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore_project;
