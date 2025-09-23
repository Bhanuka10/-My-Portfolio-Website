// Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./Chatbot.css";

// Initialize the Google GenerativeAI with your API key
const ai = new GoogleGenerativeAI("AIzaSyDG3oilceI9-RfZvLGYBlji7MiU8Me8HlA");

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

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "Hi! I'm Bhanuka's AI assistant powered by Gemini 2.5 Flash. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef(null);

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
      return "I'm having trouble connecting right now. Please try again in a moment.";
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
    
    try {
      // Get response from Gemini
      const response = await generateGeminiResponse(text);
      
      // Add bot message to chat
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, from: "bot", text: response }
      ]);
    } catch (error) {
      console.error("Error in sendMessage:", error);
      setMessages((m) => [
        ...m,
        { 
          id: Date.now() + 1, 
          from: "bot", 
          text: "Sorry, I encountered an error. Please try again." 
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

  return (
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
  );
}
