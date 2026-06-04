import React, { useState, useEffect, useRef } from 'react';
import { soundManager } from './sounds';
import Hero from './components/Hero';
import Tabs from './components/Tabs';
import QuoteBlock from './components/QuoteBlock';
import Footer from './components/Footer';
import ContentPage from './components/panels/ContentPage';
import ChatPanel from './components/panels/ChatPanel';
import GamePanel from './components/panels/GamePanel';

function useScrollReveal(activeTab) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal, .reveal-left'));
    const show = (el) => { el.classList.add('visible'); io.unobserve(el); };
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) show(e.target); }),
      { threshold: 0 }
    );
    els.forEach(el => io.observe(el));
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
    return () => { window.removeEventListener('scroll', update); bar.remove(); };
  }, []);
}

function App() {
  const [activeTab, setActiveTab] = useState('content');
  const panelRef    = useRef(null);
  const isFirstRender = useRef(true);

  const handleTabChange = (newTab) => {
    if (newTab === activeTab) return;
    if (activeTab === 'game') soundManager.pauseBg();
    if (newTab === 'game')    soundManager.resumeBg();
    setActiveTab(newTab);
  };

  // Scroll to top of panels area on tab switch
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    const nav = document.querySelector('.nav-tabs');
    const el  = panelRef.current;
    if (nav && el) {
      const navH     = nav.offsetHeight;
      const panelTop = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: panelTop - navH, behavior: 'smooth' });
    }
  }, [activeTab]);

  useScrollReveal(activeTab);
  useReadingProgress();

  return (
    <div id="marx-app">
      <Hero />
      <QuoteBlock />
      <Tabs activeTab={activeTab} setActiveTab={handleTabChange} />

      <div ref={panelRef}>
        <div style={{ display: activeTab === 'content' ? 'block' : 'none' }}><ContentPage /></div>
        <div style={{ display: activeTab === 'ai'      ? 'block' : 'none' }}><ChatPanel /></div>
        <div style={{ display: activeTab === 'game'    ? 'block' : 'none' }}><GamePanel /></div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
