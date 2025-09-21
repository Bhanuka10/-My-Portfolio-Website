import React, { useState } from "react";
import './Skill.css';
import { motion, AnimatePresence } from "framer-motion";

const Skill = () => {
  const [active, setActive] = useState("education");

  const topics = {
    education: "Currently pursuing a BSc in Computing at [Your University].",
    skills: "I can work easily with React, Laravel (Blade), Node.js, and Python.",
    passion: "Passionate about building AI-powered apps and fullstack solutions."
  };

  const topicNames = Object.keys(topics);

  return (
    <div className="skill-container">
      <div className="circle-section">
        <motion.div 
          className="circle-line"
          animate={{ rotate: active === "education" ? 0 : active === "skills" ? -20 : -40 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          {topicNames.map((topic, index) => {
            const angle = 10 + index * 45; // positions along 100deg arc
            return (
              <motion.div
                key={topic}
                className={`topic-dot ${active === topic ? "active" : ""}`}
                style={{ rotate: `${angle}deg` }}
                onClick={() => setActive(topic)}
                whileHover={{ scale: 1.3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="dot" />
                <span className="label">{topic.charAt(0).toUpperCase() + topic.slice(1)}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="details-box"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
        >
          <h2>{active.charAt(0).toUpperCase() + active.slice(1)}</h2>
          <p>{topics[active]}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Skill;
