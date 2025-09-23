import React, { useEffect, useRef } from "react";
import "./Languages.css";
import "./LanguagesAnimation.css";
import "./IconStyles.css";
import "./ReactIconStyles.css"; // Add our new special styles for React Icons
// Import React Icons for unique icons
import { SiPostman, SiLaravel, SiIntellijidea } from "react-icons/si";
import { GiCutDiamond } from "react-icons/gi";
import { VscCode } from "react-icons/vsc";

// Skills list with enhanced icon styles and color definitions - organized for balanced 3-row layout
// Row 1: 7 icons - Languages
const row1 = [
  { name: "Java", icon: "devicon-java-plain colored", color: "#f89820", bgColor: "rgba(248, 152, 32, 0.15)" },
  { name: "C", icon: "devicon-c-plain colored", color: "#03599C", bgColor: "rgba(3, 89, 156, 0.15)" },
  { name: "Python", icon: "devicon-python-plain colored", color: "#3776AB", bgColor: "rgba(55, 118, 171, 0.15)" },
  { name: "HTML5", icon: "devicon-html5-plain colored", color: "#E44D26", bgColor: "rgba(228, 77, 38, 0.15)" },
  { name: "CSS3", icon: "devicon-css3-plain colored", color: "#264DE4", bgColor: "rgba(38, 77, 228, 0.15)" },
  { name: "JavaScript", icon: "devicon-javascript-plain colored", color: "#F7DF1E", bgColor: "rgba(247, 223, 30, 0.15)" },
  { name: "PHP", icon: "devicon-php-plain colored", color: "#777BB4", bgColor: "rgba(119, 123, 180, 0.15)" },
];

// Row 2: 7 icons - Frameworks & Libraries
const row2 = [
  { name: "React", icon: "devicon-react-original colored", color: "#61DAFB", bgColor: "rgba(97, 218, 251, 0.15)" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored", color: "#8CC84B", bgColor: "rgba(140, 200, 75, 0.15)" },
  { name: "Express", icon: "devicon-express-original", color: "#ffffff", bgColor: "rgba(255, 255, 255, 0.15)" },
  { name: "MongoDB", icon: "devicon-mongodb-plain colored", color: "#4DB33D", bgColor: "rgba(77, 179, 61, 0.15)" },
  // Using React Icons for Laravel instead of devicon
  { name: "Laravel", iconComponent: SiLaravel, color: "#FF2D20", bgColor: "rgba(255, 45, 32, 0.15)" },
  // Using a diamond icon from React Icons to represent Blade templates
  { name: "Blade", iconComponent: GiCutDiamond, color: "#FF2D20", bgColor: "rgba(255, 45, 32, 0.15)" },
  { name: "Bootstrap", icon: "devicon-bootstrap-plain colored", color: "#7952B3", bgColor: "rgba(121, 82, 179, 0.15)" },
];

// Row 3: 7 icons (now with IntelliJ IDEA added)
const row3 = [
  { name: "TailwindCSS", icon: "devicon-tailwindcss-plain colored", color: "#06B6D4", bgColor: "rgba(6, 182, 212, 0.15)" },
  { name: "Flask", icon: "devicon-flask-original", color: "#ffffff", bgColor: "rgba(255, 255, 255, 0.15)" },
  { name: "Git", icon: "devicon-git-plain colored", color: "#F05032", bgColor: "rgba(240, 80, 50, 0.15)" },
  // Using React Icons for Postman instead of devicon
  { name: "Postman", iconComponent: SiPostman, color: "#FF6C37", bgColor: "rgba(255, 108, 55, 0.15)" },
  { name: "VS Code", iconComponent: VscCode, color: "#007ACC", bgColor: "rgba(0, 122, 204, 0.15)" },
  // Added IntelliJ IDEA from React Icons
  { name: "IntelliJ", iconComponent: SiIntellijidea, color: "#FE315D", bgColor: "rgba(254, 49, 93, 0.15)" },
  { name: "Figma", icon: "devicon-figma-plain colored", color: "#F24E1E", bgColor: "rgba(242, 78, 30, 0.15)" },
];

// Combine all rows
const skills = [...row1, ...row2, ...row3];

const Languages = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add staggered animation to cards
            const cards = document.querySelectorAll('.skill-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add('animate-in');
              }, i * 50);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Render function for icon - handles both class-based icons and React Icon components
  const renderIcon = (skill) => {
    if (skill.iconComponent) {
      const IconComponent = skill.iconComponent;
      return <IconComponent style={{ color: skill.color, fontSize: '1.8rem' }} />;
    } else {
      return <i className={skill.icon} style={{ color: skill.color }}></i>;
    }
  };

  return (
    <section className="languages-section" ref={sectionRef}>
      <div className="section-content">
        <h2 className="title">⚡ My Tech Stack</h2>
        
        {/* First row - 7 icons */}
        <div className="languages-row">
          {row1.map((skill, index) => (
            <div 
              className="skill-card" 
              key={`row1-${index}`}
              style={{ 
                animationDelay: `${index * 0.05}s`,
                background: `radial-gradient(circle at center, ${skill.bgColor} 0%, rgba(15, 23, 42, 0.6) 70%)`
              }}
            >
              <div className="icon-circle" style={{ borderColor: skill.color }}>
                {renderIcon(skill)}
              </div>
              <span style={{ color: skill.color }}>{skill.name}</span>
            </div>
          ))}
        </div>
        
        {/* Second row - 7 icons */}
        <div className="languages-row">
          {row2.map((skill, index) => (
            <div 
              className="skill-card" 
              key={`row2-${index}`}
              style={{ 
                animationDelay: `${(index + row1.length) * 0.05}s`,
                background: `radial-gradient(circle at center, ${skill.bgColor} 0%, rgba(15, 23, 42, 0.6) 70%)`
              }}
            >
              <div className="icon-circle" style={{ borderColor: skill.color }}>
                {renderIcon(skill)}
              </div>
              <span style={{ color: skill.color }}>{skill.name}</span>
            </div>
          ))}
        </div>
        
        {/* Third row - now 7 icons instead of 6 */}
        <div className="languages-row">
          {row3.map((skill, index) => (
            <div 
              className="skill-card" 
              key={`row3-${index}`}
              style={{ 
                animationDelay: `${(index + row1.length + row2.length) * 0.05}s`,
                background: `radial-gradient(circle at center, ${skill.bgColor} 0%, rgba(15, 23, 42, 0.6) 70%)`
              }}
            >
              <div className="icon-circle" style={{ borderColor: skill.color }}>
                {renderIcon(skill)}
              </div>
              <span style={{ color: skill.color }}>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Languages;
