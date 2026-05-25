import React from 'react';

export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'theory', num: '01', label: 'Lý thuyết' },
    { id: 'law', num: '02', label: 'Quy luật' },
    { id: 'evidence', num: '03', label: 'Dẫn chứng' },
    { id: 'cards', num: '04', label: 'Flashcard' },
    { id: 'ai', num: '05', label: 'Hỏi AI' },
  ];

  return (
    <div className="nav-tabs">
      {tabs.map(tab => (
        <button 
          key={tab.id}
          className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span className="tab-num">{tab.num}</span>{tab.label}
        </button>
      ))}
    </div>
  );
}
