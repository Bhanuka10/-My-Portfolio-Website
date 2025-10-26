// Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./Chatbot.css";
import projectsData, { UisData } from "../../Data/projectsData.js";

// Quick topic suggestions
const QUICK_TOPICS = [
  { label: "👨‍💻 About Me", query: "Tell me about Bhanuka" },
  { label: "🚀 Projects", query: "What are Bhanuka's main projects?" },
  { label: "💻 Skills", query: "What are Bhanuka's technical skills?" },
  { label: "📞 Contact", query: "How can I contact Bhanuka?" },
  { label: "🎨 UI/UX", query: "Tell me about Bhanuka's UI/UX designs" },
  { label: "🤖 AI/ML", query: "What AI/ML experience does Bhanuka have?" }
];

// Initialize the Google GenerativeAI with API key from environment variable
const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Portfolio information for context
const PORTFOLIO_CONTEXT = `
You are Bhanuka's portfolio AI assistant. Provide concise, specific answers based on what users ask.

**RESPONSE GUIDELINES:**
- Keep answers brief and focused
- Use bullet points for clarity
- Only provide information that directly answers the question
- For project questions: Give project names with short descriptions
- For skills questions: List relevant technologies only
- For contact questions: Provide specific contact details only

**About Bhanuka:**
Sahan Bhanuka Bandaranayake - Full Stack Developer & ML/AI Enthusiast from Kandy, Sri Lanka

**Contact:**
• Email: sahanbhanuka10@gmail.com
• Phone: +94 77 898 8024
• LinkedIn: https://www.linkedin.com/in/bhanuka-bandaranayake-0a1968302
• GitHub: https://github.com/Bhanuka10

**Skills:**
Frontend: React, JavaScript, HTML, CSS, Tailwind CSS, Bootstrap
Backend: Node.js, Express.js, Laravel, PHP, Python, Flask
Database: MongoDB, MySQL, Firebase
AI/ML: Machine Learning, Deep Learning, PyTorch, Pandas, NumPy, SciPy, Matplotlib, Seaborn
Tools: Git, GitHub, Figma, VS Code, IntelliJ IDEA, Jupyter, Postman, API Integration

**Projects:**
1. **Personalized Learning Web Application**
   • AI-powered learning platform with course recommendations
   • Tech: React, Firebase, Gemini API, YouTube API
   • GitHub: https://github.com/Bhanuka10/Capstone

2. **Hostel Management System**
   • Complete hostel administration and student management
   • Tech: Laravel, PHP, MySQL, Blade Templates
   • GitHub: https://github.com/Bhanuka10/Hostel-Management-System-Laravel-

3. **Latest Movies Library**
   • Movie browsing app with API integration
   • Tech: React, JavaScript, Movie API
   • GitHub: https://github.com/Bhanuka10/Movies-collection

4. **Expense Tracker System**
   • MERN stack expense management with real-time updates
   • Tech: MongoDB, Express.js, React.js, Node.js, REST API
   • GitHub: https://github.com/Bhanuka10/MERN-Expense-Tracker-

5. **Interactive Brand Website**
   • First website project showcasing brands and shop details
   • Tech: HTML, CSS, JavaScript
   • GitHub: https://github.com/Bhanuka10/Bar_website

6. **School Management System**
   • Laravel-powered school operations management
   • Tech: Laravel, PHP, MySQL, Blade Templates
   • GitHub: https://github.com/Yasithb/EduBridge

**UI/UX Designs:**
1. **Capstone Interface Design** - Learning platform UI (Figma)
2. **WET Hospital System** - Hospital management UI (Figma)
3. **Learning Web Application** - Educational app UI (Figma)
4. **Soul Sync App** - Emotional AI companion mobile app UI (Figma)

IMPORTANT: Answer only what is asked. Keep responses concise and specific.
`;

