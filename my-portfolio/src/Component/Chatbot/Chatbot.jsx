// Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./Chatbot.css";

// Initialize the Google GenerativeAI with API key from environment variables
const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Portfolio information for context
const PORTFOLIO_CONTEXT = `
About Sahan Bhanuka Bandaranayake:
- Name: Sahan Bhanuka Bandaranayake
- Expertise: ML & AI Enthusiast, Full Stack Developer
- Skills: React, Node.js, Laravel, JavaScript, Python, Machine Learning, AI, Deep Learning, MongoDB, MySQL
- Currently exploring: AI-powered solutions, deep learning models, building scalable web applications
- Passionate about: Tackling challenging problems, collaborating on innovative projects, expanding knowledge in AI and fullstack development
- Education: [Add education details]
- Experience: [Add work experience]
- Notable Projects: [Add key projects]
- Contact: [Add contact information]

You are Bhanuka's AI assistant. Respond to questions about Bhanuka's background, skills, projects, or provide helpful information related to his areas of expertise.
`;

// Fallback responses for when API is unavailable
const FALLBACK_RESPONSES = {
  skills: "Bhanuka is a Full Stack Developer with expertise in React, Node.js, Laravel, JavaScript, Python, Machine Learning, AI, Deep Learning, MongoDB, and MySQL. He's passionate about building AI-powered solutions and scalable web applications.",
  
  projects: "Bhanuka has worked on various projects including AI-powered web applications, machine learning models, and full-stack development projects. You can check out his project portfolio on this website!",
  
  contact: "You can reach out to Bhanuka through the contact section on this website. He's always open to discussing new opportunities and collaborations!",
  
  experience: "Bhanuka is an ML & AI Enthusiast and Full Stack Developer, currently exploring AI-powered solutions and deep learning models while building scalable web applications.",
  
  education: "Bhanuka is passionate about continuous learning in AI, machine learning, and full-stack development. He's always expanding his knowledge in these cutting-edge technologies.",
  
  about: "Sahan Bhanuka Bandaranayake is a passionate Full Stack Developer and ML & AI Enthusiast. He loves tackling challenging problems, collaborating on innovative projects, and expanding his knowledge in AI and fullstack development.",
  
  default: "I'm currently experiencing some technical difficulties with my AI capabilities. However, I can tell you that Bhanuka is a skilled Full Stack Developer and AI enthusiast. Please feel free to explore his portfolio or contact him directly for more detailed information!"
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
  const [messages, setMessages] = useState([]);
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

  // Check quota status on component mount
  useEffect(() => {
    const dailyCount = getDailyRequestCount();
    setRequestCount(dailyCount);
    
    let initialMessage;
    if (dailyCount >= 250) {
      setQuotaExceeded(true);
      initialMessage = "Hi! I'm Bhanuka's AI assistant. ⚠️ My daily API quota (250 requests) has been reached. I can still provide basic information about Bhanuka using my offline knowledge. How can I help you today?";
    } else if (dailyCount >= 240) {
      initialMessage = `Hi! I'm Bhanuka's AI assistant powered by Gemini 2.5 Flash. ⚠️ I'm very close to my daily limit (${dailyCount}/250 requests used). How can I help you today?`;
    } else if (dailyCount >= 200) {
      initialMessage = `Hi! I'm Bhanuka's AI assistant powered by Gemini 2.5 Flash. ℹ️ I'm approaching my daily limit (${dailyCount}/250 requests used). How can I help you today?`;
    } else {
      initialMessage = "Hi! I'm Bhanuka's AI assistant powered by Gemini 2.5 Flash. How can I help you today?";
    }
    
    setMessages([{ id: 1, from: "bot", text: initialMessage }]);
  }, []);

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

  function handleKey(e) {
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
                    <div className="text">{m.text}</div>
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
                onKeyDown={handleKey}
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
                  <div className="text">{m.text}</div>
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
              onKeyDown={handleKey}
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
