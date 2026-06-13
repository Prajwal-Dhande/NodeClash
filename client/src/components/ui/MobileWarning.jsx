import { useState, useEffect } from 'react';
import { Monitor, Smartphone, ArrowRight } from 'lucide-react';

export default function MobileWarning() {
  const [show, setShow] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Don't show if user already said "don't show again"
    if (localStorage.getItem('ca_mobile_warning_dismissed') === 'true') return;

    // Check if mobile
    const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Small delay so the page loads first
      setTimeout(() => setShow(true), 500);
    }
  }, []);

  const handleContinue = () => {
    if (dontShowAgain) {
      localStorage.setItem('ca_mobile_warning_dismissed', 'true');
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, fontFamily: 'Inter, sans-serif',
      animation: 'mwFadeIn 0.4s ease-out',
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #16161a, #1a1a20)',
        border: '1px solid rgba(255,107,53,0.2)',
        borderRadius: 24, padding: '40px 28px', textAlign: 'center',
        maxWidth: 380, width: '100%',
        boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(255,107,53,0.08)',
        animation: 'mwSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Icon */}
        <div style={{
          width: 80, height: 80, borderRadius: 20, margin: '0 auto 24px',
          background: 'linear-gradient(135deg, rgba(255,107,53,0.15), rgba(247,69,29,0.15))',
          border: '1px solid rgba(255,107,53,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <Smartphone size={32} color="#ff6b35" style={{ opacity: 0.4 }} />
          <div style={{
            position: 'absolute', top: -4, right: -4,
            width: 24, height: 24, borderRadius: 8,
            background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, color: '#ef4444', fontWeight: 800,
          }}>✕</div>
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 22,
          color: '#f8fafc', margin: '0 0 12px', letterSpacing: '-0.5px',
        }}>
          Desktop Recommended
        </h2>

        {/* Description */}
        <p style={{
          fontSize: 14, color: '#888', lineHeight: 1.7, margin: '0 0 28px',
        }}>
          CodeArena involves writing & running code which works best on a 
          <span style={{ color: '#ff6b35', fontWeight: 600 }}> laptop or desktop</span>. 
          For the best coding experience, please switch to a larger screen.
        </p>

        {/* Desktop illustration */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          marginBottom: 28, padding: '16px 20px',
          background: 'rgba(255,255,255,0.03)', borderRadius: 14,
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <Smartphone size={20} color="#555" />
          <ArrowRight size={16} color="#555" />
          <Monitor size={28} color="#22c55e" />
          <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 700, marginLeft: 4 }}>
            Better Experience
          </span>
        </div>

        {/* Continue Button */}
        <button onClick={handleContinue} style={{
          width: '100%', padding: '14px',
          background: 'linear-gradient(135deg, #ff6b35, #f7451d)',
          border: 'none', borderRadius: 14, color: '#fff',
          fontSize: 15, fontWeight: 700, cursor: 'pointer',
          fontFamily: 'Inter', marginBottom: 16,
          boxShadow: '0 8px 24px rgba(255,107,53,0.25)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
          onTouchStart={e => e.currentTarget.style.transform = 'scale(0.98)'}
          onTouchEnd={e => e.currentTarget.style.transform = 'none'}
        >
          Continue Anyway →
        </button>

        {/* Don't show again */}
        <label style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontSize: 12, color: '#666', cursor: 'pointer',
        }}>
          <input
            type="checkbox"
            checked={dontShowAgain}
            onChange={e => setDontShowAgain(e.target.checked)}
            style={{
              width: 16, height: 16, accentColor: '#ff6b35',
              cursor: 'pointer',
            }}
          />
          Don't show this again
        </label>
      </div>

      <style>{`
        @keyframes mwFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes mwSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
