// Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./Chatbot.css";
import projectsData, { UisData } from "../../Data/projectsData.js";

// Initialize the Google GenerativeAI with API key from environment variable
const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Portfolio information for context
const PORTFOLIO_CONTEXT = `
You are Bhanuka's portfolio AI assistant. Here's detailed information about Bhanuka Bandaranayake:

**Personal Information:**
- Full Name: Sahan Bhanuka Bandaranayake
- Role: Full Stack Developer & ML/AI Enthusiast
- Contact: sahanbhanuka10@gmail.com
- Phone: +94 77 898 8024
- Location: 71/123 Hewahata Road, Thalwaththa, Kandy, Sri Lanka
- LinkedIn: https://www.linkedin.com/in/bhanuka-bandaranayake-0a1968302
- GitHub: https://github.com/Bhanuka10

**Skills & Technologies:**
- Frontend: React, JavaScript, HTML, CSS, responsive design
- Backend: Node.js, Express.js, Laravel, PHP
- Database: MongoDB, MySQL, Firebase
- AI/ML: Machine Learning, Deep Learning, AI integration
- Tools: Git, Figma, API Integration
- Other: Web optimization, deployment, UI/UX Design

**Detailed Projects:**

${projectsData.map((project, index) => `
**Project ${index + 1}: ${project.title}**
- Description: ${project.description}
- Technology Stack: ${project.techStack.join(', ')}
- GitHub Link: ${project.link}
- Detailed Information: ${project.indetails}
- Role & Contributions: ${project.prompt}
`).join('\n')}

**UI/UX Design Projects:**

${UisData.map((ui, index) => `
**UI Design ${index + 1}: ${ui.title}**
- Description: ${ui.description}
- Technology Used: ${ui.techStack.join(', ')}
- GitHub Link: ${ui.explore_link}
- Detailed Information: ${ui.indetails}
`).join('\n')}

**About Bhanuka:**
Sahan Bhanuka Bandaranayake is a passionate Full Stack Developer and ML & AI Enthusiast. He loves tackling challenging problems, collaborating on innovative projects, and expanding his knowledge in AI and fullstack development. He has experience leading development teams, creating user-centered designs, and building scalable applications with modern technologies.

**IMPORTANT FORMATTING INSTRUCTIONS:**
You are Bhanuka's AI assistant. When responding to questions:
- Always format responses in clear bullet points or numbered lists
- Use proper markdown formatting with headers, bullet points, and emphasis
- Break down complex information into digestible points
- Use emojis sparingly but effectively for visual appeal
- Keep responses well-structured and easy to scan
- For project discussions, organize information into: Overview, Tech Stack, Key Features, Your Role
- For skills questions, categorize by Frontend, Backend, Database, etc.
- Always be professional, informative, and engaging while highlighting technical skills and achievements

Example response format:
## 🚀 Project Name
**Overview:**
• Brief description point 1
• Brief description point 2

**Tech Stack:**
• Technology 1 - Purpose
• Technology 2 - Purpose

**Key Features:**
• Feature 1
• Feature 2

**Bhanuka's Role:**
• Responsibility 1
• Responsibility 2
`;

