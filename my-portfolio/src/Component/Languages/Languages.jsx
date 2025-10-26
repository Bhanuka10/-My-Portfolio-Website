import React, { useEffect, useRef, useState } from "react";
import "./Languages.css";
import { SiPostman, SiLaravel, SiIntellijidea, SiMysql } from "react-icons/si";
import { VscCode } from "react-icons/vsc";

// ------------------ Row Data ------------------

// Row 1: Languages
const row1 = [
  { name: "Java", icon: "devicon-java-plain colored", color: "#f89820", bgColor: "rgba(248, 152, 32, 0.15)" },
  { name: "C", icon: "devicon-c-plain colored", color: "#03599C", bgColor: "rgba(3, 89, 156, 0.15)" },
  { name: "Python", icon: "devicon-python-plain colored", color: "#3776AB", bgColor: "rgba(55, 118, 171, 0.15)" },
  { name: "HTML5", icon: "devicon-html5-plain colored", color: "#E44D26", bgColor: "rgba(228, 77, 38, 0.15)" },
  { name: "CSS3", icon: "devicon-css3-plain colored", color: "#264DE4", bgColor: "rgba(38, 77, 228, 0.15)" },
  { name: "JavaScript", icon: "devicon-javascript-plain colored", color: "#F7DF1E", bgColor: "rgba(247, 223, 30, 0.15)" },
  { name: "PHP", icon: "devicon-php-plain colored", color: "#777BB4", bgColor: "rgba(119, 123, 180, 0.15)" },
];

// Row 2: Frameworks & Libraries
const row2 = [
  { name: "React", icon: "devicon-react-original colored", color: "#61DAFB", bgColor: "rgba(97, 218, 251, 0.15)" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored", color: "#8CC84B", bgColor: "rgba(140, 200, 75, 0.15)" },
  { name: "Express", icon: "devicon-express-original", color: "#ffffff", bgColor: "rgba(255, 255, 255, 0.15)" },
  { name: "MongoDB", icon: "devicon-mongodb-plain colored", color: "#4DB33D", bgColor: "rgba(77, 179, 61, 0.15)" },
  { name: "Laravel", iconComponent: SiLaravel, color: "#FF2D20", bgColor: "rgba(255, 45, 32, 0.15)", specialClass: "laravel-icon" },
  { name: "SQL", iconComponent: SiMysql, color: "#4479A1", bgColor: "rgba(68, 121, 161, 0.15)" },
  { name: "Jupyter", icon: "devicon-jupyter-plain colored", color: "#F37626", bgColor: "rgba(243, 118, 38, 0.15)" },
];

// Row 3: Tools & Others
const row3 = [
  { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark colored", color: "#FF9900", bgColor: "rgba(255, 153, 0, 0.15)" },
  { name: "Flask", icon: "devicon-flask-original", color: "#ffffff", bgColor: "rgba(255, 255, 255, 0.15)" },
  { name: "Git", icon: "devicon-git-plain colored", color: "#F05032", bgColor: "rgba(240, 80, 50, 0.15)" },
  { name: "Postman", iconComponent: SiPostman, color: "#FF6C37", bgColor: "rgba(255, 108, 55, 0.15)", specialClass: "postman-icon" },
  { name: "VS Code", iconComponent: VscCode, color: "#007ACC", bgColor: "rgba(0, 122, 204, 0.15)" },
  { name: "IntelliJ", iconComponent: SiIntellijidea, color: "#FE315D", bgColor: "rgba(254, 49, 93, 0.15)", specialClass: "intellij-icon" },
  { name: "Figma", icon: "devicon-figma-plain colored", color: "#F24E1E", bgColor: "rgba(242, 78, 30, 0.15)" },
];

// ------------------ Component ------------------
const Languages = () => {
  const languagesRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Add animation class only once when component comes into view
            entry.target.classList.add('in-view');
            entry.target.classList.add('animate-on-scroll');
            setHasAnimated(true);
            
            // Stop observing after animation is triggered
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the component is visible
        rootMargin: '-100px 0px -100px 0px' // More precise triggering
      }
    );

    const currentRef = languagesRef.current;
    if (currentRef && !hasAnimated) {
      observer.observe(currentRef);
    }

    // Cleanup
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  const renderIcon = (skill) => {
    if (skill.iconComponent) {
      const IconComponent = skill.iconComponent;
      return <IconComponent style={{ color: skill.color }} />;
    }
    return <i className={skill.icon} style={{ color: skill.color }}></i>;
  };

  const renderRow = (row, rowIndex) => (
    <div className="languages-row" key={rowIndex}>
      {row.map((skill, index) => (
        <div
          className={`skill-card ${skill.specialClass || ""}`}
          key={`${rowIndex}-${index}`}
          style={{
            background: `radial-gradient(circle at center, ${skill.bgColor} 0%, rgba(15, 23, 42, 0.6) 70%)`,
          }}
        >
          <div className="icon-circle" style={{ borderColor: skill.color }}>
            {renderIcon(skill)}
          </div>
          <span style={{ color: skill.color }}>{skill.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="languages-section" ref={languagesRef}>
      <div className="section-content">
        <h2 className="title">My Tech Stack</h2>
        {renderRow(row1, 1)}
        {renderRow(row2, 2)}
        {renderRow(row3, 3)}
      </div>
    </section>
  );
};

export default Languages;
