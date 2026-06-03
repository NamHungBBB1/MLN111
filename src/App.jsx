import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Tabs from './components/Tabs';
import QuoteBlock from './components/QuoteBlock';
import Footer from './components/Footer';
import ContentPage from './components/panels/ContentPage';
import ChatPanel from './components/panels/ChatPanel';

const TAB_ORDER = ['content', 'ai'];

function useScrollReveal(activeTab) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal, .reveal-left'));

    const show = (el) => {
      el.classList.add('visible');
      io.unobserve(el);
    };

    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) show(e.target); }),
      { threshold: 0 }
    );

    els.forEach(el => io.observe(el));

    // Also immediately show elements already in viewport (IO can miss initial state)
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) show(el);
    });

    return () => io.disconnect();
  }, [activeTab]);
}

function useReadingProgress() {
  useEffect(() => {
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    document.body.appendChild(bar);

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : '0%';
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      bar.remove();
    };
  }, []);
}

function App() {
  const [activeTab, setActiveTab] = useState('content');
  const [direction, setDirection] = useState('right');

  const handleTabChange = (newTab) => {
    if (newTab === activeTab) return;
    const ci = TAB_ORDER.indexOf(activeTab);
    const ni = TAB_ORDER.indexOf(newTab);
    setDirection(ni > ci ? 'right' : 'left');
    setActiveTab(newTab);
    // Scroll so nav tabs sit at top of viewport → content appears right below
    setTimeout(() => {
      const nav = document.querySelector('.nav-tabs');
      if (nav) {
        const navTop = nav.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: navTop, behavior: 'smooth' });
      }
    }, 30);
  };

  useScrollReveal(activeTab);
  useReadingProgress();

  return (
    <div id="marx-app">
      <div className="geo-bg geo-circle"></div>
      <div className="geo-bg geo-bar"></div>
      <div className="geo-bg geo-triangle"></div>
      <div className="geo-bg geo-square"></div>

      <Hero />
      <QuoteBlock />
      <Tabs activeTab={activeTab} setActiveTab={handleTabChange} />

      <div key={activeTab} className={`panel-enter${direction === 'left' ? ' from-left' : ''}`}>
        {activeTab === 'content' && <ContentPage />}
        {activeTab === 'ai'      && <ChatPanel />}
      </div>

      <Footer />
    </div>
  );
}

export default App;
