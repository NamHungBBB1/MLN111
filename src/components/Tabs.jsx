import React from 'react';

export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'content', num: '01–04', label: 'Nội dung' },
    { id: 'ai',      num: '05',    label: 'Hỏi AI' },
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