// Fallback responses for when API is unavailable
const FALLBACK_RESPONSES = {
  skills: `## 💻 Bhanuka's Technical Skills

**Frontend Development:**
• React.js - Component-based UI development
• JavaScript (ES6+) - Modern web programming
• HTML5 & CSS3 - Responsive web design
• Responsive Design - Mobile-first approach

**Backend Development:**
• Node.js & Express.js - Server-side applications
• Laravel & PHP - Web application frameworks
• RESTful APIs - Backend service integration

**Databases:**
• MongoDB - NoSQL database management
• MySQL - Relational database design
• Firebase - Real-time database & authentication

**AI/ML & Tools:**
• Machine Learning & Deep Learning
• AI Integration (Gemini API, OpenAI)
• Git & Version Control
• Figma - UI/UX Design
• API Integration & Optimization`,
  
  projects: `## 🚀 Bhanuka's Key Projects

**1. Personalized Learning Web Application**
• **Tech Stack:** React, Firebase, Gemini API, YouTube Data API
• **Features:** AI-powered course recommendations, progress tracking
• **Role:** Team Lead, Full-stack developer, UI/UX designer

**2. Hostel Management System**
• **Tech Stack:** Laravel, PHP, MySQL, Blade templates
• **Features:** Student registration, room allocation, fee tracking
• **Role:** Project architect, backend developer, team coordinator

**3. Latest Movies Library**
• **Tech Stack:** React, JavaScript, Movie API integration
• **Features:** Responsive movie browsing, real-time data fetching
• **Role:** Frontend developer, API integration specialist

**UI/UX Design Portfolio:**
• Capstone Interface Design (Figma)
• WET Hospital System (Figma)
• Learning Web Application (Figma)

🔗 **GitHub:** https://github.com/Bhanuka10`,
  
  contact: `## 📞 Contact Bhanuka

**Primary Contact:**
• **Email:** sahanbhanuka10@gmail.com
• **Phone:** +94 77 898 8024

**Professional Profiles:**
• **LinkedIn:** https://www.linkedin.com/in/bhanuka-bandaranayake-0a1968302
• **GitHub:** https://github.com/Bhanuka10

**Location:**
• **Address:** 71/123 Hewahata Road, Thalwaththa, Kandy, Sri Lanka

💬 **Always open to:** New opportunities, collaborations, and technical discussions!`,
  
  experience: `## 👨‍💻 Bhanuka's Professional Experience

**Current Focus:**
• ML & AI Enthusiast & Full Stack Developer
• Exploring AI-powered solutions and deep learning models
• Building scalable web applications with modern technologies

**Leadership Experience:**
• **Team Leadership:** Led multiple development teams
• **Project Management:** Coordinated sprints and deliverables
• **Technical Architecture:** Designed scalable application structures

**Development Expertise:**
• **Frontend:** React-based user interfaces
• **Backend:** Laravel and Node.js applications
• **Database Design:** MongoDB and MySQL optimization
• **AI Integration:** Gemini API and machine learning models`,
  
  education: `## 🎓 Learning & Development

**Continuous Learning Focus:**
• **AI & Machine Learning:** Deep learning, neural networks
• **Full-Stack Development:** Modern frameworks and tools
• **UI/UX Design:** User-centered design principles
• **API Integration:** Third-party services and optimization

**Technical Growth:**
• **Hands-on Experience:** Multiple real-world projects
• **Framework Expertise:** React, Laravel, Firebase
• **Problem-Solving:** Complex technical challenges
• **Innovation:** AI-powered application development`,
  
  about: `## 👋 Meet Bhanuka

**Professional Profile:**
• **Name:** Sahan Bhanuka Bandaranayake
• **Role:** Full Stack Developer & ML/AI Enthusiast
• **Location:** Kandy, Sri Lanka

**Passion & Expertise:**
• **Problem Solving:** Tackling challenging technical problems
• **Team Collaboration:** Leading and mentoring development teams
• **Innovation:** Building AI-powered applications
• **Technology:** Modern web development and machine learning

**Core Strengths:**
• **Technical Leadership:** Guiding teams through complex projects
• **Full-Stack Development:** End-to-end application development
• **UI/UX Design:** Creating user-centered interfaces
• **Continuous Learning:** Staying updated with latest technologies`,
  
  default: `## 🤖 About Bhanuka's Portfolio

**Quick Overview:**
• **Role:** Full Stack Developer & AI Enthusiast
• **Specialties:** React, Laravel, AI integration, UI/UX design
• **Experience:** Team leadership, project architecture, scalable applications

**Notable Projects:**
• **AI-Powered Learning Platform** - React + Gemini API
• **Hostel Management System** - Laravel + MySQL
• **Movie Library Application** - React + API integration

**Get in Touch:**
• **Email:** sahanbhanuka10@gmail.com
• **GitHub:** https://github.com/Bhanuka10

💡 **Ask me about:** Specific projects, technical skills, or contact information!`
};