// Fallback responses for when API is unavailable
`;

**About Bhanuka:**
Sahan Bhanuka Bandaranayake is a passionate Full Stack Developer and ML & AI Enthusiast. He loves tackling challenging problems, collaborating on innovative projects, and expanding his knowledge in AI and fullstack development. He has experience leading development teams, creating user-centered designs, and building scalable applications with modern technologies.
 Age: 24 years old


**IMPORTANT FORMATTING INSTRUCTIONS:**
You are Bhanuka's AI assistant. When responding to questions:

**RESPONSE STRUCTURE REQUIREMENTS:**
- Always format responses in clear bullet points or numbered lists
- Use proper markdown formatting with headers (##), bullet points (•), and emphasis
- Break down complex information into digestible, scannable points
- Use emojis strategically for visual appeal and categorization
- Keep responses well-structured, professional, and easy to read
- Be specific and tailored to what the user is asking about

**RESPONSE FORMATTING TEMPLATES:**

For PROJECT questions, use this structure:
## 🚀 [Project Name]
**Overview:**
• Key point about the project
• Main purpose and impact

**Tech Stack:**
• Technology 1 - Specific use case
• Technology 2 - Specific use case

**Key Features:**
• Feature 1 with brief description
• Feature 2 with brief description

**Bhanuka's Role:**
• Leadership/technical responsibility 1
• Leadership/technical responsibility 2

For SKILLS questions, use this structure:
## 💻 Technical Skills
**Frontend:**
• React.js - Component-based development
• JavaScript - Modern ES6+ features

**Backend:**
• Node.js - Server-side applications
• Laravel - PHP framework expertise

For CONTACT questions, use this structure:
## � Contact Information
**Primary:**
• Email: sahanbhanuka10@gmail.com
• Phone: +94 77 898 8024

**Professional:**
• LinkedIn: [link]
• GitHub: [link]

**TONE & STYLE:**
- Be conversational yet professional
- Highlight Bhanuka's expertise and achievements
- Use active voice and engaging language
- Always end with a call-to-action or invitation for more questions
- If asked about specific projects, focus only on those projects
- If asked about specific skills, focus only on those skills
- Match the specificity of the question with the specificity of the answer
`;

// Fallback responses for when API is unavailable
const FALLBACK_RESPONSES = {
  skills: `## 💻 Bhanuka's Technical Skills

**Frontend Development:**
• React.js - Component-based UI development
• JavaScript (ES6+) - Modern web programming
• HTML5 & CSS3 - Responsive web design
• Tailwind CSS & Bootstrap - UI frameworks

**Backend Development:**
• Node.js & Express.js - Server-side applications
• Laravel & PHP - Web application frameworks
• Python & Flask - API development
• RESTful APIs - Backend service integration

**Databases:**
• MongoDB - NoSQL database management
• MySQL - Relational database design
• Firebase - Real-time database & authentication

**AI/ML & Data Science:**
• Machine Learning & Deep Learning
• PyTorch, Pandas, NumPy, SciPy
• Matplotlib, Seaborn - Data visualization
• AI Integration (Gemini API)

**Development Tools:**
• Git & GitHub - Version control
• VS Code, IntelliJ IDEA - IDEs
• Jupyter Notebooks - Data analysis
• Figma - UI/UX Design
• Postman - API testing`,
  
  projects: `## 🚀 Bhanuka's Key Projects

**1. Personalized Learning Web Application**
• **Tech Stack:** React, Firebase, Gemini API, YouTube Data API
• **Features:** AI-powered course recommendations, progress tracking
• **Role:** Team Lead, Full-stack developer, UI/UX designer

**2. Hostel Management System**
• **Tech Stack:** Laravel, PHP, MySQL, Blade templates
• **Features:** Student registration, room allocation, fee tracking
• **Role:** Project architect, backend developer, team coordinator

**3. Expense Tracker System**
• **Tech Stack:** MongoDB, Express.js, React.js, Node.js (MERN)
• **Features:** Real-time expense tracking, data visualization
• **Role:** Full-stack developer, database architect

**4. Latest Movies Library**
• **Tech Stack:** React, JavaScript, Movie API integration
• **Features:** Responsive movie browsing, real-time data fetching
• **Role:** Frontend developer, API integration specialist

**5. School Management System**
• **Tech Stack:** Laravel, PHP, MySQL, Blade templates
• **Features:** Student/teacher management, class scheduling
• **Role:** Backend developer, system architect

**6. Interactive Brand Website**
• **Tech Stack:** HTML, CSS, JavaScript (First project)
• **Features:** Brand showcase, interactive elements
• **Role:** Full-stack developer, UI designer

**UI/UX Design Portfolio:**
• Capstone Interface Design (Figma)
• WET Hospital System (Figma)
• Soul Sync AI Companion App (Figma)
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
• **Hobbies:** Coding, Reading, watching tv series, playing cricket


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
• **Specialties:** React, Laravel, MERN Stack, AI integration, UI/UX design
• **Experience:** Team leadership, project architecture, scalable applications

**Notable Projects:**
• **AI-Powered Learning Platform** - React + Gemini API
• **Hostel Management System** - Laravel + MySQL
• **MERN Expense Tracker** - Full-stack financial management
• **Movie Library Application** - React + API integration
• **School Management System** - Laravel education platform
• **Soul Sync AI App** - Emotional companion UI design

**Technical Skills:**
• **Frontend:** React, JavaScript, HTML, CSS, Tailwind
• **Backend:** Node.js, Express, Laravel, PHP, Python
• **Database:** MongoDB, MySQL, Firebase
• **AI/ML:** PyTorch, Pandas, NumPy, Machine Learning
• **Tools:** Git, Figma, Jupyter, VS Code, Postman

**Get in Touch:**
• **Email:** sahanbhanuka10@gmail.com
• **GitHub:** https://github.com/Bhanuka10

💡 **Ask me about:** Specific projects, technical skills, or contact information!`
};

