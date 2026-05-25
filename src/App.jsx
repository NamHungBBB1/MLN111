import React, { useState } from 'react';
import Hero from './components/Hero';
import Tabs from './components/Tabs';
import QuoteBlock from './components/QuoteBlock';
import Footer from './components/Footer';
import TheoryPanel from './components/panels/TheoryPanel';
import LawPanel from './components/panels/LawPanel';
import EvidencePanel from './components/panels/EvidencePanel';
import FlashcardsPanel from './components/panels/FlashcardsPanel';
import ChatPanel from './components/panels/ChatPanel';

function App() {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div id="marx-app">
      <div className="geo-bg geo-circle"></div>
      <div className="geo-bg geo-bar"></div>
      <div className="geo-bg geo-triangle"></div>
      <div className="geo-bg geo-square"></div>

      <Hero />
      <QuoteBlock />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'theory' && <TheoryPanel />}
      {activeTab === 'law' && <LawPanel />}
      {activeTab === 'evidence' && <EvidencePanel />}
      {activeTab === 'cards' && <FlashcardsPanel />}
      {activeTab === 'ai' && <ChatPanel />}

      <Footer />
    </div>
  );
}

export default App;
