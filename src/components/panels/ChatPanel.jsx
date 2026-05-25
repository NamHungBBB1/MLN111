import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

export default function ChatPanel() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Chào đồng chí! Tôi là trợ lý ảo AI. Mời đồng chí đặt câu hỏi.', who: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [knowledge, setKnowledge] = useState('');
  const chatBodyRef = useRef(null);

  useEffect(() => {
    fetch('/knowledge.md')
      .then(res => res.text())
      .then(text => setKnowledge(text))
      .catch(err => console.error('Failed to load knowledge.md', err));
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    if (!text.trim() || isLoading) return;
    
    // Lấy key từ môi trường Vite
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      alert("Lỗi: Không tìm thấy VITE_GEMINI_API_KEY trong file .env!");
      return;
    }
    
    setMessages(prev => [...prev, { id: Date.now(), text, who: 'you' }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: text,
        config: {
          systemInstruction: knowledge,
        }
      });
      
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response.text, who: 'bot' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: 'Lỗi khi gọi AI: ' + error.message, who: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    { label: 'Tồn tại xã hội là gì?', query: 'Tồn tại xã hội là gì?' },
    { label: 'Vì sao ý thức lạc hậu?', query: 'Tại sao ý thức lạc hậu?' },
    { label: 'Ví dụ vượt trước', query: 'Cho ví dụ về tính vượt trước' },
    { label: 'Ý nghĩa câu nói Marx', query: 'Ý nghĩa câu nói của Marx' },
    { label: 'AI & ý thức', query: 'Liên hệ AI và ý thức' },
  ];

  return (
    <div className="tab-panel active">
      <div className="section-label">Phần 05 — Đối thoại thực</div>
      <h2 className="section-title">Hỏi đáp cùng AI (Gemini)</h2>
      
      <div className="chat-frame">
        <div className="chat-header">
          <div className="chat-header-title">★ COMRADE.AI — GEMINI 2.5 FLASH</div>
          <div className="chat-header-status"><span className="status-dot"></span>{isLoading ? 'ĐANG TƯ DUY...' : 'ONLINE'}</div>
        </div>
        <div className="chat-body" ref={chatBodyRef}>
          {messages.map(msg => (
            <div key={msg.id} className={`msg ${msg.who}`}>
              <span className="msg-label">{msg.who === 'you' ? 'ĐỒNG CHÍ' : 'COMRADE.AI'}</span>
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="msg bot">
              <span className="msg-label">COMRADE.AI</span>
              <span style={{ display: 'inline-block', animation: 'pulse 1s infinite' }}>•••</span>
            </div>
          )}
        </div>
        <div className="suggestions">
          {suggestions.map((s, idx) => (
            <div key={idx} className="suggest-chip" onClick={() => handleSend(s.query)}>
              {s.label}
            </div>
          ))}
        </div>
        <div className="chat-input-row">
          <input 
            className="chat-input" 
            placeholder="Nhập câu hỏi của đồng chí..." 
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(inputValue); }}
            disabled={isLoading}
          />
          <button className="chat-send" onClick={() => handleSend(inputValue)} disabled={isLoading}>GỬI →</button>
        </div>
      </div>
    </div>
  );
}
