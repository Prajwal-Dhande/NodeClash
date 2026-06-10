import React, { useState, useRef } from 'react';
import { Zap, Bot, Lock, BarChart3 } from 'lucide-react';

const features = [
  { icon: <Zap size={32} />, bgIcon: <Zap size={150} />, title: 'Real-Time Sync', desc: 'Every keystroke synced via WebSockets under 98ms. Watch your opponent code live.', color: '#ff6b35', tag: 'SOCKET.IO', size: 'large' },
  { icon: <Bot size={32} />, bgIcon: <Bot size={150} />, title: 'AI Interviewer', desc: 'Mid-battle constraint injection. AI reads your logic and raises the bar.', color: '#fb923c', tag: 'LLM POWERED', size: 'small' },
  { icon: <Lock size={32} />, bgIcon: <Lock size={150} />, title: 'Secure Sandbox', desc: 'All code runs in isolated Docker containers. Malicious scripts die here.', color: '#22c55e', tag: 'DOCKER', size: 'small' },
  { icon: <BarChart3 size={32} />, bgIcon: <BarChart3 size={150} />, title: 'Live Analytics', desc: 'Execution time, space complexity, test case delta — tracked in real-time.', color: '#60a5fa', tag: 'REAL-TIME', size: 'large' },
]

// Premium Flat Card Logic
function FeatureCard({ icon, bgIcon, title, desc, color, tag, size }) {
  return (
    <div 
      className={`bento-card ${size}`} 
      style={{ '--hover-color': color }}
    >
      <div className="card-glow" style={{ background: color }} />
      
      <div className="card-content">
        <div className="card-top">
          <span className="feature-icon-wrapper" style={{ color }}>{icon}</span>
          <span className="feature-badge" style={{ color, borderColor: `${color}40`, background: `${color}10` }}>{tag}</span>
        </div>
        
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{desc}</p>
      </div>

      <div className="bg-watermark">{bgIcon}</div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="features-section">
      <div className="features-container">
        <div className="features-header">
          <span className="features-subtitle">SYSTEM CAPABILITIES</span>
          <h2 className="features-title">
            Engineered for <span className="text-glow">performance.</span>
          </h2>
        </div>

        <div className="bento-grid">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>

      <style>{`
        /* Styles exactly as you provided, slight tweaks for 3D parent */
        .features-section { padding: 8rem 2.5rem; background: var(--bg-dark); font-family: Inter, sans-serif; perspective: 1000px; }
        .features-container { max-width: 1200px; margin: 0 auto; }
        .features-header { margin-bottom: 4rem; text-align: center; }
        .features-subtitle { font-size: 12px; font-weight: 700; color: var(--text-hint); letter-spacing: 3px; display: block; margin-bottom: 12px; }
        .features-title { font-family: Outfit, sans-serif; font-weight: 800; font-size: clamp(2.5rem, 4vw, 3.5rem); color: var(--text-main); line-height: 1.1; margin: 0; letter-spacing: -1px; }
        .text-glow { color: var(--orange); text-shadow: 0 0 30px rgba(255,107,53,0.4); }
        
        .bento-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        
        .bento-card { position: relative; background: var(--card-bg); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid var(--glass-border); border-radius: 24px; padding: 36px; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; cursor: default; box-shadow: inset 0 1px 1px var(--glass-border), 0 10px 30px rgba(0, 0, 0, 0.1); transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .bento-card.large { grid-column: span 2; min-height: 320px; }
        .bento-card.small { grid-column: span 1; min-height: 320px; }
        
        .bento-card:hover { transform: translateY(-4px); border-color: var(--border); box-shadow: inset 0 1px 1px var(--glass-border), 0 20px 50px rgba(0,0,0,0.15); }
        .card-glow { position: absolute; top: -50px; left: 50%; transform: translateX(-50%); width: 250px; height: 250px; filter: blur(100px); opacity: 0; transition: opacity 0.5s; z-index: -1; pointer-events: none; }
        .bento-card:hover .card-glow { opacity: 0.25; }
        
        .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: auto; }
        .feature-icon-wrapper { background: var(--glass-overlay); width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; border-radius: 16px; border: 1px solid var(--glass-border); box-shadow: inset 0 1px 0 var(--glass-border); transition: all 0.3s; }
        .bento-card:hover .feature-icon-wrapper { background: var(--glass-overlay); border-color: var(--border); box-shadow: 0 0 20px var(--hover-color); transform: scale(1.05); }
        .feature-badge { font-size: 11px; font-weight: 700; letter-spacing: 1px; padding: 6px 14px; border-radius: 30px; border: 1px solid; backdrop-filter: blur(8px); }
        
        .card-content { position: relative; z-index: 1; }
        .card-title { font-family: Outfit, sans-serif; font-weight: 700; font-size: 24px; color: var(--text-main); margin: 30px 0 12px 0; letter-spacing: -0.5px; }
        .card-desc { color: var(--text-dim); font-size: 15px; line-height: 1.6; margin: 0; max-width: 90%; }
        
        .bg-watermark { position: absolute; bottom: -20px; right: -20px; color: var(--text-main); opacity: 0.02; z-index: 0; filter: grayscale(100%); transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); pointer-events: none; }
        .bento-card:hover .bg-watermark { opacity: 0.06; transform: scale(1.1) rotate(-5deg); filter: grayscale(0%); }

        @media (max-width: 900px) {
          .bento-grid { grid-template-columns: 1fr; }
          .bento-card.large, .bento-card.small { grid-column: span 1; min-height: 240px; }
          .bento-card { transform: none !important; } /* Disable tilt on mobile */
        }
      `}</style>
    </section>
  )
}