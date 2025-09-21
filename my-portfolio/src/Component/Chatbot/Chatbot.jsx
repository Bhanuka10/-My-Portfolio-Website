// Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "Hi! I\'m your help assistant. You can check anything related to Bhanuka's Profile?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when messages update
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const userMsg = { id: Date.now(), from: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    // simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, from: "bot", text: generateBotReply(text) },
      ]);
      setIsTyping(false);
    }, 900 + Math.random() * 800);
  }

  function generateBotReply(userText) {
    // simple canned replies — replace with API call or smarter logic
    const lower = userText.toLowerCase();
    if (lower.includes("hello") || lower.includes("hi")) return "Hello! Nice to meet you. What would you like to build today?";
    if (lower.includes("project")) return "Tell me about your project idea — tech stack, goal, and target users.";
    if (lower.includes("resume") || lower.includes("cv")) return "I can help you improve your resume. Share a section you want to improve.";
    return "Great question — I\'m an example bot. Replace this with your API or logic to give a helpful reply.";
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
            <span className="title">Bhanuka Bot</span>
          </div>
          <div className="controls">
            <button className="icon-btn" aria-label="minimize">—</button>
            <button className="icon-btn" aria-label="close">×</button>
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
            placeholder="Type a message... (Enter to send)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
          />
          <button className="send-btn" onClick={sendMessage} aria-label="send">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}