// Function to get fallback response based on user input
const getFallbackResponse = (userText) => {
  const text = userText.toLowerCase();
  
  if (text.includes('skill') || text.includes('technology') || text.includes('programming')) {
    return FALLBACK_RESPONSES.skills;
  } else if (text.includes('project') || text.includes('work') || text.includes('portfolio')) {
    return FALLBACK_RESPONSES.projects;
  } else if (text.includes('contact') || text.includes('reach') || text.includes('email') || text.includes('phone')) {
    return FALLBACK_RESPONSES.contact;
  } else if (text.includes('experience') || text.includes('job') || text.includes('career')) {
    return FALLBACK_RESPONSES.experience;
  } else if (text.includes('education') || text.includes('study') || text.includes('learn')) {
    return FALLBACK_RESPONSES.education;
  } else if (text.includes('about') || text.includes('who') || text.includes('bhanuka')) {
    return FALLBACK_RESPONSES.about;
  } else {
    return FALLBACK_RESPONSES.default;
  }
};

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: `## 👋 Hi! I'm Bhanuka's AI Assistant

**Powered by:** Gemini 2.5 Flash AI

**I can help you with:**
• **Projects** - Details about Bhanuka's development work
• **Skills** - Technical expertise and technologies
• **Experience** - Professional background and leadership
• **Contact** - How to reach Bhanuka
• **UI/UX Designs** - Figma projects and design work

💬 **Ask me anything about Bhanuka's portfolio!**` },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const listRef = useRef(null);

  // Function to get daily request count from localStorage
  const getDailyRequestCount = () => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('chatbot_requests');
    if (stored) {
      const data = JSON.parse(stored);
      if (data.date === today) {
        return data.count;
      }
    }
    return 0;
  };

  // Function to update daily request count in localStorage
  const updateDailyRequestCount = (count) => {
    const today = new Date().toDateString();
    localStorage.setItem('chatbot_requests', JSON.stringify({
      date: today,
      count: count
    }));
  };

  useEffect(() => {
    // Scroll to bottom when messages update
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  // Function to generate response using Gemini API
  const generateGeminiResponse = async (userText) => {
    try {
      // Get the Gemini 2.5 Flash model
      const model = ai.getGenerativeModel({
        model: "gemini-2.5-flash"
      });
      
      // Format the user query with context
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: PORTFOLIO_CONTEXT }],
          },
          {
            role: "model",
            parts: [{ text: "I'm ready to help answer questions about Bhanuka." }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 500,
        }
      });
      
      // Send the user's message to the chat
      const result = await chat.sendMessage(userText);
      const response = await result.response;
      
      if (!response.text()) {
        throw new Error("Empty response from API");
      }

      return response.text();
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      
      // Handle GoogleGenerativeAIFetchError specifically
      if (error.name === 'GoogleGenerativeAIFetchError' || 
          error.message.includes('GoogleGenerativeAIFetchError') ||
          error.message.includes('429') || 
          error.message.includes('quota exceeded') ||
          error.message.includes('current quota')) {
        
        const fallbackResponse = getFallbackResponse(userText);
        return `🚫 **API Quota Exceeded** (250 requests/day limit reached)\n\nHere's what I can tell you without using the AI:\n\n${fallbackResponse}\n\n💡 **Options:**\n• Try again tomorrow when quota resets\n• Contact Bhanuka directly for immediate assistance\n• Explore the portfolio sections above for more info`;
        
      } else if (error.message && error.message.includes('network')) {
        return "🌐 I'm having network connectivity issues. Please check your internet connection and try again.";
      } else if (error.message && error.message.includes('Invalid argument')) {
        return "⚙️ There seems to be a configuration issue. Please refresh the page and try again.";
      } else {
        const fallbackResponse = getFallbackResponse(userText);
        return `🤖 I'm experiencing technical difficulties. Here's some basic info:\n\n${fallbackResponse}\n\nFor more detailed assistance, please reach out to Bhanuka directly!`;
      }
    }
  };

  // Helper function to format text with basic markdown-like rendering
  const formatMessage = (text) => {
    if (!text) return text;
    
    // Split text into lines and process each line
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // Handle headers (##)
      if (line.startsWith('## ')) {
        return (
          <h3 key={index} style={{ margin: '10px 0 5px 0', fontSize: '16px', fontWeight: 'bold', color: '#4a9eff' }}>
            {line.replace('## ', '')}
          </h3>
        );
      }
      
      // Handle bold text (**)
      if (line.includes('**') && line.trim().startsWith('**') && line.trim().endsWith('**')) {
        return (
          <p key={index} style={{ margin: '8px 0 4px 0', fontWeight: 'bold', color: '#e0e0e0' }}>
            {line.replace(/\*\*/g, '')}
          </p>
        );
      }
      
      // Handle bullet points (•)
      if (line.trim().startsWith('• ')) {
        return (
          <div key={index} style={{ margin: '3px 0 3px 15px', color: '#d0d0d0' }}>
            <span style={{ color: '#4a9eff', marginRight: '8px' }}>•</span>
            {line.replace('• ', '')}
          </div>
        );
      }
      
      // Handle regular text
      if (line.trim()) {
        return (
          <p key={index} style={{ margin: '5px 0', color: '#e0e0e0', lineHeight: '1.4' }}>
            {line}
          </p>
        );
      }
      
      // Handle empty lines
      return <br key={index} />;
    });
  };

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;

    // Add user message to the chat
    const userMsg = { id: Date.now(), from: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    // Show typing indicator
    setIsTyping(true);
    
    // Check if quota is likely exceeded
    const currentDailyCount = getDailyRequestCount();
    
    if (quotaExceeded || currentDailyCount >= 250) {
      // Provide fallback response immediately
      const fallbackResponse = getFallbackResponse(text);
      setMessages((m) => [
        ...m,
        { 
          id: Date.now() + 1, 
          from: "bot", 
          text: `🚫 **Daily API Quota Exceeded** (250/250 requests used)\n\nHere's what I can tell you without using the AI:\n\n${fallbackResponse}\n\n💡 **Options:**\n• Try again tomorrow when quota resets\n• Contact Bhanuka directly for immediate assistance\n• Explore the portfolio sections above for more info`
        }
      ]);
      setIsTyping(false);
      return;
    }
    
    // Update request count
    const newCount = currentDailyCount + 1;
    setRequestCount(newCount);
    updateDailyRequestCount(newCount);
    
    try {
      // Show warning if approaching limits
      if (newCount >= 200 && newCount < 240) {
        const warningResponse = `⚠️ Just a heads up - I'm approaching my daily limit (${newCount}/250 requests used). Here's your answer:\n\n`;
        const response = await generateGeminiResponse(text);
        setMessages((m) => [
          ...m,
          { id: Date.now() + 1, from: "bot", text: warningResponse + response }
        ]);
      } else if (newCount >= 240) {
        const warningResponse = `🚨 I'm very close to my daily limit (${newCount}/250 requests used). Here's your answer:\n\n`;
        const response = await generateGeminiResponse(text);
        setMessages((m) => [
          ...m,
          { id: Date.now() + 1, from: "bot", text: warningResponse + response }
        ]);
        // Set quota exceeded flag for future requests
        if (newCount >= 248) {
          setQuotaExceeded(true);
        }
      } else {
        // Normal response
        const response = await generateGeminiResponse(text);
        setMessages((m) => [
          ...m,
          { id: Date.now() + 1, from: "bot", text: response }
        ]);
      }
    } catch (error) {
      console.error("Error in sendMessage:", error);
      
      // If it's a quota error, set the flag and provide fallback
      if (error.name === 'GoogleGenerativeAIFetchError' || 
          error.message.includes('429') || 
          error.message.includes('quota')) {
        setQuotaExceeded(true);
        updateDailyRequestCount(250); // Mark as quota exceeded
      }
      
      const fallbackResponse = getFallbackResponse(text);
      setMessages((m) => [
        ...m,
        { 
          id: Date.now() + 1, 
          from: "bot", 
          text: `🚫 **API Error Detected**\n\nHere's what I can tell you without using the AI:\n\n${fallbackResponse}\n\n💡 This might be due to quota limits. Try again later or contact Bhanuka directly!` 
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const closeChatOverlay = (e) => {
    if (e.target === e.currentTarget) {
      setIsChatOpen(false);
    }
  };

  return (
    <>
      {/* Mobile chat toggle button */}
      <button className="chat-toggle-btn" onClick={toggleChat} aria-label="Open Chat">
        💬
      </button>

      {/* Mobile overlay */}
      <div className={`chatbot-overlay ${isChatOpen ? 'active' : ''}`} onClick={closeChatOverlay}>
        <div className="chatbot-shell">
          <div className="chatbot-card">
            <div className="chatbot-header">
              <div className="brand">
                <span className="dot red" />
                <span className="dot blue" />
                <span className="title">Bhanuka Bot </span>
              </div>
              <div className="controls">
                <button className="icon-btn" aria-label="minimize"></button>
                <button className="icon-btn" onClick={() => setIsChatOpen(false)} aria-label="close">✕</button>
              </div>
            </div>

            <div className="chatbot-body" ref={listRef}>
              {messages.map((m) => (
                <div key={m.id} className={`msg ${m.from}`}>
                  <div className="bubble">
                    <div className="text">{formatMessage(m.text)}</div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="msg bot">
                  <div className="bubble typing">
                    <span className="dot-typing" />
                    <span className="dot-typing" />
                    <span className="dot-typing" />
                  </div>
                </div>
              )}
            </div>

            <div className="chatbot-footer">
              <textarea
                className="chat-input"
                placeholder="Ask me anything about Bhanuka... (Press Enter to send)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                rows={1}
                disabled={isTyping}
              />
              <button 
                className="send-btn" 
                onClick={sendMessage} 
                aria-label="send"
                disabled={isTyping || !input.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop chatbot (hidden on mobile) */}
      <div className="chatbot-shell desktop-only">
        <div className="chatbot-card">
          <div className="chatbot-header">
            <div className="brand">
              <span className="dot red" />
              <span className="dot blue" />
              <span className="title">Bhanuka Bot </span>
            </div>
            <div className="controls">
              <button className="icon-btn" aria-label="minimize"></button>
              <button className="icon-btn" aria-label="close"></button>
            </div>
          </div>

          <div className="chatbot-body" ref={listRef}>
            {messages.map((m) => (
              <div key={m.id} className={`msg ${m.from}`}>
                <div className="bubble">
                  <div className="text">{formatMessage(m.text)}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="msg bot">
                <div className="bubble typing">
                  <span className="dot-typing" />
                  <span className="dot-typing" />
                  <span className="dot-typing" />
                </div>
              </div>
            )}
          </div>

          <div className="chatbot-footer">
            <textarea
              className="chat-input"
              placeholder="Ask me anything about Bhanuka... (Press Enter to send)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              rows={1}
              disabled={isTyping}
            />
            <button 
              className="send-btn" 
              onClick={sendMessage} 
              aria-label="send"
              disabled={isTyping || !input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
