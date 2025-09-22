import React, { useState } from "react";
import "./Skill.css";

const Skill = () => {
  const [active, setActive] = useState("education");

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
    skills: "I can work easily with React, Laravel (Blade), Node.js, and Python.",
    passion: "Passionate about building AI-powered apps and fullstack solutions."
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
        <h2>{active.charAt(0).toUpperCase() + active.slice(1)}</h2>
        {active === "education" ? topics.education : <p>{topics[active]}</p>}
      </div>
    </div>
  );
};

export default Skill;