// Function to filter projects by technology/language
const filterProjectsByTech = (userText) => {
  const text = userText.toLowerCase();
  const filteredProjects = [];
  
  // Combine both web projects and UI projects
  const allProjects = [...projectsData, ...UisData];
  
  // Technology keywords mapping
  const techKeywords = {
    'laravel': ['laravel', 'php'],
    'mern': ['mern', 'mongodb', 'express', 'react', 'node'],
    'react': ['react', 'react.js'],
    'node': ['node', 'node.js', 'nodejs'],
    'mongodb': ['mongodb', 'mongo'],
    'mysql': ['mysql'],
    'php': ['php', 'laravel'],
    'javascript': ['javascript', 'js'],
    'html': ['html', 'html5'],
    'css': ['css', 'css3'],
    'firebase': ['firebase'],
    'python': ['python'],
    'ai': ['ai', 'artificial intelligence', 'gemini', 'api'],
    'ml': ['ml', 'machine learning'],
    'api': ['api', 'integration'],
    'figma': ['figma', 'ui', 'ux', 'design']
  };
  
  // Check each project's tech stack
  allProjects.forEach(project => {
    const projectTech = project.techStack.map(tech => tech.toLowerCase());
    
    // Check if user query matches any technology in the project
    for (const [tech, keywords] of Object.entries(techKeywords)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        // Check if this technology exists in project's tech stack
        if (projectTech.some(pTech => 
          keywords.some(keyword => pTech.includes(keyword)) || 
          pTech.includes(tech)
        )) {
          if (!filteredProjects.find(p => p.id === project.id)) {
            filteredProjects.push(project);
          }
        }
      }
    }
  });
  
  return filteredProjects;
};

// Function to format project response
const formatProjectResponse = (projects, technology) => {
  if (projects.length === 0) {
    return `## 🔍 No Projects Found\n\n**Sorry!** I couldn't find any projects using **${technology}** in Bhanuka's portfolio.\n\n**Available Technologies:**\n• **Frontend:** React, JavaScript, HTML, CSS\n• **Backend:** Laravel (PHP), Node.js, Express.js\n• **Database:** MongoDB, MySQL, Firebase\n• **AI/ML:** Gemini API, Machine Learning\n• **Design:** Figma (UI/UX)\n\n💡 **Try asking about:** "React projects", "Laravel projects", "MERN projects", or "AI projects"`;
  }

  let response = `## 🚀 ${technology.charAt(0).toUpperCase() + technology.slice(1)} Projects\n\n**Found ${projects.length} project${projects.length > 1 ? 's' : ''} using ${technology}:**\n\n`;
  
  projects.forEach((project, index) => {
    response += `**${index + 1}. ${project.title}**\n`;
    response += `• **Description:** ${project.description.slice(0, 120)}${project.description.length > 120 ? '...' : ''}\n`;
    response += `• **Tech Stack:** ${project.techStack.join(', ')}\n`;
    if (project.link) {
      response += `• **GitHub:** ${project.link}\n`;
    }
    response += '\n';
  });
  
  response += `💡 **Want to know more?** Ask about specific projects or other technologies!`;
  
  return response;
};

