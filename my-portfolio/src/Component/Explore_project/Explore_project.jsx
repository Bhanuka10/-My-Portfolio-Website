import React, { useState, useEffect } from 'react';
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
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
      'react.js': <FaReact style={{ color: '#61dafb' }} />,
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
      'express.js': <SiExpress style={{ color: '#000000' }} />,
      'mongodb': <SiMongodb style={{ color: '#47a248' }} />,
      'node.js': <SiNodedotjs style={{ color: '#339933' }} />,
      'nodejs': <SiNodedotjs style={{ color: '#339933' }} />,
      'git': <FaGitAlt style={{ color: '#f05032' }} />,
      'figma': <FaFigma style={{ color: '#f24e1e' }} />,
      'bootstrap': <FaBootstrap style={{ color: '#7952b3' }} />,
      'blade': <FaLaravel style={{ color: '#ff2d20' }} />,
      'blade templates': <FaLaravel style={{ color: '#ff2d20' }} />,
      'gemini api': <FaDatabase style={{ color: '#4285f4' }} />,
      'api integration': <FaDatabase style={{ color: '#4285f4' }} />,
      'api': <FaDatabase style={{ color: '#4285f4' }} />,
      'rest api': <FaDatabase style={{ color: '#4285f4' }} />,
      'restful api': <FaDatabase style={{ color: '#4285f4' }} />
    };
    
    return iconMap[techLower] || <span style={{ color: '#6c757d', fontWeight: 'bold' }}>⚡</span>;
  };

  // Prepare images array (main image + additional images)
  const allImages = [project.image, ...(project.o_image || [])];

  // Check if this is a UI/UX project
  const isUIProject = project.explore_link || (project.techStack && project.techStack.some(tech => tech.toLowerCase() === 'figma'));

  // UI/UX Project Template
  if (isUIProject) {
    return (
      <div className="explore-container ui-showcase">
        {/* Header with Back Button */}
        <div className="explore-header">
          <button onClick={() => navigate(-1)} className="back-btn">
            <FaArrowLeft />
            <span>Back to Designs</span>
          </button>
        </div>

        {/* UI Project Hero Section */}
        <div className="ui-hero-section">
          <div className="ui-hero-content">
            <h1 className="ui-main-title">{project.title}</h1>
            <p className="ui-main-description">{project.description}</p>
            <div className="ui-tech-badge">
              <FaFigma style={{ color: '#f24e1e' }} />
              <span>UI/UX Design</span>
            </div>
          </div>
        </div>

        {/* UI Image Showcase */}
        <div className="ui-showcase-section">
          <div className="ui-main-display">
            <div className="ui-image-frame">
              <img 
                src={allImages[selectedImage]} 
                alt={`${project.title} - Design ${selectedImage + 1}`}
                className="ui-main-image"
              />
              <div className="ui-image-label">
                Design {selectedImage + 1} of {allImages.length}
              </div>
            </div>
          </div>
          
          {allImages.length > 1 && (
            <div className="ui-gallery-grid">
              {allImages.map((image, index) => (
                <div 
                  key={index}
                  className={`ui-thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`Design ${index + 1}`} />
                  <div className="ui-thumbnail-overlay">
                    <span className="ui-thumbnail-number">{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* UI Details Section */}
        <div className="ui-details-section">
          <div className="ui-details-content">
            <h2 className="ui-section-title">Design Details</h2>
            <div className="ui-description">
              {(() => {
                const content = project.indetails || project.description;
                if (!content) return <p>No details available.</p>;
                
                const sentences = content.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
                const paragraphs = [];
                const sentencesPerParagraph = Math.ceil(sentences.length / 2);
                
                for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
                  const paragraphSentences = sentences.slice(i, i + sentencesPerParagraph);
                  const paragraph = paragraphSentences.join('. ').trim() + '.';
                  paragraphs.push(paragraph);
                }
                
                return paragraphs.map((paragraph, index) => (
                  <p key={index} className="ui-detail-paragraph">
                    {paragraph}
                  </p>
                ));
              })()}
            </div>

            {/* {project.explore_link && (
              <div className="ui-link-section">
                <a 
                  href={project.explore_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ui-explore-btn"
                >
                  <FaFigma />
                  <span>View Design Files</span>
                </a>
              </div>
            )} */}
          </div>
        </div>
      </div>
    );
  }

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
            
            About the Project
          </h2>
          <div className="section-content">
            {(() => {
              const content = project.indetails || project.description;
              if (!content) return <p className="project-details">No description available.</p>;
              
              // Split content into paragraphs based on sentences or natural breaks
              const sentences = content.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
              const paragraphs = [];
              
              // Group sentences into 3-4 paragraphs
              const sentencesPerParagraph = Math.ceil(sentences.length / 3);
              
              for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
                const paragraphSentences = sentences.slice(i, i + sentencesPerParagraph);
                const paragraph = paragraphSentences.join('. ').trim() + '.';
                paragraphs.push(paragraph);
              }
              
              return paragraphs.map((paragraph, index) => (
                <p key={index} className="project-details">
                  {paragraph}
                </p>
              ));
            })()}
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
              {(() => {
                const content = project.prompt;
                if (!content) return <p className="project-contribution">No contribution details available.</p>;
                
                // Split content into paragraphs based on sentences or natural breaks
                const sentences = content.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
                const paragraphs = [];
                
                // Group sentences into 2-3 paragraphs for contribution section
                const sentencesPerParagraph = Math.ceil(sentences.length / 2);
                
                for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
                  const paragraphSentences = sentences.slice(i, i + sentencesPerParagraph);
                  const paragraph = paragraphSentences.join('. ').trim() + '.';
                  paragraphs.push(paragraph);
                }
                
                return paragraphs.map((paragraph, index) => (
                  <p key={index} className="project-contribution">
                    {paragraph}
                  </p>
                ));
              })()}
            </div>
          </section>
        )}

        {/* Tech Stack */}
        <section className="content-section">
          <h2 className="section-title">
            
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
       
      </div>
    </div>
  );
};

export default Explore_project;
