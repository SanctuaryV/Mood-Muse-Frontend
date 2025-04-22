import React, { useState } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat history
    setChatHistory(prev => [...prev, { type: 'user', text: message }]);
    
    try {
      const response = await fetch('https://mood-muse-backend.onrender.com/api/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      
      // Add bot response to chat history
      setChatHistory(prev => [...prev, { type: 'bot', text: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setChatHistory(prev => [...prev, { 
        type: 'bot', 
        text: 'ขออภัย มีข้อผิดพลาดเกิดขึ้น กรุณาลองใหม่อีกครั้ง' 
      }]);
    }
    
    setMessage('');
  };

  return (
    <div className="chatbot-container">
      {!isOpen ? (
        <button 
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
        >
          💬
        </button>
      ) : (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <h3>Mood Muse Chat</h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="chatbot-messages">
            {chatHistory.map((chat, index) => (
              <div 
                key={index} 
                className={`message ${chat.type}`}
              >
                {chat.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="chatbot-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="พิมพ์ข้อความที่นี่..."
            />
            <button type="submit">ส่ง</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 