// Enhanced function to detect project queries by technology
const detectProjectQuery = (userText) => {
  const text = userText.toLowerCase();
  
  // Pattern matching for project queries
  const projectPatterns = [
    /(?:show me|give me|what are|list|find).*?(laravel|php).*?project/i,
    /(?:show me|give me|what are|list|find).*?mern.*?project/i,
    /(?:show me|give me|what are|list|find).*?(react|react\.js).*?project/i,
    /(?:show me|give me|what are|list|find).*?(node|nodejs|node\.js).*?project/i,
    /(?:show me|give me|what are|list|find).*?(mongodb|mongo).*?project/i,
    /(?:show me|give me|what are|list|find).*?mysql.*?project/i,
    /(?:show me|give me|what are|list|find).*?(javascript|js).*?project/i,
    /(?:show me|give me|what are|list|find).*?(ai|artificial intelligence).*?project/i,
    /(?:show me|give me|what are|list|find).*?(ml|machine learning).*?project/i,
    /(?:show me|give me|what are|list|find).*?api.*?project/i,
    /(?:show me|give me|what are|list|find).*?(figma|ui|ux|design).*?project/i,
    /(laravel|php).*?project/i,
    /mern.*?project/i,
    /(react|react\.js).*?project/i,
    /(node|nodejs|node\.js).*?project/i,
    /(mongodb|mongo).*?project/i,
    /mysql.*?project/i,
    /(javascript|js).*?project/i,
    /(ai|artificial intelligence).*?project/i,
    /(ml|machine learning).*?project/i,
    /api.*?project/i,
    /(figma|ui|ux|design).*?project/i
  ];
  
  for (const pattern of projectPatterns) {
    const match = text.match(pattern);
    if (match) {
      // Extract the technology from the match
      let tech = match[1] || match[0];
      tech = tech.replace(/.*?(laravel|php|mern|react|node|mongodb|mongo|mysql|javascript|js|ai|artificial intelligence|ml|machine learning|api|figma|ui|ux|design).*?/i, '$1');
      return tech.toLowerCase().trim();
    }
  }
  
  return null;
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
    { id: 1, from: "bot", text: `👋 **Hi! I'm Bhanuka's AI Assistant**

🤖 **Ask me about:**
• Projects & technical work
• Skills & technologies  
• Contact information
• UI/UX designs

💬 Just ask specific questions and I'll give you focused answers!` },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const [isThrottled, setIsThrottled] = useState(false);
  const listRef = useRef(null);

  // Minimum time between requests (in milliseconds)
  const REQUEST_THROTTLE_TIME = 2000; // 2 seconds between requests

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

  // Function to generate response using Gemini API with retry logic and rate limiting
  const generateGeminiResponse = async (userText, retryCount = 0) => {
    const maxRetries = 3;
    const baseDelay = 1000; // 1 second base delay
    
    try {
      // Add delay between requests to avoid rate limiting
      if (retryCount > 0) {
        const delay = baseDelay * Math.pow(2, retryCount - 1); // Exponential backoff
        console.log(`Retrying in ${delay}ms... (attempt ${retryCount + 1}/${maxRetries + 1})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        // Add a small delay even for first request to prevent rapid-fire requests
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      // Get the Gemini 2.5 Flash model
      const model = ai.getGenerativeModel({
        model: "gemini-2.5-flash"
      });
      
      // Format the user query with context and enhanced prompt
      const enhancedPrompt = `${PORTFOLIO_CONTEXT}

USER QUESTION: "${userText}"

RESPONSE RULES:
1. ONLY answer what is specifically asked
2. Be concise and specific - no generic information
3. Use bullet points (•) for clarity
4. For projects: Give project names with brief descriptions only
5. For skills: List relevant technologies only
6. For contact: Provide specific contact details only
7. Keep responses short and scannable
8. Use emojis strategically for visual appeal

Example formats:
- If asked about projects: "🚀 **Projects:** • Project Name - Brief description • Project Name - Brief description"
- If asked about skills: "🛠️ **Skills:** • Technology 1 • Technology 2 • Technology 3"
- If asked about contact: "📧 **Contact:** • Email: address • Phone: number"

Provide a direct, point-wise answer based on their specific question.`;

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: enhancedPrompt }],
          },
          {
            role: "model",
            parts: [{ text: "I understand. I'll provide structured, point-wise responses that directly address user questions about Bhanuka's portfolio, using proper markdown formatting with headers, bullet points, and relevant emojis." }],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          topK: 30,
          maxOutputTokens: 300,
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
      console.error(`Error calling Gemini API (attempt ${retryCount + 1}):`, error);
      
      // Handle 429 rate limit errors with retry logic
      if ((error.name === 'GoogleGenerativeAIFetchError' || 
           error.message.includes('GoogleGenerativeAIFetchError') ||
           error.message.includes('429') || 
           error.message.includes('quota exceeded') ||
           error.message.includes('RATE_LIMIT_EXCEEDED')) && 
           retryCount < maxRetries) {
        
        console.log(`Rate limit hit, retrying... (${retryCount + 1}/${maxRetries})`);
        return await generateGeminiResponse(userText, retryCount + 1);
      }
      
      // Handle final failure after all retries or other errors
      if (error.name === 'GoogleGenerativeAIFetchError' || 
          error.message.includes('GoogleGenerativeAIFetchError') ||
          error.message.includes('429') || 
          error.message.includes('quota exceeded') ||
          error.message.includes('current quota') ||
          error.message.includes('RATE_LIMIT_EXCEEDED')) {
        
        const fallbackResponse = getFallbackResponse(userText);
        return `🚫 **API Rate Limit Exceeded** ${retryCount > 0 ? `(after ${retryCount + 1} attempts)` : ''}\n\nThe Gemini API quota has been exceeded. Here's what I can tell you without using the AI:\n\n${fallbackResponse}\n\n💡 **Options:**\n• Wait a few minutes and try again\n• Try again later when quota resets\n• Contact Bhanuka directly for immediate assistance\n• Explore the portfolio sections above for more info`;
        
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

  // Helper function to format text with enhanced markdown-like rendering
  const formatMessage = (text) => {
    if (!text) return text;
    
    // Split text into lines and process each line
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // Handle headers (##)
      if (line.startsWith('## ')) {
        return (
          <h3 key={index} style={{ 
            margin: '12px 0 8px 0', 
            fontSize: '16px', 
            fontWeight: '700', 
            color: '#4ade80',
            borderBottom: '2px solid #4ade8033',
            paddingBottom: '4px',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}>
            {line.replace('## ', '')}
          </h3>
        );
      }
      
      // Handle subheadings/bold sections (**)
      if (line.includes('**') && line.trim().startsWith('**') && line.trim().endsWith('**')) {
        return (
          <h4 key={index} style={{ 
            margin: '10px 0 5px 0', 
            fontWeight: '600', 
            color: '#60a5fa',
            fontSize: '14px',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}>
            {line.replace(/\*\*/g, '')}
          </h4>
        );
      }
      
      // Handle inline bold text
      if (line.includes('**') && !line.trim().startsWith('**')) {
        const parts = line.split(/(\*\*.*?\*\*)/);
        return (
          <p key={index} style={{ margin: '4px 0', color: '#e0e0e0', lineHeight: '1.5' }}>
            {parts.map((part, partIndex) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={partIndex} style={{ color: '#fbbf24', fontWeight: '600' }}>{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </p>
        );
      }
      
      // Handle bullet points (•)
      if (line.trim().startsWith('• ')) {
        return (
          <div key={index} style={{ 
            margin: '3px 0 3px 20px', 
            color: '#d0d0d0',
            fontSize: '13px',
            lineHeight: '1.5'
          }}>
            <span style={{ color: '#a78bfa', marginRight: '8px', fontWeight: 'bold' }}>•</span>
            {line.replace('• ', '')}
          </div>
        );
      }
      
      // Handle numbered points (1., 2., etc.)
      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <div key={index} style={{ 
            margin: '3px 0 3px 20px', 
            color: '#d0d0d0',
            fontSize: '13px',
            lineHeight: '1.5'
          }}>
            <span style={{ color: '#a78bfa', marginRight: '8px', fontWeight: 'bold' }}>
              {line.match(/^\d+\./)[0]}
            </span>
            {line.replace(/^\d+\.\s/, '')}
          </div>
        );
      }
      
      // Handle links
      if (line.includes('http')) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = line.split(urlRegex);
        return (
          <p key={index} style={{ margin: '4px 0', color: '#e0e0e0', lineHeight: '1.5' }}>
            {parts.map((part, partIndex) => {
              if (urlRegex.test(part)) {
                return (
                  <a 
                    key={partIndex} 
                    href={part} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#fbbf24', 
                      textDecoration: 'underline',
                      fontWeight: '500',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#f59e0b'}
                    onMouseLeave={(e) => e.target.style.color = '#fbbf24'}
                  >
                    {part}
                  </a>
                );
              }
              return part;
            })}
          </p>
        );
      }
      
      // Handle regular text
      if (line.trim()) {
        return (
          <p key={index} style={{ 
            margin: '4px 0', 
            color: '#e0e0e0', 
            lineHeight: '1.5',
            fontSize: '13px'
          }}>
            {line}
          </p>
        );
      }
      
      // Handle empty lines for spacing
      return <div key={index} style={{ height: '8px' }}></div>;
    });
  };

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;

    // Check for request throttling to prevent rapid-fire requests
    const currentTime = Date.now();
    const timeSinceLastRequest = currentTime - lastRequestTime;
    
    if (timeSinceLastRequest < REQUEST_THROTTLE_TIME && lastRequestTime > 0) {
      const remainingTime = Math.ceil((REQUEST_THROTTLE_TIME - timeSinceLastRequest) / 1000);
      setIsThrottled(true);
      setMessages((m) => [
        ...m,
        { 
          id: Date.now(), 
          from: "bot", 
          text: `⏳ Please wait ${remainingTime} more second${remainingTime > 1 ? 's' : ''} before sending another message to avoid rate limits.`
        }
      ]);
      
      // Clear throttle message after the remaining time
      setTimeout(() => {
        setIsThrottled(false);
      }, REQUEST_THROTTLE_TIME - timeSinceLastRequest);
      
      return;
    }

    // Add user message to the chat
    const userMsg = { id: Date.now(), from: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLastRequestTime(currentTime);

    // Show typing indicator
    setIsTyping(true);
    
    // Check for project technology queries first (before API call)
    const detectedTech = detectProjectQuery(text);
    if (detectedTech) {
      const filteredProjects = filterProjectsByTech(text);
      const projectResponse = formatProjectResponse(filteredProjects, detectedTech);
      
      // Add bot response with project information
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          { id: Date.now() + 1, from: "bot", text: projectResponse }
        ]);
        setIsTyping(false);
      }, 1000); // Simulate typing delay
      
      return;
    }
    
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
          error.message.includes('quota') ||
          error.message.includes('RATE_LIMIT_EXCEEDED')) {
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
                disabled={isTyping || !input.trim() || isThrottled}
                title={isThrottled ? "Please wait before sending another message" : "Send message"}
              >
                {isThrottled ? "⏳" : "Send"}
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
              disabled={isTyping || !input.trim() || isThrottled}
              title={isThrottled ? "Please wait before sending another message" : "Send message"}
            >
              {isThrottled ? "⏳" : "Send"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
