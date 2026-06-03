import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

export default function ChatPanel() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Chào đồng chí! Tôi là **COMRADE.AI** — hệ thống phân tích triết học Mác-Lênin. Mời đồng chí đặt câu hỏi về tồn tại xã hội, ý thức xã hội, hoặc bất kỳ vấn đề nào trong chương III.',
      who: 'bot',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [knowledge, setKnowledge] = useState('');
  const logRef = useRef(null);

  useEffect(() => {
    fetch('/knowledge.md')
      .then(res => res.text())
      .then(text => setKnowledge(text))
      .catch(err => console.error('Failed to load knowledge.md', err));
  }, []);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    if (!text.trim() || isLoading) return;
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      alert('Lỗi: Không tìm thấy VITE_GEMINI_API_KEY trong file .env!');
      return;
    }
    setMessages(prev => [...prev, { id: Date.now(), text, who: 'you' }]);
    setInputValue('');
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: text,
        config: { systemInstruction: knowledge },
      });
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response.text, who: 'bot' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, text: `*Lỗi kết nối:* ${error.message}`, who: 'bot' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    { label: 'Tồn tại XH là gì?',   query: 'Tồn tại xã hội là gì?' },
    { label: 'Vì sao ý thức lạc hậu?', query: 'Tại sao ý thức lạc hậu?' },
    { label: 'Ví dụ tính vượt trước', query: 'Cho ví dụ về tính vượt trước' },
    { label: 'Câu nói Marx 1859',    query: 'Ý nghĩa câu nói của Marx năm 1859' },
    { label: 'AI & ý thức XH',       query: 'Liên hệ AI và ý thức xã hội' },
  ];

  return (
    <div className="tab-panel">
      <div style={{ padding: '44px 36px 20px' }}>
        <div className="section-label reveal">Phần 05 — Đối thoại thực</div>
        <h2 className="section-title reveal rd1">Hỏi đáp cùng AI</h2>
      </div>

      <div style={{ padding: '0 36px 44px' }}>
        <div className="chat-terminal reveal rd2">

          {/* ── Header ── */}
          <div className="chat-terminal-header">
            <div className="chat-terminal-top">
              <div className="chat-terminal-name">
                <span className="chat-star">★</span>
                COMRADE.AI
                <span className="chat-badge">Gemini 2.5</span>
              </div>
              <div className="chat-terminal-status">
                <span className="status-dot" />
                {isLoading ? 'Đang tư duy...' : 'Trực tuyến'}
              </div>
            </div>
            <div className="chat-terminal-meta">
              <span>Hệ thống phân tích triết học Mác-Lênin</span>
              <span>Chương III · Mục IV · 1859</span>
            </div>
          </div>

          {/* ── Message Log ── */}
          <div className="chat-log" ref={logRef}>
            {messages.map(msg => (
              <div key={msg.id} className={`chat-entry ${msg.who}`}>
                <div className="entry-who">
                  <div className="entry-who-icon">
                    {msg.who === 'bot' ? '★' : '✎'}
                  </div>
                  <div className="entry-who-label">
                    {msg.who === 'bot' ? 'COMRADE\n.AI' : 'Đồng\nchí'}
                  </div>
                </div>
                <div className="entry-content">
                  {msg.who === 'bot' ? (
                    <div className="markdown-content">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-entry bot">
                <div className="entry-who">
                  <div className="entry-who-icon">★</div>
                  <div className="entry-who-label">COMRADE<br/>.AI</div>
                </div>
                <div className="entry-content">
                  <div className="typing-dots">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Suggestions ── */}
          <div className="chat-suggestions">
            <span className="suggestions-label">Gợi ý →</span>
            {suggestions.map((s, i) => (
              <div key={i} className="suggest-chip" onClick={() => handleSend(s.query)}>
                {s.label}
              </div>
            ))}
          </div>

          {/* ── Compose ── */}
          <div className="chat-compose">
            <span className="compose-who">Đồng chí</span>
            <input
              className="compose-input"
              placeholder="Nhập câu hỏi..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(inputValue); }}
              disabled={isLoading}
            />
            <button
              className="compose-send"
              onClick={() => handleSend(inputValue)}
              disabled={isLoading}
            >
              GỬI →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
