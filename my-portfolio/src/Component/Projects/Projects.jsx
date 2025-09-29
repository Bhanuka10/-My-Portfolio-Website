import React from "react";
import "./Projects.css";
import projectsData from "../../Data/projectsData";

const Projects = () => {
  return (
<div className="portfolio">
  {projectsData.map((project) => (
    <div className="project-card" key={project.id}>
      <div className="image-container">
        <img src={project.image} alt={project.title} className="project-image" />
        <div className="overlay">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="tech-stack">
            {project.techStack.map((tech, index) => (
              <span key={index} className="tech">{tech}</span>
            ))}
          </div>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
            View Project
          </a>
        </div>
      </div>
    </div>
  ))}
</div>

  );
};

export default Projects;
