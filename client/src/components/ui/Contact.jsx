import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API_URL from '../../config/api';
import { Mail, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !message) return;
    setStatus('loading');
    
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, message })
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setMessage('');
      } else {
        // Fallback if error (can show error state if we add it, but for now just idle)
        console.error('Contact form submission failed');
        setStatus('idle');
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      setStatus('idle');
      alert('Network error. Please try again later.');
    }
  };

  return (
    <div className="page-container">
      <style>{`
        .page-container { min-height: 100vh; background: #000; position: relative; display: flex; flex-direction: column; align-items: center; padding: 60px 20px; font-family: 'Inter', sans-serif; overflow: hidden; }
        
        /* Modern Grid Background */
        .grid-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 40px 40px; z-index: 0; mask-image: radial-gradient(circle at center, black, transparent 80%); -webkit-mask-image: radial-gradient(circle at center, black, transparent 80%); pointer-events: none; }
        
        /* Premium Glass Card */
        .glass-card { background: rgba(10, 10, 10, 0.7); backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 60px; width: 100%; max-width: 600px; z-index: 1; box-shadow: 0 40px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05); animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
        
        .btn-back { background: transparent; color: #a1a1aa; border: none; font-size: 14px; font-weight: 500; cursor: pointer; margin-bottom: 32px; display: flex; align-items: center; gap: 8px; transition: color 0.2s; z-index: 1; align-self: flex-start; width: 100%; max-width: 600px; padding: 0; }
        .btn-back:hover { color: #fff; }
        
        .input-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
        .input-label { font-size: 12px; color: #a1a1aa; font-weight: 600; letter-spacing: 0.5px; }
        .input-field { width: 100%; padding: 16px; border-radius: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: #fff; font-family: Inter, sans-serif; font-size: 14px; outline: none; transition: all 0.3s; box-sizing: border-box; }
        .input-field:focus { border-color: rgba(255,107,53,0.5); background: rgba(0,0,0,0.8); box-shadow: 0 0 0 4px rgba(255,107,53,0.1); }
        
        .submit-btn { width: 100%; background: #fff; color: #000; padding: 16px; border-radius: 12px; font-size: 15px; font-weight: 700; border: none; cursor: pointer; transition: all 0.3s; margin-top: 10px; display: flex; justify-content: center; align-items: center; gap: 8px; }
        .submit-btn:hover { background: #e5e5e5; transform: translateY(-2px); box-shadow: 0 10px 20px -10px rgba(255,255,255,0.5); }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
      `}</style>
      
      <div className="grid-bg" />
      
      <div style={{ width: '100%', maxWidth: '600px', zIndex: 1 }}>
        <button className="btn-back" onClick={() => navigate(-1)}>
          ← Back to Arena
        </button>
      </div>

      <div className="glass-card">
        <h1 style={{ fontFamily: 'Outfit', fontSize: '42px', color: '#fff', marginBottom: '12px', letterSpacing: '-1px', fontWeight: 800 }}>Get in Touch</h1>
        <p style={{ color: '#a1a1aa', fontSize: '15px', marginBottom: '40px', lineHeight: '1.6' }}>Found a bug? Have a suggestion? Or just want to say hi? Drop us a line.</p>
        
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '40px 0', animation: 'popIn 0.5s ease-out' }}>
            <CheckCircle2 size={64} color="#22c55e" style={{ margin: '0 auto 16px' }} />
            <h2 style={{ color: '#f8fafc', fontSize: '24px', marginBottom: '8px' }}>Message Sent!</h2>
            <p style={{ color: '#94a3b8' }}>Thanks for reaching out. We'll get back to you soon.</p>
            <button className="submit-btn" style={{ marginTop: '24px', width: 'auto', padding: '12px 32px' }} onClick={() => setStatus('idle')}>
              Send Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label"><Mail size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: '-2px' }} /> Your Email</label>
              <input type="email" className="input-field" placeholder="coder@arena.com" value={email} onChange={e => setEmail(e.target.value)} required disabled={status === 'loading'} />
            </div>
            
            <div className="input-group">
              <label className="input-label"><MessageSquare size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: '-2px' }} /> Message</label>
              <textarea className="input-field" rows="5" placeholder="What's on your mind?" value={message} onChange={e => setMessage(e.target.value)} required disabled={status === 'loading'}></textarea>
            </div>
            
            <button type="submit" className="submit-btn" disabled={status === 'loading' || !email || !message}>
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}