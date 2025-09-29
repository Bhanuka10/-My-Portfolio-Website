import React from "react";
import "./Projects.css";
import projectsData from "../../Data/projectsData";

const Projects = () => {
  return (
<div className="portfolio">
  {projectsData.map((project) => (
    <div className="project-card" key={project.id}>
      
        <div className="project-image-container">
          <img src={project.image} alt={project.title} className="project-image" />
        </div>


      <div className="project-details">
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
        </div>
        <p className="project-description">{project.description}</p>
        <div className="project-links">
          {project.github && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
              GitHub
            </a>
          )}
        </div>

      </div>
    </div>
  ))}
</div>

  );
};

export default Projects;
