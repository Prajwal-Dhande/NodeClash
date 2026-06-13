import { useState, useEffect } from 'react';
import { Download, X, Monitor } from 'lucide-react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    // Don't show if user already dismissed or already installed
    if (localStorage.getItem('ca_install_dismissed') === 'true') return;
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Hide if app gets installed
    window.addEventListener('appinstalled', () => {
      setShowButton(false);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    setInstalling(true);
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === 'accepted') {
      setShowButton(false);
    }
    setDeferredPrompt(null);
    setInstalling(false);
  };

  const handleDismiss = () => {
    setShowButton(false);
    localStorage.setItem('ca_install_dismissed', 'true');
  };

  if (!showButton) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9998,
      display: 'flex', alignItems: 'center', gap: 12,
      background: 'linear-gradient(135deg, rgba(20,20,24,0.95), rgba(30,30,36,0.95))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,107,53,0.3)',
      borderRadius: 16, padding: '14px 20px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,107,53,0.1)',
      animation: 'installSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      fontFamily: 'Inter, sans-serif',
      maxWidth: 340,
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 12,
        background: 'linear-gradient(135deg, rgba(255,107,53,0.2), rgba(247,69,29,0.2))',
        border: '1px solid rgba(255,107,53,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Monitor size={20} color="#ff6b35" />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#f8fafc', marginBottom: 2 }}>
          Install CodeArena
        </div>
        <div style={{ fontSize: 11, color: '#888', lineHeight: 1.4 }}>
          Get the app for quick access
        </div>
      </div>

      <button onClick={handleInstall} disabled={installing} style={{
        background: 'linear-gradient(135deg, #ff6b35, #f7451d)',
        border: 'none', color: '#fff', borderRadius: 10,
        padding: '8px 16px', fontSize: 12, fontWeight: 700,
        cursor: installing ? 'wait' : 'pointer', fontFamily: 'Inter',
        display: 'flex', alignItems: 'center', gap: 6,
        boxShadow: '0 4px 14px rgba(255,107,53,0.3)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        flexShrink: 0,
      }}
        onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,107,53,0.4)'; }}
        onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(255,107,53,0.3)'; }}
      >
        <Download size={14} />
        {installing ? '...' : 'Install'}
      </button>

      <button onClick={handleDismiss} style={{
        background: 'none', border: 'none', color: '#555',
        cursor: 'pointer', padding: 4, display: 'flex',
        transition: 'color 0.2s', flexShrink: 0,
      }}
        onMouseOver={e => e.currentTarget.style.color = '#aaa'}
        onMouseOut={e => e.currentTarget.style.color = '#555'}
      >
        <X size={16} />
      </button>

      <style>{`
        @keyframes installSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
